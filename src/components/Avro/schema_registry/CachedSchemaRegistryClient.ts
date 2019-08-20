import { RegistryClient, RegistryClientConfig, RegistryRequest } from "schema-registry";
import { Memoize } from "typescript-memoize";
import { RecordType } from "../../..";
import { SchemaRegistry } from "./SchemaRegistry";

export class CachedSchemaRegistryClient implements SchemaRegistry {
    private _defaultLogger: object = {
        info: (): void => {
            return;
        },
        log: () => {
            return;
        },
        error: () => {
            return;
        },
    };
    private client: RegistryClient;

    constructor(config: RegistryClientConfig) {
        const clientConfig = {
            type: "avro",
            host: config.host,
            port: config.port,
            logger: (config.logger !== undefined) ? config.logger : this._defaultLogger,
            protocol: config.protocol,
        };
        this.client = new RegistryClient(clientConfig);
    }

    @Memoize()
    public async getSchemaById(id: number): RegistryRequest {
        return await this.client.getSchemaById(id);
    }

    @Memoize()
    public async registerSubjectVersion(subject: string, schema: RecordType): RegistryRequest {
        return await this.client.registerSubjectVersion(subject, schema);
    }
}
