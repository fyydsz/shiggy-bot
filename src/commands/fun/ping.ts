import { CacheType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../ts-module/classes/Command";
import CustomClient from "../../ts-module/classes/CustomClient";
import Category from "../../ts-module/enums/Category";

export default class PingCommand extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "ping",
            description: "Ping command",
            category: Category.Fun,
            default_member_permissions: PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: false,
            cooldown: 3,
            options: [],
            dev: false,
        })
    }
    Execute(interaction: ChatInputCommandInteraction<CacheType>): void {
        const ping = interaction.client.ws.ping
        interaction.reply({ content: `I got ${ping}ms.`})
    }
}