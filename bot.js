const {
  prefix,
  token
} = require('./config.json');

const {
  validateInput,
  parseCommand
} = require('./bot_modules/validator');

const {
  username
} = require('./bot_modules/user');

const respond = require('./bot_modules/responder');
const discordClient = require('./bot_modules/setup_client');

let logger = require('./bot_modules/logger');
logger = require('winston');

const client = discordClient.run();

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const input = await validateInput(message);

  logger.info(`input: ${JSON.stringify(input)}`);

  try {
    const parsed = await parseCommand(input, client.commands).catch((error) => {
      throw new Error(error);
    });

    if (parsed.success) {
      const result = await parsed.command.execute(parsed.args).catch((error) => {
        throw new Error(error);
      });

      await respond(message.channel, username(message), result).catch((error) => {
        throw new Error(error);
      });
    } else {
      respond(message.channel, username(message), parsed);
      logger.error(parsed.reason);
    }
  } catch (error) {
    message.channel.send('Oops.. something went wrong. The issue has been logged.');
    logger.error(error.stack);
  }
});

client.login(token);
