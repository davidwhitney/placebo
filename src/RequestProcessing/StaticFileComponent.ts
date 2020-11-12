import http from 'http';
import fs from 'fs';
import path from 'path';
import { IPipelineComponent, RequestContext } from '../types';

export class StaticFileComponent implements IPipelineComponent {

    private _fsLocation: string;
    private _virtualPath: string;

    public constructor(fileSystemLocation: string, virtualPath: string) {
        this._fsLocation = fileSystemLocation;
        this._virtualPath = virtualPath;
    }

    public async handle(req: http.IncomingMessage, res: http.ServerResponse, ctx: RequestContext): Promise<boolean | null> {
        if (!req.url.startsWith(this._virtualPath)) {
            return true; // Wrong path.
        }

        const localPathWithoutVirtualPart = req.url.replace(this._virtualPath, "");
        const possiblePhysicalLocation = path.join(ctx.processContext.root, this._fsLocation, localPathWithoutVirtualPart);

        const exists = fs.existsSync(possiblePhysicalLocation);
        if (!exists) {
            return true;
        }

        const isDir = fs.lstatSync(possiblePhysicalLocation).isDirectory();
        if (isDir) {
            return true;
        }

        // Also write Content-Type headers.
        res.write(fs.readFileSync(possiblePhysicalLocation));
        return false; // Stop processing
    }
}
