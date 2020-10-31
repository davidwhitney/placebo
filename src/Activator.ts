export class Activator {
    public static createInstance<T>(path: string) {
        const module = require(path);

        const exports = Object.getOwnPropertyNames(module);
        const exportName = exports[1];
        const ctor = module[exportName];

        return new ctor() as T;
    }
}
