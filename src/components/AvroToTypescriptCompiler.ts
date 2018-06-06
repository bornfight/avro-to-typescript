import * as fs from "fs";
import * as path from "path";
import {BaseCompiler} from "../core/BaseCompiler";
import {DirHelper} from "../helpers/DirHelper";
import {TypeHelper} from "../helpers/TypeHelper";
import {AvroSchemaInterface, RecordType} from "../interfaces/AvroSchemaInterface";
import { CompilerOutputInterface } from "../interfaces/CompilerOutputInterface";
import {ExportModel} from "../models/ExportModel";
import {RecordConverter} from "./avroToTypescript/RecordConverter";

export class AvroToTypescriptCompiler extends BaseCompiler {
    public tsSchemaContent: string;
    public exports: ExportModel[];

    public async compileFolder(): Promise<void> {
        try {
            fs.readdir(this.avroSchemaPath, async (err, files) => {
                for (const file of files) {
                    await this.compileFile(file);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    public async compileFile(file: any) {
        const data = fs.readFileSync(this.avroSchemaPath + "/" + file).toString();

        await this.compile(JSON.parse(data));
    }

    /**
     * @param data - expects data to be JSON parsed
     * @returns {Promise<CompilerOutputInterface>}
     */
    public async compile(data: any): Promise<CompilerOutputInterface> {
        const recordConverter = new RecordConverter();
        const recordType: RecordType = data;

        const namespace = recordType.namespace.replace(".", "/");
        const outputDir = `${this.tsSchemaPath}/${namespace}`;

        if (TypeHelper.isRecordType(recordType)) {
            recordConverter.convertRecordToClass(recordType);
        } else {
            recordConverter.convertType(recordType);
        }

        const result = recordConverter.joinExports();

        DirHelper.mkdirIfNotExist(outputDir);

        for (const enumFile of recordConverter.enumExports) {
            const basePath = `${outputDir}/${enumFile.name}Enum.ts`;
            const fullPath = path.resolve(basePath);

            fs.writeFileSync(fullPath, enumFile.content);
        }

        fs.writeFileSync(path.resolve(`${outputDir}/${recordType.name}.ts`), result);

        console.log(`Wrote ${recordType.name}.ts in ${outputDir}`);

        return {
            class: recordType.name,
            dir: outputDir,
        };
    }
}
