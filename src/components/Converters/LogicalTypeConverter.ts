import { LogicalType } from "../../interfaces/AvroSchema";
import { BaseConverter } from "./base/BaseConverter";
import { PrimitiveConverter } from "./PrimitiveConverter";

export class LogicalTypeConverter extends BaseConverter {
    public convert(data: any): string {
        data = this.getData(data) as LogicalType;
        const primitiveConverter = new PrimitiveConverter();

        return this.logicalTypesMap[data.logicalType] || primitiveConverter.convert(data.type);
    }
}
