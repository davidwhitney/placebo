import http from 'http';
import { ModuleDefinitionCollection } from '../ModuleDetection/ModuleDefinitionCollection';
import { ModuleDefinition } from '../types';
import { RequestDecorator } from './RequestDecorator';

export class DefaultRouter {

    public modules: ModuleDefinitionCollection;

    constructor(modules: ModuleDefinition[]) {
        this.modules = new ModuleDefinitionCollection(modules);
    }

    public async route(req: http.IncomingMessage): Promise<ModuleDefinition | null> {
        const request = new RequestDecorator(req);

        const matchingModules = this.modules.matching(req.url, req.method);
        const noMatchingModules = matchingModules.length === 0;

        if (noMatchingModules
            && request.isForRoot
            && this.modules.hasDefaultModule) {
            return this.modules.firstDefaultModule;
        }

        if (noMatchingModules) {
            return null;
        }

        return matchingModules[0];
    }
}

