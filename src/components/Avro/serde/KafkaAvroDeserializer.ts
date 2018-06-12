import { AvroSchemaResponseInterface } from "schema-registry";
import { BaseAvroRecord } from "../BaseAvroRecord";
import { KafkaAvroMessage } from "../KafkaAvroMessage";
import { BaseKafkaAvroSerde } from "./BaseKafkaAvroSerde";

export class KafkaAvroDeserializer extends BaseKafkaAvroSerde {

    private knownSchemas: Map<number, object> = new Map<number, object>();

    public async deserialize<T extends BaseAvroRecord>(buffer: Buffer, deserType: { new(): T; }): Promise<T> {
        const kafkaAvroMessage: KafkaAvroMessage = this.toKafkaAvroMessage(buffer);
        const schemaId = kafkaAvroMessage.schemaId;

        let newSchema = this.knownSchemas.get(schemaId);

        if (newSchema === undefined) {
            const newSchemaRaw: AvroSchemaResponseInterface = await this.schemaRegistryClient.getSchemaById(schemaId);
            newSchema = JSON.parse(newSchemaRaw.schema) as object;
            this.knownSchemas.set(schemaId, newSchema);
        }

        const avroBuffer = kafkaAvroMessage.avroBuffer;
        // @ts-ignore
        return deserType.deserialize(avroBuffer, newSchema) as T;
    }
}
