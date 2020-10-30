import http from 'http';

import { DefaultModuleDiscoveryStrategy } from './DefaultModuleDiscoveryStrategy';
import { DefaultRooter } from './DefaultRooter';
import { ExecutionPipeline } from './ExecutionPipeline';
import { IModuleDiscoveryStrategy, IRouteRequests } from './types';

export class Bootstrapper {

    private _registered: boolean;
    private _moduleDiscovery: IModuleDiscoveryStrategy;
    private _router: IRouteRequests;

    constructor() {
        this._moduleDiscovery = new DefaultModuleDiscoveryStrategy();
    }

    public async registerModules() {
        const knownModules = await this._moduleDiscovery.discover();
        this._router = new DefaultRooter(knownModules);
        this._registered = true;
    }

    public async handle(req: http.IncomingMessage, res: http.ServerResponse) {
        const pipeline = new ExecutionPipeline(this._router);
        await pipeline.handle(req, res);
    }

    public listen(port: number) {
        if (!this._registered) {
            throw Error("Please run registerModules before starting listening.");
        }

        const server = http.createServer(async (req, res) => {
            await this.handle(req, res);
            res.end();
        });

        server.listen(port);
    }
}


