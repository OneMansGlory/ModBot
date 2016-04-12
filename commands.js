exports.commands = {
  "userinfo":{
  process: function(bot, msg, suffix){
  if (msg.mentions.length==0) bot.reply(msg, "Please specify a user.");
  else {
      for (var user of msg.mentions) if (user!=null) {
          var info = [];
          info.push("**User info**: "+user.username);
          info.push("\`\`\`");
          info.push("ID: "+user.id);
          info.push("Status: " + user.status);
          info.push("Discriminator: "+user.discriminator);
          info.push("Avatar URL: <"+user.avatarURL+">");
          info.push("\`\`\`");
          bot.sendMessage(msg, info);
      }
  }
  }
  },
  "purge": {
 name: "purge",
 usage: "<number-of-messages-to-delete> [force]",
 extendedhelp: "I'll delete a certain ammount of messages.",
 process: function(bot, msg, suffix) {
   if (!msg.channel.server) {
     bot.sendMessage(msg.channel, "Please use this command in an actual server. Idiot.");
     return;
   }
   if (!suffix){
     bot.sendMessage(msg.channel, "Please add a number ranging from 1-100 indicating how many messages I am to delete.");
     return;
   }
   if (!msg.channel.permissionsOf(msg.sender).hasPermission("manageMessages")) {
     bot.sendMessage(msg.channel, "According to the server, you don't have permissions to delete messages. Nice try.");
     return;
   }
   if (!msg.channel.permissionsOf(bot.user).hasPermission("manageMessages")) {
     bot.sendMessage(msg.channel, "I don't have permissions to delete messages!");
     return;
   }
   if (suffix.split(" ")[0] > 100){
     bot.sendMessage(msg.channel, "The maximum is 100, 20 without `force`.");
     return;
   }
   bot.getChannelLogs(msg.channel, suffix.split(" ")[0], function(error, messages){
     if (error){
       bot.sendMessage(msg.channel, "Something bad happened. Contact my owner.");
       return;
     } else {
       var todo = messages.length,
       delcount = 0;
       for (msg of messages){
         bot.deleteMessage(msg);
         todo--;
         delcount++;
       if (todo === 0){
         bot.sendMessage(msg.channel, "Channel purged. Deleted " + delcount + " messages.")
         return;
         }}
       }
     }
 );}}
};
