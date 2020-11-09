import http from 'http';
import { EntryPoint, IModule } from "../types";
import { isDeleteModule, isGetModule, isOptionsModule, isPostModule } from '../types.guards';

export function selectEntrypoint(instance: IModule, req: http.IncomingMessage): EntryPoint {
    const method = req.method.toLowerCase();

    if (method === "get" && isGetModule(instance)) {
        return instance.get;
    }

    if (method === "post" && isPostModule(instance)) {
        return instance.post;
    }

    if (method === "put" && isPostModule(instance)) {
        return instance.put;
    }

    if (method === "options" && isOptionsModule(instance)) {
        return instance.options;
    }

    if (method === "delete" && isDeleteModule(instance)) {
        return instance.delete;
    }

    return instance.execute;
}