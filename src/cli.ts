#!/usr/bin/env node

import * as args from "command-line-args";
import * as cmdusage from "command-line-usage";
import * as fs from "fs";
import * as path from "path";
import {AvroToTypescriptCompiler} from "./components/AvroToTypescriptCompiler";
import {ConsoleHelper} from "./helpers/ConsoleHelper";

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

let options;
let usage;

try {
    options = args(cmdOptions);
    usage = cmdusage(usageOptions);
} catch (e) {
    ConsoleHelper.break("Invalid value or option used");
}

if (!options.compile) {
    ConsoleHelper.break("Options could not be compiled");
}

if (ConsoleHelper.validCompileArgs(options)) {
    const src: string = path.resolve(options.compile[0]);

    if (fs.existsSync(src)) {
        ConsoleHelper.break("The directory does not exist or is invalid");
    }

    const dist: string = path.resolve(options.compile[1]);

    const schemaDir: string = path.resolve(src);

    const compiler: AvroToTypescriptCompiler = new AvroToTypescriptCompiler();
    compiler.avroSchemaPath = schemaDir;
    compiler.tsSchemaPath = dist;
    compiler.compileFolder();
}
