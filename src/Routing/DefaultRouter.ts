import http from 'http';
import { ModuleDefinitionCollection } from '../ModuleDetection/ModuleDefinitionCollection';
import { ModuleDefinition } from '../types';
import { RequestDecorator } from './RequestDecorator';

export class DefaultRouter {

    private _modules: ModuleDefinitionCollection;

    constructor(modules: ModuleDefinition[]) {
        this._modules = new ModuleDefinitionCollection(modules);
    }

    public async route(req: http.IncomingMessage): Promise<ModuleDefinition | null> {
        const request = new RequestDecorator(req);

        const matchingModules = this._modules.matching(req.url, req.method);
        const noMatchingModules = matchingModules.length === 0;

        if (noMatchingModules
            && request.isForRoot
            && this._modules.hasDefaultModule) {
            return this._modules.firstDefaultModule;
        }

        if (noMatchingModules) {
            return null;
        }

        return matchingModules[0];
    }
}

