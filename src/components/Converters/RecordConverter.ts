import { SpecialCharacterHelper } from "../../helpers/SpecialCharacterHelper";
import { TypeHelper } from "../../helpers/TypeHelper";
import {EnumType, Field, RecordType, Type} from "../../interfaces/AvroSchema";
import { ExportModel } from "../../models/ExportModel";
import { BaseConverter } from "./base/BaseConverter";
import { EnumConverter } from "./EnumConverter";
import { LogicalTypeConverter } from "./LogicalTypeConverter";
import { PrimitiveConverter } from "./PrimitiveConverter";

export class RecordConverter extends BaseConverter {

    protected interfaceRows: string[] = [];
    protected recordCache: {[recordName: string]: any} = {};

    public convert(data: any): ExportModel {
        data = this.getData(data) as RecordType;

        this.interfaceRows.push(...this.extractInterface(data));

        const exportModel = new ExportModel();
        exportModel.name = data.name;
        exportModel.content = this.interfaceRows.join(SpecialCharacterHelper.NEW_LINE);
        this.exports.push(exportModel);

        return exportModel;
    }

    protected extractInterface(data: RecordType): string[] {
        const rows: string[] = [];

        rows.push(`export interface ${data.name} {`);

        for (const field of data.fields) {
            const fieldType = `${this.getField(field.name, field.type)};`;
            rows.push(`${SpecialCharacterHelper.TAB}${fieldType}`);
        }

        rows.push(`}`);

        return rows;
    }

    protected convertType(type: Type): string {
        if (typeof type === "string") {
            const converter = new PrimitiveConverter();

            return converter.convert(type);
        }

        if (TypeHelper.isLogicalType(type)) {
            const converter = new LogicalTypeConverter(this.logicalTypesMap);

            return converter.convert(type);
        }

        if (TypeHelper.isEnumType(type)) {
            const converter = new EnumConverter();
            const exportModel = converter.convert(type);
            this.enumExports.push(exportModel);

            return exportModel.name;
        }

        if (type instanceof Array) {
            return type.map((t) => this.convertType(t)).join(" | ");
        }

        if (TypeHelper.isRecordType(type)) {
            if (! (type.name in this.recordCache) ) {
                this.recordCache[type.name.toString()] = type;
                this.interfaceRows.push(...this.extractInterface(type));
                this.interfaceRows.push("");
            }

            return type.name;
        }

        if (TypeHelper.isArrayType(type)) {
            return `${this.convertType(type.items)}[]`;
        }

        if (TypeHelper.isMapType(type)) {
            // Dictionary of types, string as key
            return `{ [index: string]: ${this.convertType(type.values)} }`;
        }

        this.addError(BaseConverter.errorMessages.TYPE_NOT_FOUND);
        return "any";
    }

    protected getField(name: string, type: Type): string {
        return `${name}${TypeHelper.isOptional(type) ? "?" : ""}: ${this.convertType(type)}`;
    }
}
