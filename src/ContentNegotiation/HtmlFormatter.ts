import http from 'http';
import { IResponseFormatter } from "./IResponseFormatter";


export class HtmlFormatter implements IResponseFormatter {

    matches(headers: http.IncomingHttpHeaders): boolean {
        const accept = headers["accept"] ?? [];
        return accept.includes("text/html");
    }

    write(object: any, res: http.ServerResponse): void {
        res.writeHead(200, "OK", {
            "Content-Type": "text/html",
            "Placebo-Formatter": "HtmlFormatter"
        });

        // Put a templating engine here. Mustache?

        res.write("<html><head><title>Temp</title></head><body>");
        res.write("<div>");
        res.write(JSON.stringify(object));
        res.write("</div>");
        res.write("<body></html>");
    }
}
