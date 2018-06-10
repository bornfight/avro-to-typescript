export interface AvroSchema {
    type: TypeNames;
}

export type Type = NameOrType | NameOrType[];
export type NameOrType = TypeNames | RecordType | ArrayType | NamedType;
export type TypeNames = "record" | "array" | "null" | "map" | string;

export interface Field {
    name: string;
    type: Type;
    default?: string | number | null | boolean | any[];
}

export interface RecordType extends AvroSchema {
    type: "record";
    name: string;
    namespace: string;
    fields: Field[];
}

export interface ArrayType extends AvroSchema {
    type: "array";
    items: Type;
}

export interface MapType extends AvroSchema {
    type: "map";
    values: Type;
}

export interface EnumType extends AvroSchema {
    type: "enum";
    name: string;
    symbols: string[];
}

export interface NamedType extends AvroSchema {
    type: string;
}
