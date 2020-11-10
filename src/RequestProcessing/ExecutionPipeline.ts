import http from 'http';
import { IPipelineComponent, RequestContext } from '../types';

export class ExecutionPipeline {

    public components: IPipelineComponent[];

    constructor(steps: IPipelineComponent[]) {
        this.components = [...steps];
    }

    public async tryExecute(req: http.IncomingMessage, res: http.ServerResponse, ctx: RequestContext) {
        for (let component of this.components) {

            try {
                const result = await component.handle(req, res, ctx);

                if (!result) {
                    break;
                }

            } catch (ex) {
                console.log(ex); // Real error handling hooks here.
            }
        }
    }
}
