const { prefix } = require('../config.json');

const validateInput = async (input) => {
  const command = input.content.match(/\s+(?<command>[^\s]+)\s*(?<data>.*)/);
  return command?.groups || {};
};

const defaultSubCommand = async (command) => {
  return Object.values(command.subCommands).find((subCommand) => {
    return subCommand.implicitDefault;
  });
};

const parseCommand = async (input, commands) => {
  const command = commands.get(input.command);

  if (!command) {
    return {
      message: `I don't understand that. See \`${prefix} help\` for more usage information.`,
      reason: `unknown command: "${input.command}"`
    };
  }

  if (command.subCommands) {
    const data = input.data.match(/\s?(?<subCommand>[^\s]*)\s*(?<args>.*)/).groups;
    let subCommand = command.subCommands[data.subCommand];

    if (!subCommand) {
      subCommand = await defaultSubCommand(command);

      if (!subCommand) {
        return {
          message: `I don't recognise that sub-command. See \`${prefix} ${command.name} help\` for usage information.`,
          reason: `unknown sub-command: "${data.subCommand}"`
        };
      }

      data.args = input.data;
    }

    if (subCommand.disabled) {
      return {
        message: `I don't recognise that sub-command. See \`${prefix} ${command.name} help\` for usage information.`,
        reason: `blocked hidden sub-command: "${input.command}"`
      };
    }

    if (subCommand.argsPattern) {
      const args = data.args.match(subCommand.argsPattern);

      if (!args) {
        return {
          message: `Here's how you use that \`${prefix} ${subCommand.usage}\`.`,
          reason: `invalid pattern. Expected "${input.args}" to match pattern "${subCommand.argsPattern}"`
        };
      }

      return {
        success: true,
        args: args.groups,
        command: subCommand
      };
    }

    return {
      success: true,
      command: subCommand
    };
  }
};

module.exports = {
  parseCommand,
  validateInput
};
