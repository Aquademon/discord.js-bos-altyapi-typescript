import { ActivityType } from "discord.js";
import { client } from "../index";
import colors from "colors";

client.on("ready", client => {
    console.log(colors.red(`${client.user.tag} İsimli Bot Şuan Aktif!`));

    const activities = [
        {
            name: `by AquaDemon Development`,
            type: ActivityType.Playing
        }
    ];

    const status = ["dnd"];
    let i = 0;
    setInterval(() => {
        if (i >= activities.length) i = 0;
        client.user.setActivity(activities[i]);
        i++;
    }, 5000);

    let s = 0;
    setInterval(() => {
        if (s >= activities.length) s = 0;
        // @ts-ignore
        client.user.setStatus(status[s]);
        s++;
    }, 30000);
});
