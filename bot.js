'use strict';

const Discord = require("discord.js");
const fs = require("fs");
const trigger = "$mod ";

let config = require('./config.json')
let bot = new Discord.Client();
let commands = require('./commands.js').commands;

bot.on('ready', function() {
  console.log("ModBot ready to serve.")
});

bot.on("disconnected", function () {
	console.log("Bot has disconnected. Exiting...");
	process.exit(0); //exit node.js without an error cuz CI will complain if we don't use valid credentials
});

bot.on('message', function(msg) {
  if (msg.content[0] === config.discordjs_trigger) {
    var command = msg.content.toLowerCase().split(" ")[0].substring(1);
    var suffix = msg.content.substring(command.length + 2);
    var cmd = commands[command];
    if (cmd) {
      if(msg.channel.server.id == "127195735753097216") {
      cmd.process(bot, msg, suffix);
    } else {
      console.log("Ignored an outside command.")
    }
    }
  }
  if(~msg.content.indexOf('https://discord.gg')) {
    if(msg.channel.isPrivate) {
      return;
    } if(msg.channel.server.id === "127195735753097216") {
      if(msg.channel.permissionsOf(msg.author).hasPermission("manageMessages")) {
        return;
      } else {
        bot.deleteMessage(msg);
        bot.sendMessage(msg.channel, "Please don't send invites here!")
        bot.sendMessage('162536450330591232', "Deleted an invite from: " + msg.sender + " in " + msg.channel + ".")
      }
    }
  }
});

bot.on('serverNewMember', function(msg) {
  bot.sendMessage(msg.channel, "Welcome to STAR_BOT Offical Help Center, " + user)
});

bot.on('userBanned', function(msg) {
  bot.sendMessage('162536450330591232', "User " + user + " was banned.")
});

bot.on('userUnbanned', function(msg) {
  bot.sendMessage("162536450330591232", "User " + user + " was unbanned.")
});

bot.login(config.email, config.password)
