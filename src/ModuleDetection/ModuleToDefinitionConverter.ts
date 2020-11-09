import path from 'path';
import { Activator } from "../Activator";
import { IModule, ModuleDefinition, ProcessContext } from '../types';

export class ModuleToDefinitionConverter {

    public static convert(pathAndFilename: string, context: ProcessContext): ModuleDefinition {
        const f = pathAndFilename;

        const name = f.replace("Module.ts", "").replace("Module.js", "");
        const modulePath = f.replace(".ts", "").replace(".js", "");

        const absolutePath = path.join(context.root, modulePath);
        const instance = Activator.createInstance<IModule>(absolutePath);

        const route = instance.route ?? modulePath.replace("\\", "/").replace("Module", "");

        return {
            name,
            path: modulePath,
            route
        };
    }
}
