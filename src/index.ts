import * as path from "path";
import {MainCompiler} from "./components/avroToTypescript/MainCompiler";

const avroToTypescriptCompiler = new MainCompiler();
const avroPath = path.resolve( __dirname, `../../_avsc`);
const tsCompiledPath = path.resolve( __dirname, `../../_tsCompiled`);
avroToTypescriptCompiler.tsSchemaPath = path.resolve( tsCompiledPath, `user.ts`);
avroToTypescriptCompiler.avroSchemaPath = path.resolve( avroPath, `user.avsc`);
avroToTypescriptCompiler.compile().catch( (error: string) => {
    console.log("Error:", error);
});
