import http from 'http';
import path from 'path';
import { Activator } from "../Activator";
import { SupportedFormatters } from "../ContentNegotiation/SupportedFormatters";
import { IModule, IRouteRequests, ProcessContext } from '../types';
import { selectEntrypoint } from './selectModuleEntrypoint';

export class ExecutionPipeline {

    private _router: IRouteRequests;
    private _context: ProcessContext;
    private _formatters: SupportedFormatters;

    constructor(router: IRouteRequests, context: ProcessContext, formatters: SupportedFormatters) {
        this._router = router;
        this._context = context;
        this._formatters = formatters;
    }

    public async tryHandle(req: http.IncomingMessage, res: http.ServerResponse) {
        try {
            await this.handle(req, res);
        } catch (ex) {
            console.log(ex); // Real error handling hooks here.
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
        const entryPoint = selectEntrypoint(instance, req);

        const result = await entryPoint(req, res);

        if (result) {
            const formatter = this._formatters.matchOrDefault(req.headers);
            formatter.write(result, res);
        }
    }

    private notFound(req: http.IncomingMessage, res: http.ServerResponse) {
        res.statusCode = 404;
    }
}