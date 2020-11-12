import http from 'http';

import { DefaultModuleDiscoveryStrategy } from './ModuleDetection/DefaultModuleDiscoveryStrategy';
import { DefaultRouter } from './Routing/DefaultRouter';
import { ModuleExecutionComponent } from './RequestProcessing/ModuleExecutionComponent';
import { IModuleDiscoveryStrategy, IRouteRequests, ProcessContext } from './types';
import { SupportedFormatters } from "./ContentNegotiation/SupportedFormatters";
import { ExecutionPipeline } from './RequestProcessing/ExecutionPipeline';
import { StaticFileComponent } from './RequestProcessing/StaticFileComponent';

export class Bootstrapper {

    private _processContext: ProcessContext;
    private _registered: boolean;
    private _moduleDiscovery: IModuleDiscoveryStrategy;
    private _router: IRouteRequests;
    private _supportedFormatters: SupportedFormatters;
    private _executionPipeline: ExecutionPipeline;

    constructor(root: string) {
        this._processContext = { root: root };
        this._moduleDiscovery = new DefaultModuleDiscoveryStrategy(this._processContext);
        this._supportedFormatters = SupportedFormatters.default;
        this._executionPipeline = new ExecutionPipeline([
            new ModuleExecutionComponent()
        ]);
    }

    public async registerModules() {
        const knownModules = await this._moduleDiscovery.discover();
        this._router = new DefaultRouter(knownModules);
        this._registered = true;
    }

    public async registerStatic(fileSystemLocation: string, virtualPath: string) {
        const staticFileHandlingComponent = new StaticFileComponent(fileSystemLocation, virtualPath);
        this._executionPipeline.components.unshift(staticFileHandlingComponent)
    }

    public async handle(req: http.IncomingMessage, res: http.ServerResponse) {

        const requestContext = {
            req,
            res,
            router: this._router,
            processContext: this._processContext,
            formatters: this._supportedFormatters
        };

        const result = await this._executionPipeline.tryExecute(req, res, requestContext);

        // Evaluate result in some way here.
        // Trigger error handling, etc etc
    }

    public listen(port: number) {
        if (!this._registered) {
            throw Error("Please run registerModules before starting listening.");
        }

        console.log("Starting")
        console.log("Pipeline", this._executionPipeline.components);
        console.log("Modules", this._router.modules);

        const server = http.createServer(async (req, res) => {
            await this.handle(req, res);
            res.end();
        });

        server.listen(port);
    }
}


