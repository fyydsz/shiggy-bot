import { ChatInputCommandInteraction, Events } from "discord.js";
import CustomClient from "../../ts-module/classes/CustomClient";
import Event from "../../ts-module/classes/Events";
import Command from "../../ts-module/classes/Command";
import { Collection } from "discord.js";
import { developer } from "../../../config.json";

export default class CommandHandler extends Event {
    
    constructor(client: CustomClient) {
        super(client, {
            name: Events.InteractionCreate,
            description: "Command Handler Event",
            once: false
        })
    }
    Execute(interaction: ChatInputCommandInteraction){
        if (!interaction.isChatInputCommand()) return;
        const command: Command = this.client.commands.get(interaction.commandName)!;

        //@ts-ignore
        if (!command) return interaction.reply({ content: "Command ini tidak ada.", ephemeral: true });
        if (command.developer && !developer.includes(interaction.user.id)) {
            return interaction.reply({ content: "Command ini hanya untuk developer.", ephemeral: true });
        }

        const { cooldowns } = this.client;

        if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());
        const now = Date.now();
        const timestamps = cooldowns.get(command.name)!;
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(interaction.user.id) && (now < (timestamps.get(interaction.user.id) || 0) + cooldownAmount ))
            return interaction.reply({ content: `Dalam cooldown ${((((timestamps.get(interaction.user.id) || 0) + cooldownAmount) - now) /1000).toFixed(1)} Detik`, ephemeral: true });

        timestamps.set(interaction.user.id, now);
        setTimeout(() =>  timestamps.delete(interaction.user.id), cooldownAmount);

        try {
            const subCommandsGroup = interaction.options.getSubcommandGroup(false);
            const subCommand = `${interaction.commandName}${subCommandsGroup ? `.${subCommandsGroup}` : ""}.${interaction.options.getSubcommand(false) || ""}`

            return this.client.subCommands.get(subCommand)?.Execute(interaction) || command.Execute(interaction);
        } catch (err) {
            console.log(err)
        }

    }

}