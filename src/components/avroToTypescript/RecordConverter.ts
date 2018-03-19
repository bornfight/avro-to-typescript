import {BaseConverter} from "../../core/BaseConverter";
import {SpecialCharacterHelper} from "../../helpers/SpecialCharacterHelper";
import {TypeHelper} from "../../helpers/TypeHelper";
import {AvroSchemaInterface, Field, RecordType, Type} from "../../interfaces/AvroSchemaInterface";
import {ExportModel} from "../../models/ExportModel";
import {EnumConverter} from "./EnumConverter";
import {PrimitiveConverter} from "./PrimitiveConverter";

export class RecordConverter extends BaseConverter {

    public convertRecordToClass( recordType: RecordType ): ExportModel {
        const classRows: string[] = [];
        const interfaceRows: string[] = [];
        const classExportModel: ExportModel = new ExportModel();
        const interfaceExportModel: ExportModel = new ExportModel();
        const interfacePostFix = "Interface";

        classRows.push(`export class ${recordType.name} implements ${recordType.name}Interface {`);
        interfaceRows.push(`export interface ${recordType.name}${interfacePostFix} {`);

        recordType.fields.forEach((field: Field) => {
            const fieldType = `${this.getFieldType(field)}`;
            const interfaceRow = `${SpecialCharacterHelper.TAB}${fieldType}`;
            const classRow = `${SpecialCharacterHelper.TAB}public ${fieldType}`;

            interfaceRows.push(interfaceRow);
            classRows.push(classRow);
        });

        classRows.push(`}`);
        interfaceRows.push(`}`);

        classExportModel.name = recordType.name;
        classExportModel.content = classRows.join(SpecialCharacterHelper.NEW_LINE);

        interfaceExportModel.name = recordType.name + interfacePostFix;
        interfaceExportModel.content = interfaceRows.join(SpecialCharacterHelper.NEW_LINE);

        this.exports.push(interfaceExportModel);
        this.exports.push(classExportModel);

        return classExportModel;
    }

    public convertRecord( recordType: RecordType ): ExportModel {
        const rows: string[] = [];
        const exportModel: ExportModel = new ExportModel();

        rows.push(`export interface ${recordType.name} {`);
        recordType.fields.forEach((field: Field) => {
            rows.push(`${SpecialCharacterHelper.TAB}${this.getFieldType(field)}`);
        });
        rows.push(`}`);

        exportModel.name = recordType.name;
        exportModel.content = rows.join(SpecialCharacterHelper.NEW_LINE);
        this.exports.push(exportModel);

        return exportModel;
    }

    public convertType( type: Type ): string {
        if (typeof type === "string") {
            const primitiveConverter = new PrimitiveConverter();

            return primitiveConverter.convertType(type);
        }

        if (TypeHelper.isEnumType(type)) {
            const enumConverter = new EnumConverter();
            const exportModel = enumConverter.convertType(type);
            this.exports.push(exportModel);

            return exportModel.name;
        }

        if (type instanceof Array) {
            return type.map((t) => this.convertType(t)).join(" | ");
        }

        if (TypeHelper.isRecordType(type)) {
            this.convertRecord(type);
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

    public getFieldType(field: Field): string {

        return `${field.name}${TypeHelper.isOptional(field.type) ? "?" : ""}: ${this.convertType(field.type)};`;
    }
}
