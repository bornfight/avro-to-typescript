import { LogicalType } from "../../interfaces/AvroSchema";
import { BaseConverter } from "./base/BaseConverter";
import { PrimitiveConverter } from "./PrimitiveConverter";

export class LogicalTypeConverter extends BaseConverter {
    public convert(data: any): string {
        data = this.getData(data) as LogicalType;
        const primitiveConverter = new PrimitiveConverter();

        if (this.compilerOptions === undefined || this.compilerOptions.logicalTypes === undefined) {
            return primitiveConverter.convert(data.type);
        }

        return this.compilerOptions.logicalTypes[data.logicalType];
    }
}
