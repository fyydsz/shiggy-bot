import { Events } from "discord.js";

export default interface iEventOptions {
    name: Events;
    description: string;
    once: boolean;
}