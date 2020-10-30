import { IModuleDiscoveryStrategy, ModuleDefinition } from './types';

export class DefaultModuleDiscoveryStrategy implements IModuleDiscoveryStrategy {
    async discover(): Promise<ModuleDefinition[]> {
        return [
            { name: "Home", path: "../example/HomeModule" }
        ];
    }
}
