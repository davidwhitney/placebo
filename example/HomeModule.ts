import { IncomingMessage, ServerResponse } from "http";
import { IModule } from "../src/types";

export class HomeModule implements IModule {
    async get(req: IncomingMessage, res?: ServerResponse): Promise<any> {
        return { hello: "world" };
    }
}