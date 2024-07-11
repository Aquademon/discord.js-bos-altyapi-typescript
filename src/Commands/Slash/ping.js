const {
    ApplicationCommandType,
    ApplicationCommandOptionType
  } = require("discord.js");
  

  module.exports = {
    name: "ping",
    description: "anan",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {
        interaction.reply(`Ping: ${client.ws.ping}`)
    }
}