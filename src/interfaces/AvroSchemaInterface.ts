export interface AvroSchemaInterface {
    type: TypeNames;
}

export type Type = NameOrType | NameOrType[];
export type NameOrType = TypeNames | RecordType | ArrayType | NamedType;
export type TypeNames = "record" | "array" | "null" | "map" | string;

export interface Field {
    name: string;
    type: Type;
    default?: string | number | null | boolean;
}

export interface RecordType extends AvroSchemaInterface {
    type: "record";
    name: string;
    namespace: string;
    fields: Field[];
}

export interface ArrayType extends AvroSchemaInterface {
    type: "array";
    items: Type;
}

export interface MapType extends AvroSchemaInterface {
    type: "map";
    values: Type;
}

export interface EnumType extends AvroSchemaInterface {
    type: "enum";
    name: string;
    symbols: string[];
}

export interface NamedType extends AvroSchemaInterface {
    type: string;
}
