import { CacheType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../ts-module/classes/Command";
import CustomClient from "../../ts-module/classes/CustomClient";
import Category from "../../ts-module/enums/CategoryCommand";
// ===================
import balanceSchema from "../../database/currencySchema";

export default class BalanceCommand extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "balance",
            description: "Menampilkan berapa banyak coin Shiggy yang kamu miliki.",
            category: Category.Currency,
            default_member_permissions: PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: false,
            cooldown: 3,
            options: [],
            dev: false,
        });
    }
    async Execute(interaction: ChatInputCommandInteraction<CacheType>) {
        const data = await balanceSchema.findOne({ userId: interaction.user.id });
        if (!data) return interaction.reply({ content: "Sepertinya kamu belum mempunyai coin Shiggy." });
        const balanceAmount = data.balance;
        return interaction.reply({ content: `Kamu memiliki ${balanceAmount} coin Shiggy.`});
    }
}