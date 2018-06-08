import {BaseConverter} from "../../core/BaseConverter";

export class PrimitiveConverter extends BaseConverter {

    public convertType(type: string): string {
        switch (type) {
            case "long":
            case "int":
            case "double":
            case "float":
                return "number";
            case "string":
                return "string";
            case "bytes":
                return "Buffer";
            case "null":
                return "null";
            case "boolean":
                return "boolean";
            default:
                return "any";
        }
    }
}
