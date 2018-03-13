import {BaseConverter} from "../../core/BaseConverter";
import {SpecialCharacterHelper} from "../../helpers/SpecialCharacterHelper";
import {EnumType} from "../../interfaces/AvroSchemaInterface";
import {ExportModel} from "../../models/ExportModel";

export class EnumConverter extends BaseConverter {

    public convertType(enumType: EnumType): ExportModel {
        const rows: string[] = [];
        const exportModel: ExportModel = new ExportModel();

        rows.push(`export enum ${enumType.name} {`);
        enumType.symbols.forEach( (symbol: string) => {
            rows.push(`${SpecialCharacterHelper.TAB}${symbol},`);
        });
        rows.push(`}`);

        exportModel.content = rows.join(SpecialCharacterHelper.NEW_LINE);
        exportModel.name = enumType.name;
        this.exports.push(exportModel);

        return exportModel;
    }

}
