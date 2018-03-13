import * as path from "path";
import {AvroToTypescriptCompiler} from "./components/AvroToTypescriptCompiler";

const avroToTypescriptCompiler = new AvroToTypescriptCompiler();
const avroPath = path.resolve( __dirname, `../../_avsc`);
const tsCompiledPath = path.resolve( __dirname, `../../_tsCompiled`);
avroToTypescriptCompiler.tsSchemaPath = path.resolve( tsCompiledPath, `user.ts`);
avroToTypescriptCompiler.avroSchemaPath = path.resolve( avroPath, `user.avsc`);
avroToTypescriptCompiler.compile().catch( (error: string) => {
    console.log("Error:", error);
});
