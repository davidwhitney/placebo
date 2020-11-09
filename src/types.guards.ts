import { IDeleteModule, IGetModule, IModule, IOptionsModule, IPostModule, IPutModule } from "./types";

export function isGetModule(module: IModule | IGetModule): module is IModule {
    return (module as IGetModule).get !== undefined;
}

export function isPostModule(module: IModule | IPostModule): module is IModule {
    return (module as IPostModule).post !== undefined;
}

export function isPutModule(module: IModule | IPutModule): module is IModule {
    return (module as IPutModule).put !== undefined;
}

export function isDeleteModule(module: IModule | IDeleteModule): module is IModule {
    return (module as IDeleteModule).delete !== undefined;
}

export function isOptionsModule(module: IModule | IOptionsModule): module is IModule {
    return (module as IOptionsModule).options !== undefined;
}