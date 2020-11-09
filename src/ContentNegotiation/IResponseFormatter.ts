import http from 'http';

export interface IResponseFormatter {
    matches(headers: http.IncomingHttpHeaders): boolean;
    write(object: any, res: http.ServerResponse): void;
}
