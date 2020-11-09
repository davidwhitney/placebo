import { ModuleDefinition } from '../types';


export class ModuleDefinitionCollection {
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
