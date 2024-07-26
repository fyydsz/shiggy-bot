import { ApplicationCommandOptionType, CacheType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../ts-module/classes/Command";
import CustomClient from "../../ts-module/classes/CustomClient";
import Category from "../../ts-module/enums/CategoryCommand";
// ===================
import balanceSchema from "../../database/currencySchema";

export default class GiveCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "give",
      description: "Memberikan sesuatu kepada user",
      category: Category.Currency,
      default_member_permissions: PermissionsBitField.Flags.UseApplicationCommands,
      dm_permission: false,
      cooldown: 2,
      options: [
        {
          name: "money",
          description: "Memberikan uang kepada user.",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "user",
              description: "User yang akan diberikan uang",
              type: ApplicationCommandOptionType.User,
              required: true
            },
            {
              name: "amount",
              description: "Jumlah uang yang akan diberikan",
              type: ApplicationCommandOptionType.Integer,
              required: true,
            }
          ]
        },
      ],
      dev: false,
    });
  }

  async Execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const user = interaction.options.getUser("user");
    if (user?.bot) return interaction.reply({ content: "Kamu tidak bisa mengirim uang ke bot!", ephemeral: true });

    const amount = interaction.options.getInteger("amount");
    const myBalance = await balanceSchema.findOne({ userId: interaction.user.id });
    // create an if
    if (myBalance?.balance! < amount!) {
      return interaction.reply({
        content: `Anda tidak memiliki cukup uang untuk memberikan ${amount} kepada ${user?.tag}`, ephemeral: true
      });
    }

    const theirBalance = await balanceSchema.findOne({ userId: user?.id });
    if (!theirBalance) {
      new balanceSchema({ userId: user?.id, balance: amount }).save();
    } else {
      await theirBalance.updateOne({ $inc: { balance: amount } });
    }
    await myBalance?.updateOne({ $inc: { balance: -amount! } });
    return interaction.reply({ content: `Berhasil memberikan ${amount} coin Shiggy kepada ${user?.tag}` });
  }
} 