import { GatewayIntentBits, Client, Collection } from "discord.js";
import iCustomClient from "../interfaces/iCustomClient";
import { configDotenv } from "dotenv";
import Handler from "./Handler";
import Command from "./Command";
import SubCommand from "./SubCommand";

const env = configDotenv();
const token = process.env.TOKEN

export default class CustomClient extends Client implements iCustomClient {
    handlers: Handler;
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    cooldowns: Collection<string, Collection<string, number>>;
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessageReactions,
            ]
        })
        this.handlers = new Handler(this);
        this.commands = new Collection();
        this.subCommands = new Collection();
        this.cooldowns = new Collection();
    }
    
    
    
    Init(): void {
        this.LoadHandlers();
        this.login(token).catch((err) => console.error(err));
    }

    LoadHandlers(): void {
        this.handlers.loadEvents();
        this.handlers.loadCommands();
    }
}