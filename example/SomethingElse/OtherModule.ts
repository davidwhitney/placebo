import { IncomingMessage, ServerResponse } from "http";
import { IModule } from "../../src/types";

export class OtherModule implements IModule {

    public route = "/other";

    async execute(req: IncomingMessage, res?: ServerResponse): Promise<any> {
        res.write('Hello other World!');
    }

}