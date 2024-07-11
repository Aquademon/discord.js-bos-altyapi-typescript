module.exports = {
    name: "pin",
    run: async(client,message,args) => {
        message.reply(`Pingim: ${client.ws.ping}`)
    }
}