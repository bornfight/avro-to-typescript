import {isObject} from "util";
import {
    ArrayType,
    EnumType,
    Field,
    LogicalType,
    MapType,
    NamedType,
    RecordType,
    Type,
} from "../interfaces/AvroSchema";

export class TypeHelper {

    public static isRecordType(schema: Type): schema is RecordType {
        if (typeof schema === "string" || schema instanceof Array) {
            return false;
        }
        return schema.type === "record";
    }

    public static isArrayType(schema: Type): schema is ArrayType {
        if (typeof schema === "string" || schema instanceof Array) {
            return false;
        }
        return schema.type === "array";
    }

    public static isMapType(schema: Type): schema is MapType {
        if (typeof schema === "string" || schema instanceof Array) {
            return false;
        }
        return schema.type === "map";
    }

    public static isEnumType(schema: Type): schema is EnumType {
        if (typeof schema === "string" || schema instanceof Array) {
            return false;
        }
        return schema.type === "enum";
    }

    public static isUnion(schema: Type): schema is NamedType[] {
        return schema instanceof Array;
    }

    public static isLogicalType(schema: Type): schema is LogicalType {
        if (typeof schema === "string" || schema instanceof Array) {
            return false;
        }
        return "logicalType" in schema;
    }

    public static isOptional(schema: Type): boolean {
        if (TypeHelper.isUnion(schema)) {
            const t1 = schema[0];

            if (typeof t1 === "string") {
                return t1 === "null";
            }
        }

        return false;
    }

    public static hasDefault(field: Field): boolean {
        if (field.default === undefined) {
            return false;
        }

        return true;
    }

    public static getDefault(field: Field): string | number | boolean | any[] | null {
        if (field.default === undefined) {
            return false;
        }

        if (field.default === "") {
            return `""`;
        }

        if (field.type === "string") {
            return `"${field.default}"`;
        }

        if (Array.isArray(field.default) && field.default.length === 0) {
            return `[]`;
        }

        if (isObject(field.default)) {
            return JSON.stringify(field.default);
        }

        return field.default;
    }
}
