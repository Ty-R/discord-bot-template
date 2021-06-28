const { prefix } = require('../config.json');

const filterSubCommands = async (subCommands) => {
  return subCommands.filter((subCommand) => {
    return !subCommand.excludeFromHelp && !subCommand.disabled;
  });
};

const longestSubCommandLength = async (subCommands) => {
  return Math.max(...subCommands.map((subCommand) => {
    return subCommand.usage.length;
  }));
};

const formatSubCommandHelp = async (subCommands) => {
  const maxSpacing = await longestSubCommandLength(subCommands);

  return subCommands.map((subCommand) => {
    const spacing = ' '.repeat(maxSpacing - subCommand.usage.length + 2);
    return `${prefix} ${subCommand.usage}${spacing}# ${subCommand.description}`;
  }).join('\n');
};

const respondWithHelp = async (channel, subCommands) => {
  const formattedsubCommands = await formatSubCommandHelp(subCommands);
  channel.send(`\`\`\`${formattedsubCommands}\`\`\``);
};

module.exports = async (channel, username, result) => {
  if (result.type === 'help') {
    const subCommands = await filterSubCommands(result.message);
    return respondWithHelp(channel, subCommands);
  }

  return channel.send(result.message);
};
