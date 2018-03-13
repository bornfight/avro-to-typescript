import * as chai from "chai";
import * as fs from "fs";
import * as path from "path";
import sinonChai = require("sinon-chai");
import {MainCompiler} from "../../../src/components/avroToTypescript/MainCompiler";
const expect = chai.expect;

chai.should();
chai.use(sinonChai);

const root = path.resolve(__dirname, `../../../../`);
const tsExpectedRoot = `${root}/test/data/expectedTsTypes`;
const tsCompiledRoot = `${root}/test/data/tsCompiled`;
const avscRoot = `${root}/test/data/avscFieldsData`;

describe("Testing RecordConverter", () => {

    it(`should create file ./data/tsCompiled/testAvscSchemaUser.ts with same content as in
    ./data/expectedTsTypes/testAvscSchemaUser.ts
    when given testAvscSchemaUser.json`, async () => {

        const avscFile = `${avscRoot}/testAvscSchemaUser.avsc`;
        const tsCompiledFile = `${tsCompiledRoot}/testAvscSchemaUser.ts`;
        const tsExpectedFile = `${tsExpectedRoot}/testAvscSchemaUser.ts`;

        await testMainCompiler(
            avscFile,
            tsCompiledFile,
            tsExpectedFile,
        );
    });

    async function testMainCompiler(avscPath: string, tsCompiledPath: string, tsExpectedPath: string): Promise<void> {
        const mainCompiled = new MainCompiler();
        mainCompiled.tsSchemaPath = tsCompiledPath;
        mainCompiled.avroSchemaPath = avscPath;
        await mainCompiled.compile();

        const tsCompiledContent: string = fs.readFileSync(tsCompiledPath).toString();
        const tsExpectedContent: string = fs.readFileSync(tsExpectedPath).toString();

        expect(tsCompiledContent).equal(tsExpectedContent);
        return;
    }

});
