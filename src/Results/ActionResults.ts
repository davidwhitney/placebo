import { JsonFormatter } from "../ContentNegotiation/JsonFormatter";
import { RequestContext } from "../types";

export abstract class ActionResult {

    public contentType: string;
    public statusCode?: number;
    public value: any;

    constructor(value: any) {
        this.value = value;
    }

    public executeResultAsync(ctx: RequestContext) {
        if (this.statusCode) {
            ctx.res.statusCode = this.statusCode;
        }
    }
}

class JsonResult extends ActionResult {
    constructor(value: any) {
        super(value);
    }

    public async executeResultAsync(ctx: RequestContext) {
        super.executeResultAsync(ctx);

        const formatter = new JsonFormatter();
        formatter.write(this.value, ctx.res);
    }
}

class RawResult {
    constructor() {

    }
}