import http from 'http';
import { ModuleDefinition } from './types';

export class DefaultRooter {

    private _modules: ModuleDefinition[];

    constructor(modules: ModuleDefinition[]) {
        this._modules = modules;
    }

    public async route(req: http.IncomingMessage): Promise<ModuleDefinition> {
        return this._modules[0];
    }
}
