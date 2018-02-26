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

bot.on('messageDelete', (message) => {
	let member = message.guild.member(message.author);
	if (message.embeds.length === 1) return;
	let user = member.user
	let modChannel = message.guild.channels.find('name', 'vip-and-pro-logs')
	
	let embed = {
		color: 0xbc1007,
		title: "Message Deleted!",
		description: `${message.cleanContent}`,
		footer: {
			icon_url: user.avatarURL,
			text: `${user.username} | ${message.channel.name}`
		},
		timestamp: new Date()
	}
	modChannel.send({embed})
})
bot.on('messageUpdate', (omsg, nmsg) =>{
    let member = omsg.guild.member(omsg.author);
    if (omsg.embeds.length === 1) return;
    let user = member.user
    let modChannel = omsg.guild.channels.find('name', 'vip-and-pro-logs')

    let embed = {
        color: 0xbc1007,
        title: "Message Edited!",
        description: `**Old Message:** ${omsg.content}\n**New Message:** ${nmsg.content}`,
        footer: {
            icon_url: user.avatarURL,
            text: `${user.username} | ${omsg.channel.name}`
        },
        timestamp: new Date()
    }
    modChannel.send({embed}) 
});


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
    
   if (command === "nsfw") {
      message.member.addRole("402160992978731009");
      message.author.send('**You joined nsfw faggot**');
}

});
bot.login(process.env.BOT_TOKEN);
