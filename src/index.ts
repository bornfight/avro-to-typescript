import * as fs from "fs";
import * as path from "path";
import {AvroToTypescriptCompiler} from "./components/AvroToTypescriptCompiler";
import {ConsoleHelper} from "./helpers/ConsoleHelper";

export * from "./components/AvroToTypescriptCompiler";
export * from "./components/avroToTypescript/EnumConverter";
export * from "./components/avroToTypescript/PrimitiveConverter";
export * from "./components/avroToTypescript/AvroSchemaConverter";
export * from "./components/avroToTypescript/RecordConverter";

switch (process.argv[2]) {
    case "-h":
    case "--help":
        console.log(ConsoleHelper.getUsage());
        process.exit();
        break;

    case "--compile":
        const args: string[] = ConsoleHelper.getArgs();

        let src: string = args[1];

        if (src === undefined && fs.existsSync(src)) {
            ConsoleHelper.break("No source directory");
        }
        if (!src.endsWith("/")) {
            src += "/";
        }

        let dist: string = args[2];
        if (dist === undefined) {
            ConsoleHelper.break("No output directory");
        }
        if (!dist.endsWith("/")) {
            dist += "/";
        }

        const schemaDir: string = path.resolve(src);

        const compiler: AvroToTypescriptCompiler = new AvroToTypescriptCompiler();
        compiler.avroSchemaPath = schemaDir;
        compiler.tsSchemaPath = dist;
        compiler.compile();
        break;

    default:
        ConsoleHelper.break("No arguments");
        break;
}
