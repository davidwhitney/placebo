import http from 'http';
import path from 'path';
import { IModule, IRouteRequests, ProcessContext } from './types';

export class ExecutionPipeline {

    private _router: IRouteRequests;
    private _context: ProcessContext;

    constructor(router: IRouteRequests, context: ProcessContext) {
        this._router = router;
        this._context = context;
    }

    public async handle(req: http.IncomingMessage, res: http.ServerResponse) {
        try {
            const handlingModule = await this._router.route(req);

            const absolutePath = path.join(this._context.root, handlingModule.path);
            const module = require(absolutePath);

            const exports = Object.getOwnPropertyNames(module);
            const exportName = exports[1];
            const ctor = module[exportName];

            const instance = new ctor() as IModule;

            const result = instance.execute(req, res);

            if (result) {
                // Do content type negotiation and write to res stream.
            }

        } catch (ex) {
            console.log(ex);
        }
    }
}
