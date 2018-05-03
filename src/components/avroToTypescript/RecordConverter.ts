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
        const importRows: string[] = [];
        const importExportModel: ExportModel = new ExportModel();
        const classExportModel: ExportModel = new ExportModel();
        const interfaceExportModel: ExportModel = new ExportModel();
        const interfacePostFix = "Interface";
        const TAB = SpecialCharacterHelper.TAB;

        importRows.push(`// tslint:disable`);
        importRows.push(`import {BaseAvroRecord} from "../../BaseAvroRecord";`);

        classRows.push(`export class ${recordType.name} extends BaseAvroRecord implements ${recordType.name}Interface {`);
        interfaceRows.push(`export interface ${recordType.name}${interfacePostFix} {`);

        classRows.push(``);

        classRows.push(`${TAB}public static readonly subject: string = "${recordType.name}";`);
        classRows.push(`${TAB}public static readonly schema: object = ${JSON.stringify(recordType, null, 4)}`);

        classRows.push(``);

        classRows.push(`${TAB}public static deserialize(buffer: Buffer, newSchema?: object): ${recordType.name} {`);
        classRows.push(`${TAB}${TAB}const result = new ${recordType.name}();`);
        classRows.push(`${TAB}${TAB}const rawResult = this.internalDeserialize(buffer, newSchema);`);
        classRows.push(`${TAB}${TAB}result.loadValuesFromType(rawResult);`);
        classRows.push(``);
        classRows.push(`${TAB}${TAB}return result;`);
        classRows.push(`${TAB}}`);

        classRows.push(``);

        recordType.fields.forEach((field: Field) => {
            const fieldType = `${this.getField(field)}`;
            const interfaceRow = `${TAB}${fieldType};`;

            const defaultValue = TypeHelper.hasDefault(field) ? ` = ${TypeHelper.getDefault(field)}` : "";
            const classRow = `${TAB}public ${fieldType}${defaultValue};`;

            interfaceRows.push(interfaceRow);
            classRows.push(classRow);
        });

        classRows.push(``);

        classRows.push(`${TAB}public schema(): object {`);
        classRows.push(`${TAB}${TAB}return ${recordType.name}.schema;`);
        classRows.push(`${TAB}}`);

        classRows.push(``);

        classRows.push(`${TAB}public subject(): string {`);
        classRows.push(`${TAB}${TAB}return ${recordType.name}.subject;`);
        classRows.push(`${TAB}}`);

        classRows.push(`}`);
        interfaceRows.push(`}`);

        for (const enumFile of this.enumExports) {
            importRows.push(`import {${enumFile.name}} from "./${enumFile.name}Enum.ts";`);
        }

        importExportModel.name = "imports";
        importExportModel.content = importRows.join(SpecialCharacterHelper.NEW_LINE);

        classExportModel.name = recordType.name;
        classExportModel.content = classRows.join(SpecialCharacterHelper.NEW_LINE);

        interfaceExportModel.name = recordType.name + interfacePostFix;
        interfaceExportModel.content = interfaceRows.join(SpecialCharacterHelper.NEW_LINE);

        this.exports.push(interfaceExportModel);
        this.exports.push(classExportModel);

        this.exports = [importExportModel, ...this.exports];

        return classExportModel;
    }

    public convertRecord( recordType: RecordType ): ExportModel {
        const rows: string[] = [];
        const exportModel: ExportModel = new ExportModel();

        rows.push(`export interface ${recordType.name} {`);
        recordType.fields.forEach((field: Field) => {
            const fieldType = `${this.getField(field)};`;
            rows.push(`${SpecialCharacterHelper.TAB}${fieldType}`);
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
            this.enumExports.push(exportModel);

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

    public getField(field: Field): string {
        return `${field.name}${TypeHelper.isOptional(field.type) ? "?" : ""}: ${this.convertType(field.type)}`;
    }

    public getFieldType(field: Field): string {
        return `${this.convertType(field.type)}`;
    }
}
