import { Events } from "discord.js";
import iEvent from "../interfaces/iEvent";
import CustomClient from "./CustomClient";
import iEventOptions from "../interfaces/iEventOptions";

export default class Event implements iEvent {
    client: CustomClient;
    name: Events;
    description: string;
    once: boolean;
    static ClientReady: any;
    constructor(client: CustomClient, options: iEventOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.once = options.once;
    }

    Execute(...args: any): void {};
}