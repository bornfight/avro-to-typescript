import { RegistryClientConfig } from "schema-registry";
import { KafkaAvroDeserializer } from "./KafkaAvroDeserializer";
import { KafkaAvroSerializer } from "./KafkaAvroSerializer";

export class KafkaAvroFactory {
    public avroRegistryConfiguration: RegistryClientConfig;

    constructor(avroRegistryConfiguration: RegistryClientConfig) {
        this.avroRegistryConfiguration = avroRegistryConfiguration;
    }

    public createSerializer(): KafkaAvroSerializer {
        return new KafkaAvroSerializer(this.avroRegistryConfiguration);
    }

    public createDeserializer(): KafkaAvroDeserializer {
        return new KafkaAvroDeserializer(this.avroRegistryConfiguration);
    }
}
