import * as chai from "chai";
import * as fs from "fs";
import * as path from "path";
import sinonChai = require("sinon-chai");
import {AvroToTypescriptCompiler} from "../../src/components/AvroToTypescriptCompiler";
const expect = chai.expect;

chai.should();
chai.use(sinonChai);

const root = path.resolve(__dirname, `../../../`);
const tsExpectedRoot = `${root}/test/data/expectedTsTypes`;
const tsCompiledRoot = `${root}/test/data/tsCompiled`;
const avscRoot = `${root}/test/data/avscFieldsData`;

describe("Testing AvroToTypescriptCompiler", () => {

    it.skip(`should create file ./data/tsCompiled/testAvscSchemaUser.ts with same content as in
    ./data/expectedTsTypes/testAvscSchemaUser.ts
    when given testAvscSchemaUser.json`, async () => {

        const avscFile = `${avscRoot}/testAvscSchemaUser.avsc`;
        const tsCompiledFile = `${tsCompiledRoot}/testAvscSchemaUser.ts`;
        const tsExpectedFile = `${tsExpectedRoot}/testAvscSchemaUser.ts`;

        await testAvroToTypescriptCompiler(
            avscFile,
            tsCompiledFile,
            tsExpectedFile,
        );
    });

    async function testAvroToTypescriptCompiler(avscPath: string,
                                                tsCompiledPath: string,
                                                tsExpectedPath: string): Promise<void> {
        const mainCompiled = new AvroToTypescriptCompiler();
        mainCompiled.tsSchemaPath = tsCompiledPath;
        mainCompiled.avroSchemaPath = avscPath;
        await mainCompiled.compileFolder();

        const tsCompiledContent: string = fs.readFileSync(tsCompiledPath).toString();
        const tsExpectedContent: string = fs.readFileSync(tsExpectedPath).toString();

        expect(tsCompiledContent).equal(tsExpectedContent);
        return;
    }

});
