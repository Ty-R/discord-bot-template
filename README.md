# Discord Bot Template

## Setup

A few things are assumed:

* You have Node installed
* You already have a bot token from a created app in the Discord developer portal
* You have invited the bot to a server

To set this template up:

1. Download or clone this repository
2. `cd` into it and run `npm install`
3. Rename `config.json.example` to `config.json`
4. Add the Discord app bot token to the config
5. Specify a prefix in the config
6. Run `node bot` to start the bot

## Commands

Commands live under `commands/` and the name of the file (minus the extension) will be the name of the command, so a file called `help.js` will result in a command triggered in-chat with `<prefix> help`.

Sub-commands do not require shared argument syntax so any sub-command can have as many or as few as it requires in (mostly) any shape it requires. The behaviours of sub-commands are handled by their properties which sit atop each sub-commands object in the command files and may look something like:

```js
description: '',
usage: '',
implicitDefault: Bool,
excludeFromHelp: Bool,
hidden: Bool,
argsPattern: Regex,
execute() {}
```

<details>
  <summary>Expand to see the purpose of each individual property</summary>
  
**Description and Usage**

When running `<prefix> <command> help`, it will gather the names and usages of it's sub-commands, format them, then send them to the chat.

**implicit Default**

This bot follows a command/sub-command structure but we may not always require a "sub-command". For example, maybe a command only has one sub-command. In this case, we'd still create a sub-command but set `implicitDefault: true`. If the command is run with no recognised sub-command, it will fallback to this default.

**Help Exclusion**

If we set `excludeFromHelp: true`, then the sub-command will not be listed when running `<prefix> <command> help`.

**Hidden**

If we set `hidden: true` then the sub-command will be treated as unrecognised when run.

**Arguments Pattern**

If a sub-command expects arguements then we can specify what form these arguments take using Regular Expressions. We can run the inputted args against a sub-commands pattern, and it matches, then we can extract named groups to forward into the sub-command function. If it does not match, then the bot will respond with usage instructions.

**The Execute Function**

This is what will be executed after a valid input. Anything can exist within this function but it should always return an object containing the success (true/false) and a response message to send to the channel.
  
</details>

## Database

This tempate includes Knex and sqlite3 for basic database operations. No examples have been provided as it's a use-case, so if no persistent storage is required then feel free to remove them.

If persistent storage is required then refer to sqlite3 or Knex docs for usage information.