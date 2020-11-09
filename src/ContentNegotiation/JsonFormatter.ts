import http from 'http';
import { IResponseFormatter } from "./IResponseFormatter";

export class JsonFormatter implements IResponseFormatter {

    matches(headers: http.IncomingHttpHeaders): boolean {
        const accept = headers["accept"] ?? [];
        return accept.includes("application/json")
            || accept.includes("json")
            || accept.includes("text/json");
    }

    write(object: any, res: http.ServerResponse): void {
        res.writeHead(200, "OK", {
            "Content-Type": "application/json",
            "Placebo-Formatter": "JsonFormatter"
        });
        res.write(JSON.stringify(object));
    }
}


