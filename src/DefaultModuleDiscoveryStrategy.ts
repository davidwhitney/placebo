import { IModuleDiscoveryStrategy, ModuleDefinition, ProcessContext } from './types';

export class DefaultModuleDiscoveryStrategy implements IModuleDiscoveryStrategy {

    private _context: ProcessContext;

    constructor(context: ProcessContext) {
        this._context = context;
    }

    async discover(): Promise<ModuleDefinition[]> {

        // Do some file system scanning here.

        return [
            { name: "Home", path: "HomeModule" }
        ];
    }
}
