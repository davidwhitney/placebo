import http from 'http';
import path from 'path';
import { Activator } from "../Activator";
import { IModule, IPipelineComponent, RequestContext } from '../types';
import { isActionResult } from '../types.guards';
import { selectEntrypoint } from './selectModuleEntrypoint';

export class ModuleExecutionComponent implements IPipelineComponent {

    public async handle(req: http.IncomingMessage, res: http.ServerResponse, ctx: RequestContext): Promise<boolean | null> {

        const handlingModule = await ctx.router.route(req);

        if (handlingModule == null) {
            console.log("Route not matched", req.url);

            this.notFound(req, res);
            return false;
        }

        const absolutePath = path.join(ctx.processContext.root, handlingModule.path);

        const instance = Activator.createInstance<IModule>(absolutePath);
        const entryPoint = selectEntrypoint(instance, req);

        const result = await entryPoint(req, res);

        if (isActionResult(result)) {
            result.executeResultAsync(ctx);
            return true;
        }

        if (result) {
            const formatter = ctx.formatters.matchOrDefault(req.headers);
            formatter.write(result, res);
            return true;
        }

        return true;
    }

    private notFound(req: http.IncomingMessage, res: http.ServerResponse) {
        res.statusCode = 404;
    }
}
