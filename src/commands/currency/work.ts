import { CacheType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../ts-module/classes/Command";
import CustomClient from "../../ts-module/classes/CustomClient";
import Category from "../../ts-module/enums/CategoryCommand";
// ===================
import balanceSchema from "../../database/currencySchema";

export default class WorkCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "work",
      description: "Bekerja untuk mendapatkan coin Shiggy.",
      category: Category.Currency,
      default_member_permissions: PermissionsBitField.Flags.UseApplicationCommands,
      dm_permission: false,
      cooldown: 180,
      options: [],
      dev: false,
    });
  }

  async Execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const rng = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
    const user = interaction.user.id;
    const data = await balanceSchema.findOne({ userId: interaction.user.id });
    data
      ? await balanceSchema.updateOne({ userId: interaction.user.id }, { $inc: { balance: rng } })
      : new balanceSchema(
        {
          userId: interaction.user.id,
          balance: rng,
        }
      ).save();

    const occupations = [
      "Desainer Grafis",
      "Pengembang Web",
      "Dokter",
      "Guru",
      "Insinyur",
      "Akuntan",
      "Pengusaha",
      "Seniman",
      "Penulis",
      "Atlet"
    ];

    const occupationRng = Math.floor(Math.random() * occupations.length);
    const occupation = occupations[occupationRng];

    return interaction.reply({ content: `Kamu bekerja sebagai ${occupation} dan mendapatkan ${rng} coin Shiggy !` });
  }
}