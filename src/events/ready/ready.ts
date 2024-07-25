import { Collection, Events, REST, Routes } from "discord.js";
import { configDotenv } from "dotenv";
import CustomClient from "../../ts-module/classes/CustomClient";
import Event from "../../ts-module/classes/Events";
import Command from "../../ts-module/classes/Command";

const env = configDotenv();
const token = process.env.TOKEN!
const clientId = process.env.CLIENTID!

export default class Ready extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.ClientReady,
            description: "Ready Event",
            once: true
        })
    }
    async Execute(...args: any) {
        console.log(`${this.client.user?.tag} is now ready!`);
        
        const commands: object[] = this.GetJson(this.client.commands);
        const rest = new REST().setToken(token);
        const setCommands: any = await rest.put(Routes.applicationCommands(clientId), {body: commands});
        console.log(`Berhasil set ${setCommands.length} commands!`);
    }

    private GetJson(commands: Collection<string, Command>): object[] {
        const data: object[] = [];
        commands.forEach(command => {
            data.push({
                name: command.name,
                description: command.description,
                options: command.options,
                default_member_permissions: command.default_member_permissions.toString(),
                dm_permission: command.dm_permission,
            })
        });

        return data;
    }
}