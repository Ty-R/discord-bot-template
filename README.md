# Discord Bot Template

## Setup

A few things are assumed:

* You have Node installed
* You already have a bot token from a created app in the Discord developer portal
* You have invited the bot to a server

To set this template up:

1. Download or clone this repository
2. cd into it
3. Run `npm install`
4. Rename `config.json.example` to `config.json`
5. Add the Discord app bot token to the config
6. Specify a prefix in the config - the bot will listen for messages starting with this
7. Run `node bot` to start the bot

## Commands

Command structure is generally: `[prefix] [command] [sub-command] [args]`

The primary syntax rule is that neither the command or the sub-command can contain spaces.

Sub-command arguement patterns are defined on the sub-command level. This means that each sub-command is not restricted by a shared argument syntax so can have as many or as few as it requires in any shape it requires.

Commands live under `commands/` and the name of the file (minus the extension) will be the name of the command, so a file called `help.js` will result in a command triggered in-chat with `[prefix] help`.

#### Command properties

We can define properties at the command level though there isn't currently much reason to outside of some basic information and an object holding its sub-commands:

```js
name: '',
description: '',
subCommands: {}
```

**Name and Description**

Unused at the moment but likely to be used in a top-level help command: `[prefix] help`, to return information about all commands.

**Sub-Commands**

Holds sub-command data - properties and function.

#### Sub-command Properties

```js
description: '', // Used by command help commands [prefix] [command] [help]
usage: '', // Used by command help
implicitDefault: Bool, // If no sub-command is detected it will forward all given args (if any) to this one
excludeFromHelp: Bool, // When [prefix] [command] [help] is run, any sub-commands excluded from help will not be listed
hidden: Bool,
argsPattern: Regex, // Given args will be tested against this pattern and, if valid, will be split into named groups for the sub-command to use
execute() {} // The logic for the sub-command
```

**Description and Usage**

Used when a help sub-command is run: `[prefix] [command] help`. This help command will return usage and descriptions of all its sub-commands.

**implicit Default**

This bot follows a command/sub-command structure but we may not always require a "sub-command". Maybe a command only has one sub-command, or it has one that is obvious so doesn't need explicitly provided. In either case, we'd create a sub-command still but set `implicitDefault: true`. If the command is run with no recognised sub-command, it will fallback to the implicitly default sub-command.

**Help Exclusion**

We may want some sub-commands to not appear in a help output. If we set `excludeFromHelp: true`, then the sub-command will still be executable but will not appear in help outputs.

**Hidden**

If we set `hidden: true` then the sub-command will be treated as unrecognised when run.

**Arguments Pattern**

If a sub-command expects arguements then we can specify what form these arguments take using Regular Expressions. We can run the inputted args against a sub-commands pattern, and it matches, then we can extracted named groups to forward into the sub-command function. If it does not match, then the bot will respond with usage instructions.

**The Execute Function**

This is what will be executed after a valid input. Anything can exist within this function but it should always return an object containing the success (true/false) and a response message to send to the channel.

## Database

Includes Knex and sqlite3 for basic database operations. No examples have been provided as it's a use-case, so if no persistent storage is required then feel free to remove them.

If persistent storage is required then refer to sqlite3 or Knex docs for usage information.