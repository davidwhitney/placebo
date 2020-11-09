import http from 'http';

export class RequestDecorator {
    public readonly req: http.IncomingMessage;

    constructor(req: http.IncomingMessage) {
        this.req = req;
    }

    public get isForRoot() {
        return this.req.url === "/";
    }
}
