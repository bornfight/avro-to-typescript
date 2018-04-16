import * as fs from "fs";
import * as path from "path";
import {BaseCompiler} from "../core/BaseCompiler";
import {DirHelper} from "../helpers/DirHelper";
import {TypeHelper} from "../helpers/TypeHelper";
import {AvroSchemaInterface, RecordType} from "../interfaces/AvroSchemaInterface";
import {ExportModel} from "../models/ExportModel";
import {RecordConverter} from "./avroToTypescript/RecordConverter";

export class AvroToTypescriptCompiler extends BaseCompiler {
    public tsSchemaContent: string;
    public exports: ExportModel[];

    public async compile(): Promise<void> {

        if (this.isCompileReady() === false) {
            this.addError(AvroToTypescriptCompiler.errorMessage.notCompileReady);
            throw new Error(AvroToTypescriptCompiler.errorMessage.notCompileReady);
        }
        try {
            fs.readdir(this.avroSchemaPath, async (err, files) => {
                for (const file of files) {
                    try {
                        await this.compileFile(file);
                    } catch (err) {
                        console.log(err);
                    }
                }
            });
        } catch (err) {
            console.log(err);
        }

        return;
    }

    protected async compileFile(file: string) {
        const recordConverter = new RecordConverter();
        const recordType: RecordType =
            JSON.parse(fs.readFileSync(this.avroSchemaPath + "/" + file).toString());

        const namespace = recordType.namespace.replace(".", "/");
        const outputDir = this.tsSchemaPath + namespace;

        if (TypeHelper.isRecordType(recordType)) {
            recordConverter.convertRecordToClass(recordType);
        } else {
            recordConverter.convertType(recordType);
        }

        const result = recordConverter.joinExports();

        DirHelper.mkdirIfNotExist(outputDir);

        for (const enumFile of recordConverter.enumExports) {
            try {
                await fs.writeFileSync(path.resolve(`${outputDir}/${enumFile.name}Enum.ts`), enumFile.content);
            } catch (err) {
                console.log(err);
            }
        }

        fs.writeFileSync(path.resolve(`${outputDir}/${recordType.name}.ts`), result);
        console.log(`Wrote ${recordType.name}.ts in ${outputDir}`);
    }
}
