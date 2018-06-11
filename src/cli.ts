#!/usr/bin/env node

import * as args from "command-line-args";
import * as cmdusage from "command-line-usage";
import * as fs from "fs";
import * as path from "path";
import { Compiler } from "./components/Compiler/Compiler";
import { ConsoleHelper } from "./helpers/ConsoleHelper";

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

    console.log(options);
    usage = cmdusage(usageOptions);
} catch (e) {
    ConsoleHelper.break("Invalid value or option used");
}

if (options === undefined) {
    throw new Error();
}

if (options.compile) {
    let schemaDir = options.compile[0];
    let classDir = options.compile[1];

    if (schemaDir === undefined || classDir === undefined) {
        ConsoleHelper.break("Undefined");
    }

    classDir = path.resolve(classDir);
    schemaDir = path.resolve(schemaDir);

    if (!fs.existsSync(schemaDir) || !fs.existsSync(classDir)) {
        ConsoleHelper.break("The directory does not exist or is invalid");
    }

    const compiler: Compiler = new Compiler(classDir);
    compiler.compileFolder(schemaDir);
}

if (options.help !== undefined) {
    console.log(usage);
}
