import { IncomingMessage, ServerResponse } from "http";
import { IModule } from "../src/types";

export class HomeModule implements IModule {

    async execute(req: IncomingMessage, res?: ServerResponse): Promise<any> {
        res.write('Hello World!'); //write a response to the client
    }

}