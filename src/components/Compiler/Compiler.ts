import * as fs from "fs";
import * as path from "path";
import { DirHelper } from "../../helpers/DirHelper";
import { TypeHelper } from "../../helpers/TypeHelper";
import { CompilerOutput } from "../../interfaces/CompilerOutput";
import { ExportModel } from "../../models/ExportModel";
import { ClassConverter } from "../Converters/ClassConverter";
import { BaseCompiler } from "./base/BaseCompiler";

export class Compiler extends BaseCompiler {
    public exports: ExportModel[];

    public constructor(outputDir: string, public logicalTypes?: { [key: string]: string }) {
        super();

        this.classPath = path.resolve(outputDir);
    }

    public async compileFolder(schemaPath: string): Promise<void> {
        try {
            fs.readdir(schemaPath, async (err, files) => {
                for (const file of files) {
                    const fullPath = schemaPath + path.sep + file;

                    if (fs.statSync(fullPath).isDirectory()) {
                        await this.compileFolder(fullPath);
                        continue;
                    }

                    const data = fs.readFileSync(fullPath).toString();

                    await this.compile(data);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    public async compile(data: any): Promise<CompilerOutput> {
        const classConverter = new ClassConverter(this.logicalTypes);
        data = classConverter.getData(data);

        const namespace = data.namespace.replace(/\./g, path.sep);
        const outputDir = `${this.classPath}${path.sep}${namespace}`;

        if (TypeHelper.isRecordType(data)) {
            classConverter.convert(data);
        }

        const result = classConverter.joinExports();

        DirHelper.mkdirIfNotExist(outputDir);
        this.saveBaseAvroRecord();
        this.saveEnums(classConverter.enumExports, outputDir);
        this.saveClass(outputDir, data, result);
        console.log(`Wrote ${data.name}.ts in ${outputDir}`);

        return {
            class: data.name,
            dir: outputDir,
        };
    }

    protected saveClass(outputDir: string, data: any, result: string) {
        const classFile = `${outputDir}${path.sep}${data.name}.ts`;
        fs.writeFileSync(classFile, result);
    }

    protected saveEnums(enums: ExportModel[], outputDir: string) {
        for (const enumFile of enums) {
            const savePath = `${outputDir}${path.sep}${enumFile.name}Enum.ts`;

            fs.writeFileSync(savePath, enumFile.content);
        }
    }

    protected saveBaseAvroRecord() {
        const avroRecordPath = `${this.classPath}${path.sep}BaseAvroRecord.ts`;

        if (!fs.existsSync(avroRecordPath)) {
            fs.writeFileSync(
                avroRecordPath,
                "export { BaseAvroRecord } from \"@chasdevs/avro-to-typescript\";\n",
            );
        }
    }
}
