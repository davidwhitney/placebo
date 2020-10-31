import fs from 'fs';
import path from 'path';
import { Activator } from "./Activator";
import { IModule, IModuleDiscoveryStrategy, ModuleDefinition, ProcessContext } from './types';

export class DefaultModuleDiscoveryStrategy implements IModuleDiscoveryStrategy {

    private _context: ProcessContext;

    constructor(context: ProcessContext) {
        this._context = context;
    }

    async discover(): Promise<ModuleDefinition[]> {
        const files = this.recursiveGetFiles(this._context.root, [".js", ".ts"]);
        const modules = files.filter(x => x.endsWith("Module.ts") || x.endsWith("Module.js"));

        const asModuleDefinition = modules.map(f => {

            const name = f.replace("Module.ts", "").replace("Module.js", "");
            const modulePath = f.replace(".ts", "").replace(".js", "");

            const absolutePath = path.join(this._context.root, modulePath);
            const instance = Activator.createInstance<IModule>(absolutePath);
            const route = instance.route;

            return { name, path: modulePath, route }
        });

        console.log("Routes", asModuleDefinition);

        return asModuleDefinition;
    }

    private recursiveGetFiles(dir: string, fileTypes: string | string[]) {
        var filesToReturn = [];

        const walkDir = (currentPath) => {
            var files = fs.readdirSync(currentPath);

            for (var i in files) {

                var curFile = path.join(currentPath, files[i]);

                if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
                    filesToReturn.push(curFile.replace(dir, ''));
                } else if (fs.statSync(curFile).isDirectory()) {
                    walkDir(curFile);
                }
            }
        };

        walkDir(dir);
        return filesToReturn;
    }
}
