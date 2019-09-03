import * as avro from "avsc";
import { Schema, Type } from "avsc";
import { Memoize } from "typescript-memoize";
import { AvroRecord } from "./AvroRecord";

export abstract class BaseAvroRecord implements AvroRecord {

    public static readonly subject: string = "";
    public static readonly schema = {};

    @Memoize((schema: any) => {
        return schema.namespace + schema.name;
    })
    public static getTypeForSchema(schema: any): Type {
        return avro.Type.forSchema(schema);
    }

    @Memoize((schema: any) => {
        return schema.namespace + schema.name;
    })
    public static createTypeResolver(baseType: Type, newType: Type): Type {
        return baseType.createResolver(newType) as Type;
    }

    public abstract schema(): any;

    public abstract subject(): string;

}
