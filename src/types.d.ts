import http from 'http';

interface IModuleDiscoveryStrategy {
    discover(): Promise<ModuleDefinition[]>;
}

interface IRouteRequests {
    route(req: http.IncomingMessage): Promise<ModuleDefinition>;
}

interface IModule {
    execute(req: http.IncomingMessage, res?: http.ServerResponse): Promise<any> | void;
}

interface ModuleDefinition {
    name: string;
    path: string;
}

interface ProcessContext {
    root: string;
}