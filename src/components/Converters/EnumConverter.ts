import { SpecialCharacterHelper } from "../../helpers/SpecialCharacterHelper";
import { EnumType } from "../../interfaces/AvroSchema";
import { ExportModel } from "../../models/ExportModel";
import { BaseConverter } from "./base/BaseConverter";

export class EnumConverter extends BaseConverter {

    protected rows: string[] = [];

    public convert(data: any): ExportModel {
        data = this.getData(data) as EnumType;

        this.rows.push(...this.extractEnum(data));

        const exportModel = new ExportModel();
        exportModel.name = data.name;
        exportModel.content = this.rows.join(SpecialCharacterHelper.NEW_LINE);
        this.exports.push(exportModel);

        return exportModel;
    }

    protected extractEnum(data: EnumType): string[] {
        const rows: string[] = [];

        rows.push(`export enum ${data.name} {`);
        for (const symbol of data.symbols) {
            rows.push(`${SpecialCharacterHelper.TAB}${symbol} = '${symbol}',`);
        }
        rows.push(`}`);

        return rows;
    }
}
