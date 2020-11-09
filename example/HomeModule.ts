import { IncomingMessage, ServerResponse } from "http";
import { IModule } from "../src/types";

export class HomeModule implements IModule {

    public route = "/";

    async get(req: IncomingMessage, res?: ServerResponse): Promise<any> {
        return { hello: "world" };
    }
}