#!/usr/bin/env node

import * as args from "command-line-args";
import * as cmdusage from "command-line-usage";
import * as fs from "fs";
import * as path from "path";
import { Compiler } from "./components/Compiler/Compiler";
import { ConsoleHelper } from "./helpers/ConsoleHelper";
import { LogicalTypeOptions } from "./interfaces/CompilerOptions";

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
        name: "string-enums",
        type: Boolean,
        description: "Should enums be compiled to string enums (default: incremental enums)",
    },
    {
        name: "help",
        alias: "h",
        description: "Print this usage guide.",
    },
    {
        name: "logical-types",
        type: String,
        typeLabel: "{underline logical-type} {underline typescript-type}",
        description: "Use logical types",
        multiple: true,
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

if (options === undefined) {
    ConsoleHelper.break("Could not get program arguments");
    throw process.exit(1);
}

if (options.compile) {
    let avroSchemaDirectory = options.compile[0];
    let outputDirectory = options.compile[1];

    if (avroSchemaDirectory === undefined || outputDirectory === undefined) {
        const missingOption = avroSchemaDirectory === undefined ? "Schema directory" : "Output directory";
        ConsoleHelper.break(`${missingOption} argument is missing.`);
    }

    outputDirectory = path.resolve(outputDirectory);
    avroSchemaDirectory = path.resolve(avroSchemaDirectory);

    if (!fs.existsSync(avroSchemaDirectory) || !fs.existsSync(outputDirectory)) {
        const missingOption = !fs.existsSync(avroSchemaDirectory) ? "Schema directory" : "Output directory";
        ConsoleHelper.break(`The ${missingOption} directory does not exist or is invalid`);
    }

    const logicalTypes: LogicalTypeOptions = {};
    const logicalTypesMap: string[] = options["logical-types"];

    /**
     * Parse logical type argument options, it is parsed as [avroType, tsType, avroType, tsType, ...]
     * That's the reason for "index + 1".
     */
    if (logicalTypesMap !== undefined && logicalTypesMap.length !== 0) {
        for (let index = 0; index < logicalTypesMap.length; index += 2) {
            const avroTypeIndex = index;
            const typescriptTypeIndex = index + 1;

            if (logicalTypesMap[typescriptTypeIndex] === undefined) {
                ConsoleHelper.break("Invalid logical-types, you must provide both logical type and TypeScript type");
            }

            logicalTypes[logicalTypesMap[avroTypeIndex]] = logicalTypesMap[typescriptTypeIndex];
        }
    }

    const compiler: Compiler = new Compiler(outputDirectory, logicalTypes);
    compiler.compileFolder(avroSchemaDirectory);
}

if (options.help !== undefined) {
    console.log(usage);
}
