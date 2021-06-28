module.exports = {
  name: 'help',
  description: 'example',
  subCommands: {
    help: {
      usage: 'help',
      implicitDefault: true,
      async execute() {
        return {
          success: true,
          message: '[HELP RESPONSE] This text is likely to change per app. Edit it in commands/help.js'
        };
      }
    }
  }
};
