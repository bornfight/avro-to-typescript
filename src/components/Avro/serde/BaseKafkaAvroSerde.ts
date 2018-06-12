import { RegistryClientConfig } from "schema-registry";
import { DataCompression } from "../compression/DataCompression";
import { NullCompression } from "../compression/NullCompression";
import { ZlibAdapter } from "../compression/ZlibAdapter";
import { KafkaAvroMessage } from "../KafkaAvroMessage";
import { CachedSchemaRegistryClient } from "../schema_registry/CachedSchemaRegistryClient";
import { SchemaRegistry } from "../schema_registry/SchemaRegistry";

export class BaseKafkaAvroSerde {
    public schemaRegistryClient: SchemaRegistry;

    private _dataCompression: DataCompression<Buffer, Buffer> = new ZlibAdapter();

    constructor(registryClientConfig: RegistryClientConfig) {
        this.schemaRegistryClient = new CachedSchemaRegistryClient(registryClientConfig);
    }

    public get dataCompression() {
        return this._dataCompression;
    }

    public set dataCompression(value: DataCompression<Buffer, Buffer>) {
        this._dataCompression = value;
    }

    public disableCompression() {
        this._dataCompression = new NullCompression();
    }

    public toKafkaAvroMessage(buffer: Buffer): KafkaAvroMessage {
        return KafkaAvroMessage.fromBuffer(this.dataCompression.decompress(buffer));
    }

    public toBuffer(kafkaAvroMessage: KafkaAvroMessage): Buffer {
        return this.dataCompression.compress(kafkaAvroMessage.toBuffer());
    }
}
