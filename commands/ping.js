module.exports = {
  name: 'ping',
  description: 'example',
  subCommands: {
    subCommand1: {
      usage: 'ping subCommand1',
      description: 'Command only, no args.',
      async execute() {
        return {
          success: true,
          message: 'Pong!'
        };
      }
    },

    subCommand2: {
      usage: 'ping subCommand2 <args>',
      description: 'Command with basic args.',
      argsPattern: /(?<namedArg>.+)/,
      async execute(args) {
        return {
          success: true,
          message: `Pong! - arg: ${args.namedArg}`
        };
      }
    },

    subCommand3: {
      usage: 'ping subCommand3 <arg1> <arg2>',
      description: 'Command with multiple basic args with space separator.',
      argsPattern: /(?<namedArg>[^\s]+)\s(?<namedArg2>[^\s]+)/,
      async execute(args) {
        return {
          success: true,
          message: `Pong! - arg1: ${args.namedArg}, arg2: ${args.namedArg2}`
        };
      }
    },

    subCommand4: {
      usage: 'ping subCommand4 <arg1> : <arg2> [arg3]',
      description: 'Command with multiple basic args with non-space separator and an optional arguement.',
      argsPattern: /(?<namedArg>.+):\s*(?<namedArg2>[^\s]+)(?=\s*(?<optionalArg>.+)|$)/,
      async execute(args) {
        let message = `Pong! - arg1: ${args.namedArg}, arg2: ${args.namedArg2}`;

        if (args.optionalArg) {
          message += `, optional arg: ${args.optionalArg}`;
        }

        return {
          success: true,
          message
        };
      }
    },

    subCommand5: {
      usage: 'ping subCommand5',
      description: 'A disabled sub-command',
      disabled: true,
      async execute() {
        return {
          success: true,
          message: 'Pong! A disabled command that will be treated as unrecognised when run.'
        };
      }
    },

    subCommand6: {
      usage: 'ping subCommand6',
      description: 'A hidden sub-command',
      excludeFromHelp: true,
      async execute() {
        return {
          success: true,
          message: 'Pong! A working command but will not show in help outputs.'
        };
      }
    },

    subCommand7: {
      usage: 'ping subCommand7',
      implicitDefault: true,
      description: 'A default sub-command',
      async execute() {
        return {
          success: true,
          message: 'Pong! If no recognised sub-command is given it will fallback to this one.'
        };
      }
    },

    help: {
      usage: 'ping help',
      description: 'Shows this',
      async execute() {
        return {
          success: true,
          type: 'help',
          message: Object.values(module.exports.subCommands)
        };
      }
    }
  }
};
