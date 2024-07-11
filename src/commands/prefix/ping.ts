export default {
    name: "ping",
    run: async function (client, message, args) {
        await message.reply(`🏓 Pong ${client.ws.ping}ms`);
    }
};