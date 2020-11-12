import http from 'http';
import { SupportedFormatters } from './ContentNegotiation/SupportedFormatters';
import { ModuleDefinitionCollection } from './ModuleDetection/ModuleDefinitionCollection';

interface IModuleDiscoveryStrategy {
    discover(): Promise<ModuleDefinition[]>;
}

interface IRouteRequests {
    modules: ModuleDefinitionCollection;
    route(req: http.IncomingMessage): Promise<ModuleDefinition>;
}

type EntryPoint = (req: http.IncomingMessage, res?: http.ServerResponse) => Promise<any> | void;

type PipelinExecuteFunction = (req: http.IncomingMessage, res: http.ServerResponse, ctx: RequestContext) => Promise<boolean | null>;

interface IPipelineComponent {
    handle: PipelinExecuteFunction;
}

interface RequestContext {
    req: http.IncomingMessage;
    res: http.ServerResponse;
    router: IRouteRequests;
    processContext: ProcessContext;
    formatters: SupportedFormatters
}

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