import { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import CustomClient from "../classes/CustomClient";
import Category from "../enums/CategoryCommand";

export default interface iCommand {
    client: CustomClient;
    name: string;
    description: string;
    category: Category;
    options: object;
    default_member_permissions: bigint;
    dm_permission: boolean;
    cooldown: number;
    developer: boolean;

    Execute(Interaction: ChatInputCommandInteraction):void;
    AutoComplete(Interaction: AutocompleteInteraction):void;
    
}