import http from 'http';
import { IModule } from '../types';

export class FourZeroFourModule implements IModule {
    public route = "/";

    async execute(req: http.IncomingMessage, res?: http.ServerResponse): Promise<any> {
        // Do 404 handling here.
    }

}
