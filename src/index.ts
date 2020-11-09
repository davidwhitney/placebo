import http from 'http';

import { DefaultModuleDiscoveryStrategy } from './ModuleDetection/DefaultModuleDiscoveryStrategy';
import { DefaultRouter } from './Routing/DefaultRouter';
import { ExecutionPipeline } from './RequestProcessing/ExecutionPipeline';
import { IModuleDiscoveryStrategy, IRouteRequests, ProcessContext } from './types';

export class Bootstrapper {

    private _processContext: ProcessContext;
    private _registered: boolean;
    private _moduleDiscovery: IModuleDiscoveryStrategy;
    private _router: IRouteRequests;

    constructor(root: string) {
        this._processContext = { root: root };
        this._moduleDiscovery = new DefaultModuleDiscoveryStrategy(this._processContext);
    }

    public async registerModules() {
        const knownModules = await this._moduleDiscovery.discover();
        this._router = new DefaultRouter(knownModules);
        this._registered = true;
    }

    public async handle(req: http.IncomingMessage, res: http.ServerResponse) {
        const pipeline = new ExecutionPipeline(this._router, this._processContext);
        await pipeline.tryHandle(req, res);
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