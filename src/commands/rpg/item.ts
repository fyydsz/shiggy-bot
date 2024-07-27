import { ApplicationCommandOptionType, CacheType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../ts-module/classes/Command";
import CustomClient from "../../ts-module/classes/CustomClient";
import Category from "../../ts-module/enums/Commands/CategoryCommand";
import EquipmentItem from "../../ts-module/enums/RPG/Equipment";
import UsableItem from "../../ts-module/enums/RPG/Usable";

export default class ItemCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "item",
      description: "Command Item",
      category: Category.RPG,
      default_member_permissions: PermissionsBitField.Flags.UseApplicationCommands,
      dm_permission: false,
      cooldown: 3,
      options: [
        {
          name: "info",
          description: "Memberikan informasi tentang item.",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "usable",
              description: "Nama item yang ingin diketahui.",
              type: ApplicationCommandOptionType.String,
              choices: [
                { name: "PotionHP", value: UsableItem.PotionHP },
                { name: "PotionMP", value: UsableItem.PotionMP },
              ]
            },
            {
              name: "equipment",
              description: "Nama item yang ingin diketahui.",
              type: ApplicationCommandOptionType.String,
              choices: [
                { name: "Sword", value: EquipmentItem.Sword },
                { name: "Shield", value: EquipmentItem.Shield },
                { name: "Bow", value: EquipmentItem.Bow },
                { name: "Stuff", value: EquipmentItem.Stuff },
                { name: "Gun", value: EquipmentItem.Gun },
              ]
            }
          ]
        }
      ],
      dev: false,
    })
  }

  async Execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const subcommand = interaction.options.getSubcommand()
    if (subcommand === 'info') {
      const usableItem = interaction.options.getString("usable");
      const equipmentItem = interaction.options.getString("equipment");
      if (!usableItem && !equipmentItem) return interaction.reply("Harus pilih salah satu option.");
      if (usableItem && equipmentItem) return interaction.reply("Harus memilih salah satu option.");

      // Extract the item descriptions into a separate object for easier management
      const itemDescriptions = {
        [UsableItem.PotionHP]: "Potion HP adalah sebuah item yang dapat digunakan untuk mengembalikan Health Point Anda.",
        [UsableItem.PotionMP]: "Potion MP adalah sebuah item yang dapat digunakan untuk mengembalikan Mana Point Anda.",
        [EquipmentItem.Sword]: "Sword adalah sebuah item yang dapat digunakan untuk menyerang musuh.",
        [EquipmentItem.Shield]: "Shield adalah sebuah item yang dapat digunakan untuk melindungi diri.",
        [EquipmentItem.Bow]: "Bow adalah sebuah item yang dapat digunakan untuk menembak musuh dengan busur.",
        [EquipmentItem.Stuff]: "Stuff adalah sebuah item yang dapat digunakan untuk meningkatkan statistik.",
        [EquipmentItem.Gun]: "Gun adalah sebuah item yang dapat digunakan untuk menembak musuh dengan senjata."
      }

      if (usableItem) {
        interaction.reply({ content: itemDescriptions[usableItem as keyof typeof itemDescriptions] });
      } else if (equipmentItem) {
        interaction.reply({ content: itemDescriptions[equipmentItem as keyof typeof itemDescriptions] });
      }
    }
  }
}
