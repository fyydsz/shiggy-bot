import { ChatInputCommandInteraction, CacheType } from "discord.js";
import iSubCommand from "../interfaces/iSubCommand";
import iSubCommandOptions from "../interfaces/iSubCommandOptions";
import CustomClient from "./CustomClient";

export default class SubCommand implements iSubCommand {
    client: CustomClient;
    name: string;

    constructor(client: CustomClient, options: iSubCommandOptions) {
        this.client = client
        this.name = options.name
    }
    Execute(interaction: ChatInputCommandInteraction<CacheType>): void {}
}