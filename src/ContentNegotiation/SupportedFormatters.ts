import http from 'http';
import { JsonFormatter } from './JsonFormatter';
import { IResponseFormatter } from "./IResponseFormatter";
import { HtmlFormatter } from './HtmlFormatter';

export class SupportedFormatters {

    private _supported: IResponseFormatter[];

    constructor(formatters: IResponseFormatter[]) {
        this._supported = [...formatters];
    }

    public match(headers: http.IncomingHttpHeaders): IResponseFormatter {
        const matching = this._supported.filter(f => f.matches(headers));
        return matching[0];
    }

    public matchOrDefault(headers: http.IncomingHttpHeaders): IResponseFormatter {
        return this.match(headers) ?? this.default;
    }

    public get default() {
        return this._supported[0];
    }

    public static get default() {
        return new SupportedFormatters([
            new JsonFormatter(),
            new HtmlFormatter()
        ]);
    }
}
