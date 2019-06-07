import * as fs from "fs";
import * as path from "path";
import { DirHelper } from "../../helpers/DirHelper";
import { TypeHelper } from "../../helpers/TypeHelper";
import { CompilerOptions } from "../../interfaces/CompilerOptions";
import { CompilerOutput } from "../../interfaces/CompilerOutput";
import { ExportModel } from "../../models/ExportModel";
import { ClassConverter } from "../Converters/ClassConverter";
import { BaseCompiler } from "./base/BaseCompiler";

export class Compiler extends BaseCompiler {
    public exports: ExportModel[];

    private readonly compilerOptions?: CompilerOptions;

    public constructor(outputDir: string, compilerOptions?: CompilerOptions) {
        super();

        this.classPath = path.resolve(outputDir);
        this.compilerOptions = compilerOptions;
    }

    public async compileFolder(schemaPath: string): Promise<void> {
        try {
            const files = fs.readdirSync(schemaPath).map((file) => schemaPath + path.sep + file);
            files.forEach(this.processFile);

        } catch (err) {
            console.log(err);
        }
    }

    public async compile(data: any): Promise<CompilerOutput> {
        const classConverter = new ClassConverter(this.compilerOptions);
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
                "export { BaseAvroRecord } from \"@degordian/avro-to-typescript\";\n",
            );
        }
    }

    private async processFile(filePath: string) {
        if (fs.statSync(filePath).isDirectory()) {
            await this.compileFolder(filePath);
            return;
        }

        const data = fs.readFileSync(filePath).toString();

        await this.compile(data);
    }
}
