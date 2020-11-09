import http from 'http';

interface IModuleDiscoveryStrategy {
    discover(): Promise<ModuleDefinition[]>;
}

interface IRouteRequests {
    route(req: http.IncomingMessage): Promise<ModuleDefinition>;
}

type EntryPoint = (req: http.IncomingMessage, res?: http.ServerResponse) => Promise<any> | void;

interface IModule {
    route?: string;

    execute?: EntryPoint;

    get?: EntryPoint;
    post?: EntryPoint;
    put?: EntryPoint;
    delete?: EntryPoint;
    options?: EntryPoint;
}

interface IGetModule {
    get: EntryPoint;
}

interface IPostModule {
    post: EntryPoint;
}

interface IPutModule {
    put: EntryPoint;
}

interface IDeleteModule {
    delete: EntryPoint;
}

interface IOptionsModule {
    options: EntryPoint;
}

interface ModuleDefinition {
    name: string;
    path: string;
    route: string;
}

interface ProcessContext {
    root: string;
}