import * as zlib from "zlib";
import { ZlibOptions } from "zlib";
import { DataCompression } from "./DataCompression";

export class ZlibAdapter implements DataCompression<Buffer, Buffer> {

    private _options?: ZlibOptions;
    private _defaultOptions: ZlibOptions = {
        level: 5,
    };

    public constructor(options?: ZlibOptions) {
        this._options = (options) ? options : this._defaultOptions;
    }

    public compress(buffer: Buffer): Buffer {
        return zlib.gzipSync(buffer, this._options);
    }

    public decompress(buffer: Buffer): Buffer {
        return zlib.unzipSync(buffer, this._options);
    }
}
