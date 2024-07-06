export default {
  data: {
    name: "ping",
    description: "Botun Ping Gösterir",
  },
  run: async function(client,interaction) {
await interaction.reply(`🏓 Pong ${client.ws.ping}ms`)
 }
}
