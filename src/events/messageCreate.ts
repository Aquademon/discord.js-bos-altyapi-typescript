import { EmbedBuilder, Collection, PermissionsBitField } from "discord.js";
import humanizeDuration from "humanize-duration";
import config from "../config";
import client from "../index";

const prefix = config.PREFIX;
const cooldown = new Collection();