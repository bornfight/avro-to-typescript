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

    protected static internalDeserialize<T extends BaseAvroRecord>(buffer: Buffer, newSchema?: object) {
        const baseType = BaseAvroRecord.getTypeForSchema(this.schema);
        let resolver: object;
        let noCheck = false;

        if (newSchema !== undefined) {
            const newType = BaseAvroRecord.getTypeForSchema(newSchema);
            resolver = BaseAvroRecord.createTypeResolver(baseType, newType);
            noCheck = true;
        }
        // @ts-ignore
        return baseType.fromBuffer(buffer, resolver, noCheck);
    }

    public loadValuesFromType(type: Type) {
        this.loadObjectValues(this, type, this.transformation());
    }

    public abstract schema(): any;

    public abstract subject(): string;

    public serialize(): Buffer {
        const type = BaseAvroRecord.getTypeForSchema(this.schema());
        return type.toBuffer(this);
    }

    /// virtual
    protected transformation(): object {
        return {};
    }

    private loadObjectValues(result: BaseAvroRecord, object: Type, transformation: object = {}) {
        Object.keys(object).forEach((key) => {
            if (transformation.hasOwnProperty(key) && object[key] !== null) {
                if (Array.isArray(object[key])) {
                    result[key] = object[key].map(transformation[key]);
                } else {
                    result[key] = transformation[key](object[key]);
                }
            } else {
                result[key] = object[key];
            }
        });
    }
}
