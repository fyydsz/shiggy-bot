import { ChatInputCommandInteraction, CacheType, AutocompleteInteraction } from "discord.js";
import Category from "../enums/CategoryCommand";
import iCommand from "../interfaces/iCommand";
import CustomClient from "./CustomClient";
import iCommandOptions from "../interfaces/iCommandOptions";

export default class Command implements iCommand{
    client: CustomClient;
    name: string;
    description: string;
    category: Category;
    options: object;
    default_member_permissions: bigint;
    dm_permission: boolean;
    cooldown: number;
    developer: boolean;
    
    constructor(client: CustomClient, options: iCommandOptions) {
        this.client = client
        this.name = options.name;
        this.description = options.description;
        this.category = options.category;
        this.options = options.options;
        this.default_member_permissions = options.default_member_permissions;
        this.dm_permission = options.dm_permission;
        this.cooldown = options.cooldown;
        this.developer = options.dev
    }
    
    Execute(Interaction: ChatInputCommandInteraction<CacheType>): void {
        throw new Error("Method not implemented.");
    }
    AutoComplete(Interaction: AutocompleteInteraction<CacheType>): void {
        throw new Error("Method not implemented.");
    }

}