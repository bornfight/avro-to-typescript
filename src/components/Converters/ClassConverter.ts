import { SpecialCharacterHelper } from "../../helpers/SpecialCharacterHelper";
import { TypeHelper } from "../../helpers/TypeHelper";
import { RecordType } from "../../interfaces/AvroSchema";
import { ExportModel } from "../../models/ExportModel";
import { RecordConverter } from "./RecordConverter";

export class ClassConverter extends RecordConverter {

    protected interfaceRows: string[] = [];
    protected interfaceSuffix = "Interface";
    protected TAB = SpecialCharacterHelper.TAB;

    protected classRows: string[] = [];
    protected importRows: string[] = [];

    public convert(data: any): any {
        data = this.getData(data) as RecordType;

        this.classRows.push(...this.extractClass(data));
        this.importRows.push(...this.extractImports(data));

        this.getExportModels(data);

        return;
    }

    protected getExportModels(data: RecordType): ExportModel {
        const importExportModel: ExportModel = new ExportModel();
        const classExportModel: ExportModel = new ExportModel();
        const interfaceExportModel: ExportModel = new ExportModel();

        importExportModel.name = "imports";
        importExportModel.content = this.importRows.join(SpecialCharacterHelper.NEW_LINE);

        classExportModel.name = data.name;
        classExportModel.content = this.classRows.join(SpecialCharacterHelper.NEW_LINE);

        interfaceExportModel.name = data.name + this.interfaceSuffix;
        interfaceExportModel.content = this.interfaceRows.join(SpecialCharacterHelper.NEW_LINE);

        this.exports = [
            importExportModel,
            interfaceExportModel,
            classExportModel,
        ];

        return classExportModel;
    }

    protected extractImports(data: RecordType): string[] {
        const rows: string[] = [];
        const dirsUp: number = data.namespace.split(".").length;

        rows.push(`// tslint:disable`);
        rows.push(`import { BaseAvroRecord } from "` + "../".repeat(dirsUp) + `BaseAvroRecord";`);

        for (const enumFile of this.enumExports) {
            const importLine = `import { ${enumFile.name} } from "./${enumFile.name}Enum";`;
            rows.push(importLine);
        }

        return rows;
    }

    protected extractClass(data: RecordType): string[] {
        const rows: string[] = [];
        const interfaceRows: string[] = [];
        const TAB = SpecialCharacterHelper.TAB;

        interfaceRows.push(`export interface ${data.name}${this.interfaceSuffix} {`);
        rows.push(`export class ${data.name} extends BaseAvroRecord implements ${data.name}${this.interfaceSuffix} {`);
        rows.push(``);

        for (const field of data.fields) {
            let fieldType;
            let classRow;

            // If the type was defined earlier, fetch the entire thing from the cache.
            const type = this.recordCache[field.type.toString()] || field.type;

            if (TypeHelper.hasDefault(field) || TypeHelper.isOptional(field.type)) {
                const defaultValue = TypeHelper.hasDefault(field) ? ` = ${TypeHelper.getDefault(field)}` : "";
                fieldType = `${this.getField(field.name, type)}`;
                classRow = `${TAB}public ${fieldType}${defaultValue};`;
            } else {
                const convertedType = this.convertType(type);
                fieldType = `${field.name}: ${convertedType}`;
                classRow = `${TAB}public ${field.name}!: ${convertedType};`;
            }

            interfaceRows.push(`${this.TAB}${fieldType};`);

            rows.push(classRow);
        }

        rows.push(``);
        rows.push(`${TAB}public static readonly subject: string = "${this.toKebabCase(data.name)}";`);
        rows.push(`${TAB}public static readonly schema: object = ${JSON.stringify(data, null, 4)}`);
        rows.push(``);
        rows.push(`${TAB}public schema(): object {`);
        rows.push(`${TAB}${TAB}return ${data.name}.schema;`);
        rows.push(`${TAB}}`);
        rows.push(``);
        rows.push(`${TAB}public subject(): string {`);
        rows.push(`${TAB}${TAB}return ${data.name}.subject;`);
        rows.push(`${TAB}}`);
        rows.push(`}`);

        interfaceRows.push("}");
        this.interfaceRows.push(...interfaceRows);

        return rows;
    }

    private toKebabCase(str: string): string {
        return str
            .split(/(?=[A-Z])/)
            .join("-")
            .toLowerCase();
    }

}
