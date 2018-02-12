const Discord = require('discord.js');
const bot = new Discord.Client();
const logid = "334663825468948481";
const config = require("./config.json");
const prefix = ";";
var cooldown = false;
bot.on('ready', () => {
    bot.user.setGame("test");
    bot.user.setStatus("dnd");
    console.log('Started!');
});
String.prototype.replaceAll = function(search, replacement){
    return this.replace(new RegExp(search, "g"), replacement);
};


bot.on('message', message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command === "link") {
      if (message.member.roles.exists('name', 'Elysian-Owners')) {
      message.author.send('**Elysian download link:** https://mega.nz/#F!WJUzwb6T!INfCOCZztvzmz0kwX58j0Q');
  } else {
      message.author.send('**You dont have the required role:** ``(Elysian-Owner).``');
  }
  }
    
   if (command === "join") {
      message.member.addRole("402160992978731009");
      message.channel.send('**You joined nsfw faggot**');
}

});
bot.login(process.env.BOT_TOKEN);
