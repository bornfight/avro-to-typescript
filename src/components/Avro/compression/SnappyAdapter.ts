import { DataCompression } from "./DataCompression";

export class SnappyAdapter implements DataCompression<Buffer, Buffer> {

    private static snappy = require("snappy"); // sadly, no types for this lib

    public compress(buffer: Buffer): Buffer {
        return SnappyAdapter.snappy.compressSync(buffer);
    }

    public decompress(buffer: Buffer): Buffer {
        return SnappyAdapter.snappy.uncompressSync(buffer);
    }
}
