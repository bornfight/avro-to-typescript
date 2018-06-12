import { DataCompression } from "./DataCompression";

export class NullCompression implements DataCompression<Buffer, Buffer> {

    public compress(buffer: Buffer): Buffer {
        return buffer;
    }

    public decompress(buffer: Buffer): Buffer {
        return buffer;
    }
}
