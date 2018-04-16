import {SpecialCharacterHelper} from "../helpers/SpecialCharacterHelper";
import {ErrorHandler, ErrorHandlerInterface} from "../mixins/ErrorHandler";
import {ExportModel} from "../models/ExportModel";

@ErrorHandler()
export abstract class BaseConverter implements ErrorHandlerInterface {
    public static errorMessages = {
        TYPE_NOT_FOUND: "Type not found!",
    };

    public errorType: string;
    public addError: (errorMessage: string) => void;
    public hasErrors: () => boolean;
    public errors: string[];
    public exports: ExportModel[] = [];
    public enumExports: ExportModel[] = [];
    public interfaceExports: ExportModel[] = [];

    public joinExports(): string {
        let result = this.exports
            .reduce((joinedExport: string, nextExport: ExportModel) => {

                const exports: string[] = [];

                if (joinedExport.length > 0) {
                    exports.push(joinedExport);
                }

                exports.push(nextExport.content);

                return `${exports.join(`${SpecialCharacterHelper.NEW_LINE}${SpecialCharacterHelper.NEW_LINE}`)}`;
            }, "");
        result += `${SpecialCharacterHelper.NEW_LINE}`;

        return result;
    }

}
