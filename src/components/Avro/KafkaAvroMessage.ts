export class KafkaAvroMessage {

    public static MAGIC_BYTE = 0;

    public static fromBuffer(buffer: Buffer) {
        const schemaId = buffer.readInt32BE(1);
        const avroBuffer = buffer.slice(5);
        return new KafkaAvroMessage(schemaId, avroBuffer);
    }

    private readonly _magicByte: number;
    private readonly _schemaId: number;
    private readonly _avroBuffer: Buffer;

    public constructor(schemaId: number, avroBuffer: Buffer) {
        this._magicByte = KafkaAvroMessage.MAGIC_BYTE;
        this._schemaId = schemaId;
        this._avroBuffer = avroBuffer;
    }

    public get magicByte(): number {
        return this._magicByte;
    }

    public get schemaId(): number {
        return this._schemaId;
    }

    public get avroBuffer(): Buffer {
        return this._avroBuffer;
    }

    public toBuffer(): Buffer {
        const preBuffer = new Buffer(5);
        preBuffer[0] = this.magicByte;
        preBuffer.writeInt32BE(this.schemaId, 1);

        return Buffer.concat([
            preBuffer,
            this.avroBuffer,
        ]);
    }
}
