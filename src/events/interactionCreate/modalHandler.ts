
import { setTimeout } from 'node:timers/promises';
const wait = (...args: Parameters<typeof setTimeout>) => setTimeout(...args);
import CustomClient from "../../ts-module/classes/CustomClient";
import Event from "../../ts-module/classes/Events";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ColorResolvable, EmbedBuilder, EmbedFooterData, Events, ModalSubmitInteraction, TextChannel, } from "discord.js";

export default class ModalHandler extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.InteractionCreate,
      description: "Modal Handler",
      once: false
    })
  }
  async Execute(interaction: ModalSubmitInteraction) {
    if (!interaction.isModalSubmit()) return;
    const { customId } = interaction;

    
    if (customId === "embedCreate") {
      let judul: string | null = interaction.fields.getTextInputValue("Judul");
      let deskripsi: string | null = interaction.fields.getTextInputValue("Deskripsi");
      let warna: string | null = interaction.fields.getTextInputValue("Warna").toLowerCase();
      let gambar: string | null = interaction.fields.getTextInputValue("Gambar");
      let footer: string | null = interaction.fields.getTextInputValue("Footer");

      if (judul === "") judul = null;
      if (deskripsi === "") deskripsi = null;
      if (warna === "kuning") warna = "#dbeb23";
      else if (warna === "biru") warna = "#237feb";
      else if (warna === "hijau") warna = "#33eb23";

      const hexRGB = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g;
      if (!warna.match(hexRGB))
        return interaction.reply({
          content: "Kamu memasukkan warna yang salah",
          ephemeral: true,
        });

      try {
        const embed = new EmbedBuilder().setTitle(judul).setDescription(deskripsi).setColor(warna as ColorResolvable);

        if (gambar === "") embed.setImage(null);
        else if (gambar.match(/(https?:\/\/.*\.(?:png|jpg|gif))/i)) embed.setImage(gambar);

        if (footer) {
          const footerData: EmbedFooterData = { text: footer };
          await interaction.deferReply({ ephemeral: true });
          wait(4000);
          interaction.editReply("Berhasil mengirim embed!");
          embed.setFooter(footerData);
          return interaction.channel?.send({
            embeds: [embed],
          });
        } else {
          await interaction.deferReply({ ephemeral: true });
          wait(4000);
          interaction.editReply("Berhasil mengirim embed!");
          return interaction.channel?.send({ embeds: [embed] });
        }
      } catch (err) {
        return console.log(err);
      }
    }
  }
}