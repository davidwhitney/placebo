import http from 'http';
import path from 'path';
import { Activator } from "../Activator";
import { EntryPoint, IModule, IRouteRequests, ProcessContext } from '../types';
import { isDeleteModule, isGetModule, isOptionsModule, isPostModule, isPutModule } from '../types.guards';

export class ExecutionPipeline {

    private _router: IRouteRequests;
    private _context: ProcessContext;

    constructor(router: IRouteRequests, context: ProcessContext) {
        this._router = router;
        this._context = context;
    }

    public async tryHandle(req: http.IncomingMessage, res: http.ServerResponse) {
        try {
            await this.handle(req, res);
        } catch (ex) {
            console.log(ex);
            // Real error handling hooks here.
        }
    }

    private async handle(req: http.IncomingMessage, res: http.ServerResponse) {
        console.log("Request", req.url, req.method);

        const handlingModule = await this._router.route(req);
        if (handlingModule == null) {
            return this.notFound(req, res);
        }

        const absolutePath = path.join(this._context.root, handlingModule.path);

        const instance = Activator.createInstance<IModule>(absolutePath);
        const entryPoint = this.selectEntrypoint(instance, req);

        const result = entryPoint(req, res);

        if (result) {
            // Do content type negotiation and write to res stream.
        }
    }

    private selectEntrypoint(instance: IModule, req: http.IncomingMessage): EntryPoint {
        const method = req.method.toLowerCase();

        if (method === "get" && isGetModule(instance)) {
            return instance.get;
        }

        if (method === "post" && isPostModule(instance)) {
            return instance.post;
        }
        if (method === "put" && isPutModule(instance)) {
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

    private notFound(req: http.IncomingMessage, res: http.ServerResponse) {
        res.statusCode = 404;
    }
}