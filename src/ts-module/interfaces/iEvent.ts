import { Events } from "discord.js";
import CustomClient from "../classes/CustomClient";

export default interface iEvent {
    client: CustomClient;
    name: Events;
    description: string;
    once: boolean

}