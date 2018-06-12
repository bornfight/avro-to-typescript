import { RegistryRequest } from "schema-registry";
import { RecordType } from "../../..";

export interface SchemaRegistry {
    getSchemaById(id: number): RegistryRequest;

    registerSubjectVersion(subject: string, schema: RecordType): RegistryRequest;
}
