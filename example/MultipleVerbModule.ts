import { IncomingMessage, ServerResponse } from "http";
import { IModule } from "../src/types";

export class MultipleVerbModule implements IModule {

    async get(req: IncomingMessage, res?: ServerResponse): Promise<any> {
        res.write('MultipleVerbModule: Hello World!');
    }

    async put(req: IncomingMessage, res?: ServerResponse): Promise<any> {
        res.write('MultipleVerbModule: Hello World!');
    }

    async post(req: IncomingMessage, res?: ServerResponse): Promise<any> {
        res.write('MultipleVerbModule: Hello World!');
    }

    async options(req: IncomingMessage, res?: ServerResponse): Promise<any> {
        res.write('MultipleVerbModule: Hello World!');
    }

    async delete(req: IncomingMessage, res?: ServerResponse): Promise<any> {
        res.write('MultipleVerbModule: Hello World!');
    }
}