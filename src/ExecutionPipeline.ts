import http from 'http';
import { IModule, IRouteRequests } from './types';

export class ExecutionPipeline {

    private _router: IRouteRequests;

    constructor(router: IRouteRequests) {
        this._router = router;
    }

    public async handle(req: http.IncomingMessage, res: http.ServerResponse) {
        try {
            const handlingModule = await this._router.route(req);
            const module = require(handlingModule.path);

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
