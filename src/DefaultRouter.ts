import http from 'http';
import { ModuleDefinition } from './types';

export class DefaultRouter {

    private _modules: ModuleDefinitionCollection;

    constructor(modules: ModuleDefinition[]) {
        this._modules = new ModuleDefinitionCollection(modules);
    }

    public async route(req: http.IncomingMessage): Promise<ModuleDefinition> {
        const request = new RequestDecorator(req);

        const matchingModules = this._modules.matching(req.url, req.method);

        if (matchingModules.length === 0) {

            return { name: "FourZeroFour", path: req.url, route: req.url };

        }

        return matchingModules[0];
    }
}

class ModuleDefinitionCollection {
    private _modules: ModuleDefinition[];

    constructor(modules: ModuleDefinition[]) {
        this._modules = modules;
    }

    public matching(url: string, method: string): ModuleDefinition[] {
        return this._modules.filter(m => m.route === url) ?? [];
    }

    public get anyRegisteredDefaults(): ModuleDefinition[] {
        return this._modules.filter(m => this.isDefaultModule(m.name)) ?? [];
    }

    public get hasDefaultModule(): boolean {
        return this.anyRegisteredDefaults.length > 0;
    }

    public get firstDefaultModule(): ModuleDefinition {
        const anyDefaultModules = this.anyRegisteredDefaults;
        if (anyDefaultModules.length > 0) {
            return anyDefaultModules[0];
        }
        throw new Error("No Default Modules found!");
    }

    private isDefaultModule(name: string): boolean {
        return ["home", "index", "default"].indexOf(name.toLowerCase()) > -1;
    }
}

class RequestDecorator {
    public readonly req: http.IncomingMessage;

    constructor(req: http.IncomingMessage) {
        this.req = req;
    }

    public get isForRoot() {
        return this.req.url === "/";
    }
}