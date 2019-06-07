import * as fs from "fs";
import { SpecialCharacterHelper } from "../../../helpers/SpecialCharacterHelper";
import { AvroSchema } from "../../../interfaces/AvroSchema";
import { CompilerOptions } from "../../../interfaces/CompilerOptions";
import { ExportModel } from "../../../models/ExportModel";

export abstract class BaseConverter {
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

    constructor(protected compilerOptions?: CompilerOptions) {}

    public abstract convert(data: any): any;

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

    /**
     * This takes care of converting data to format I can use. Since you
     * can pass either file path, a stringified JSON or actual object.
     *
     * @param data - can be file path, JSON string or parsed json
     * @returns {any}
     */
    public getData(data: any): AvroSchema {
        if (typeof data === "string") {
            try {
                return JSON.parse(data);
            } catch {
                return JSON.parse(fs.readFileSync(data).toString());
            }
        }

        return data;
    }

}
