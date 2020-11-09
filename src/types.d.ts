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

    execute?(req: http.IncomingMessage, res?: http.ServerResponse): Promise<any> | void;

    get?(req: http.IncomingMessage, res?: http.ServerResponse): Promise<any> | void;
    post?(req: http.IncomingMessage, res?: http.ServerResponse): Promise<any> | void;
    put?(req: http.IncomingMessage, res?: http.ServerResponse): Promise<any> | void;
    delete?(req: http.IncomingMessage, res?: http.ServerResponse): Promise<any> | void;
    options?(req: http.IncomingMessage, res?: http.ServerResponse): Promise<any> | void;
}

interface IGetModule {
    get(req: http.IncomingMessage, res?: http.ServerResponse): Promise<any> | void;
}

interface IPostModule {
    post(req: http.IncomingMessage, res?: http.ServerResponse): Promise<any> | void;
}

interface IPutModule {
    put(req: http.IncomingMessage, res?: http.ServerResponse): Promise<any> | void;
}

interface IDeleteModule {
    delete(req: http.IncomingMessage, res?: http.ServerResponse): Promise<any> | void;
}

interface IOptionsModule {
    options(req: http.IncomingMessage, res?: http.ServerResponse): Promise<any> | void;
}

interface ModuleDefinition {
    name: string;
    path: string;
    route: string;
}

interface ProcessContext {
    root: string;
}