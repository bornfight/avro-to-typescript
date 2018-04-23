#!/usr/bin/env node

import * as args from "command-line-args";
import * as cmdusage from "command-line-usage";
import * as fs from "fs";
import * as path from "path";
import {AvroToTypescriptCompiler} from "./components/AvroToTypescriptCompiler";
import {ConsoleHelper} from "./helpers/ConsoleHelper";

export * from "./components/AvroToTypescriptCompiler";
export * from "./components/avroToTypescript/EnumConverter";
export * from "./components/avroToTypescript/PrimitiveConverter";
export * from "./components/avroToTypescript/AvroSchemaConverter";
export * from "./components/avroToTypescript/RecordConverter";

const cmdOptions = [
    {
        name: "compile",
        alias: "c",
        type: String,
        typeLabel: "{underline schema-directory} {underline output-directory}",
        description: "Compile schema directory into output directory",
        multiple: true,
    },
    {
        name: "help",
        alias: "h",
        description: "Print this usage guide.",
    },
];

const usageOptions = [
    {
        header: "avro-to-typescript",
        content: "Compile avro schemas to typescript classes with ease. It will output to set directory " +
        "and append namespace to path.",
    },
    {
        header: "Options",
        optionList: cmdOptions,
    },
    {
        content: "Project home: {underline https://github.com/degordian/avro-to-typescript}",
    },
];
try {
    args(cmdOptions);
} catch (e) {
    ConsoleHelper.break("Invalid value or option used");
}

const options = args(cmdOptions);
const usage = cmdusage(usageOptions);

if (options.compile) {
        let src: string = options.compile[0];

        if (src === undefined && fs.existsSync(src)) {
            ConsoleHelper.break("No source directory");
        }
        if (!src.endsWith("/")) {
            src += "/";
        }

        let dist: string = options.compile[1];
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
        compiler.compileFolder();
} else {
    console.log(usage);
}
