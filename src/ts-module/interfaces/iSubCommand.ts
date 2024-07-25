import { ChatInputCommandInteraction } from "discord.js";
import CustomClient from "../classes/CustomClient";

export default interface iSubCommand{
    client: CustomClient
    name: string;

    Execute(interaction: ChatInputCommandInteraction):void;
}