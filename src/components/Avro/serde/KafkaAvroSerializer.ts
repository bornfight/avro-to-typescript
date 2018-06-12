import { AvroSchemaResponseInterface } from "schema-registry";
import { BaseAvroRecord } from "../BaseAvroRecord";
import { KafkaAvroMessage } from "../KafkaAvroMessage";
import { BaseKafkaAvroSerde } from "./BaseKafkaAvroSerde";

export class KafkaAvroSerializer extends BaseKafkaAvroSerde {

    public async serialize(obj: BaseAvroRecord): Promise<Buffer> {
        const schema: AvroSchemaResponseInterface =
            await this.schemaRegistryClient.registerSubjectVersion(obj.subject(), obj.schema());
        const schemaId: number = schema.id;
        const buffer: Buffer = obj.serialize();

        const kafkaAvroMessage: KafkaAvroMessage = new KafkaAvroMessage(schemaId, buffer);
        return this.toBuffer(kafkaAvroMessage);
    }
}
