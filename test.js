const Discord = require('discord.js');
const bot = new Discord.Client();
const logid = "334663825468948481";
const config = require("./config.json");
const prefix = "$";
var cooldown = false;
bot.on('ready', () => {
    bot.user.setGame("Logs for VIP and Pro");
    bot.user.setStatus("invisible");
    console.log('Started!');
});
String.prototype.replaceAll = function(search, replacement){
    return this.replace(new RegExp(search, "g"), replacement);
};
bot.on('messageDelete', (message) => {
	let member = message.guild.member(message.author);
	if (message.embeds.length === 1) return;
	let user = member.user
	let modChannel = message.guild.channels.find('name', 'vip-logs')
	
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
    let modChannel = omsg.guild.channels.find('name', 'vip-logs')

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

  if (command === "support") {
      if (message.member.roles.exists('name', 'Elysian-owners')) {
      message.channel.sendMessage('**You have been added to the role wait for a staff to respond.**');
  } else {
      message.channel.sendMessage('**You dont have the required role:** ``(Elysian-Owner).``');
  }
  }

});
bot.login(process.env.BOT_TOKEN);
