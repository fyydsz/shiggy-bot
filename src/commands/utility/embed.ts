import { ActionRowBuilder, ApplicationCommandOptionType, CacheType, ChatInputCommandInteraction, ModalBuilder, PermissionsBitField, TextInputBuilder, TextInputStyle } from "discord.js";
import Command from "../../ts-module/classes/Command";
import CustomClient from "../../ts-module/classes/CustomClient";
import Category from "../../ts-module/enums/Category";

export default class EmbedCommand extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "embed",
            description: "Pesan embed.",
            category: Category.Utility,
            default_member_permissions: PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: false,
            cooldown: 3,
            options: [{
                name: "create",
                description: "Buat pesan embed.",
                type: ApplicationCommandOptionType.Subcommand,
                options:[]
            }],
            dev: true,
        })
    }
    async Execute(interaction: ChatInputCommandInteraction<CacheType>){
        const modal = new ModalBuilder().setCustomId("embedCreate").setTitle("Buat pesan Embed");

		// Add components to modal

		// Create the text input components
		const judul = new TextInputBuilder()
			.setRequired(false)
			.setCustomId("Judul")
			.setLabel("Judul pesan")
			.setStyle(TextInputStyle.Short);

		const deskripsi = new TextInputBuilder()
			.setRequired(false)
			.setCustomId("Deskripsi")
			.setLabel("Deskripsi pesan")
			.setStyle(TextInputStyle.Paragraph);

		const warna = new TextInputBuilder()
			.setRequired(false)
			.setCustomId("Warna")
			.setLabel("Warna")
			.setStyle(TextInputStyle.Short);

		const gambar = new TextInputBuilder()
			.setRequired(false)
			.setCustomId("Gambar")
			.setLabel("Link gambar (opsional)")
			.setStyle(TextInputStyle.Short);

		const messageContent = new TextInputBuilder()
			.setRequired(false)
			.setCustomId("Footer")
			.setLabel("Footer")
			.setStyle(TextInputStyle.Short);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(judul);
		const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(deskripsi);
		const thirdActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(warna);
		const fourthActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(gambar);
		const fifthActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(messageContent);

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);
		// Show the modal to the user
		await interaction.showModal(modal);
    }
}