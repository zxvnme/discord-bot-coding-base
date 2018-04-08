//   __     __   __   __   __   __      __   __  ___ 
//  |  \ | /__` /  ` /  \ |__) |  \    |__) /  \  |  
//  |__/ | .__/ \__, \__/ |  \ |__/    |__) \__/  |
//               _ _           
//    __ ___  __| (_)_ _  __ _     ___  ____ ____ ____
//  / _/ _ \/ _` | | ' \/ _` |    |__] |__| [__  |___
//  \__\___/\__,_|_|_||_\__, |    |__] |  | ___] |___          by zxvnme / johhnyhax
//                      |___/                                          2018 (MIT License)

const stringUtils = require('./stringutils.js')
const packagejson = require('./../package.json')
const config = require('./../config.json')
const Discord = require('discord.js')
const chalk = require('chalk')
const fs = require('fs')

// Initalize discord api client.
const client = new Discord.Client()

// Function for time formatting. Credits: https://stackoverflow.com
function format(seconds) {
  function pad(s) {
    return (s < 10 ? '0' : '') + s
  }
  let hours = Math.floor(seconds / (60 * 60))
  let minutes = Math.floor(seconds % (60 * 60) / 60)
  let secs = Math.floor(seconds % 60)

  return pad(hours) + ':' + pad(minutes) + ':' + pad(secs)
}

// Slice our launch args, 2 stands for 'node file.js'
let process_args = process.argv.slice(2)
client.on('ready', () => {
  let success = chalk.green
  let error = chalk.red
  let neutral = chalk.gray
  console.log(success("Logged in ") + "as " + neutral(client.user.tag))
  switch (process_args[0]) {
    case '--status':
      switch (process_args[1]) {
        case 'game':
          client.user.setActivity(process_args[2], { type: "PLAYING" })
          console.log(success("Sucessfully ") + "set playing status to " + neutral(process_args[2]))
          break
        case 'listen':
          client.user.setActivity(process_args[2], { type: "LISTENING" })
          console.log(success("Sucessfully ") + "set listening status to " + neutral(process_args[2]))
          break
        case 'watch':
          client.user.setActivity(process_args[2], { type: "WATCHING" })
          console.log(success("Sucessfully ") + "set watching status to " + neutral(process_args[2]))
          break
        case 'stream':
          client.user.setActivity(process_args[2], { url: "https://www.twitch.tv/" + "discord-bot-coding-base", type: "STREAMING" });
          console.log(success("Sucessfully ") + "set streaming status to " + neutral(process_args[2]))
          break
      }
      break
  }

  // Check all the commands. TODO: Make function to unload them in runtime.
  fs.readdir('./commands/', (err, files) => {
    files.forEach((response) => {
      if (err) return console.error(err)
      // Read only files with .js extension.
      if (!response.endsWith(".js")) return
      if (response) console.log(success("Loaded ") + response)
    })
  })
})

client.on('message', message => {

  // Return if message is sent by bot.
  if (message.author.bot) return

  // Return if message doesn't have bot prefix.
  if (!message.content.startsWith(config.discord_bot_prefix)) return

  let args = message.content.substring(config.discord_bot_prefix.length).split(" ")
  let command = args[0].toLowerCase()

  if (args[0] === "help") {
    // Initalize empty array.
    let help_content = []
    // Initalize empty string.
    let description = ""
    // Read whole command directory (It have to be done with synchronous function for proper array push).
    let files = fs.readdirSync('./commands/')

    files.forEach((response) => {
      try {
        let commandFile = require('./commands/' + response)
        // Push each command syntax and description added together.
        help_content.push(stringUtils.wrapWithBold(commandFile.getSyntax()) + " ~ " + commandFile.getDescription());
      } catch (err) {
        console.error(err)
      }

    })
    // Sort content by line length.
    help_content.sort((x, y) => {
      return x.length - y.length
    })
    // Make easy readable description from array.
    for (let i = 0; i < files.length; i++) {
      description = description + help_content[i] + "\n"
    }

    if (args[1] === "dev")
      return message.channel.send({
        embed: {
          color: 0x2ecc71,
          title: "List of commands.",
          description: description,
          fields: [
            {
              name: "Version: ",
              value: stringUtils.wrapWithOBT(packagejson.version),
              inline: true
            },
            {
              name: "Prefix: ",
              value: config.discord_bot_prefix,
              inline: true
            },
            {
              name: "CLI Args: ",
              value: (process_args.lenght > 0) ? stringUtils.wrapWithOBT(process_args.join(" ")) : stringUtils.wrapWithOBT("none"),
              inline: true
            },
            {
              name: "Uptime: ",
              value: stringUtils.wrapWithOBT(format(process.uptime())),
              inline: true
            },
          ]
        }
      })
    else
      return message.channel.send({
        embed: {
          color: 0x2ecc71,
          title: "List of commands.",
          description: description
        }
      })
  }

  try {
    // Finally require our read commands...
    let commandFile = require('./commands/' + command + '.js')
    // ...and launch them!
    commandFile.launch(client, config, message, args)
  } catch (err) {
    console.error(err)
  }
})

// Login our bot.
client.login(config.discord_bot_token)