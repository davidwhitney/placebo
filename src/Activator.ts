export class Activator {

    public static tryCreateInstance<T>(path: string) {
        try {
            return this.createInstance<T>(path);
        } catch {
            return null;
        }
    }

    public static createInstance<T>(path: string) {
        const module = require(path);

        const exports = Object.getOwnPropertyNames(module);
        const exportName = exports[1];
        const ctor = module[exportName];

        return new ctor() as T;
    }
}
