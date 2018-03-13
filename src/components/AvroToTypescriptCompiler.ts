import {BaseCompiler} from "../core/BaseCompiler";
import {FileHelper} from "../helpers/FileHelper";
import {TypeHelper} from "../helpers/TypeHelper";
import {AvroSchemaInterface} from "../interfaces/AvroSchemaInterface";
import {AvroSchemaConverter} from "./avroToTypescript/AvroSchemaConverter";

export class AvroToTypescriptCompiler extends BaseCompiler {
    public tsSchemaContent: string;

    public async compile(): Promise<void> {

        if (this.isCompileReady() === false) {
            this.addError(AvroToTypescriptCompiler.errorMessage.notCompileReady);
            throw new Error(AvroToTypescriptCompiler.errorMessage.notCompileReady);
        }

        const schemaConverter = new AvroSchemaConverter();
        const schemaFileHelper = new FileHelper(this.avroSchemaPath);
        const tsFileHelper = new FileHelper(this.tsSchemaPath);
        const schemaFileContent: string = (await schemaFileHelper.getContent()).toString();

        const schemaContent: AvroSchemaInterface = JSON.parse(schemaFileContent) as AvroSchemaInterface;

        if (TypeHelper.isRecordType(schemaContent) === false) {
            this.addError("Avro schema is not record type");
        }

        if (this.isCompileReady() === false) {
            throw new Error(AvroToTypescriptCompiler.errorMessage.notCompileReady);
        }

        const tsSchemaContent = await schemaConverter.convert(schemaContent);
        await tsFileHelper.create();
        await tsFileHelper.save( tsSchemaContent );

        this.tsSchemaContent = tsSchemaContent;

        return;
    }
}
