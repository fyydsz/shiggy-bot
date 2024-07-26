import Category from "../enums/CategoryCommand";

export default interface iCommandOptions {
    name: string;
    description: string;
    category: Category;
    options: object;
    default_member_permissions: bigint;
    dm_permission: boolean;
    cooldown: number;
    dev: boolean;
}