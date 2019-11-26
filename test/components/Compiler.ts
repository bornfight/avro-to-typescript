import * as chai from "chai";
import * as fs from "fs-extra";
import * as path from "path";
import { Compiler } from "../../src";
import {dataDir} from "../utils";

const expect = chai.expect;

chai.should();

const avroFolder = path.resolve(dataDir() + `/avro/`);
const expectedFolder = path.resolve(dataDir() + `/expected/`);
const compiledFolder = path.resolve(dataDir() + `/compiled/`);

describe("Testing Compiler", () => {

    afterEach(() => {
        fs.removeSync(compiledFolder + "/com");
        fs.removeSync(compiledFolder + "/BaseAvroRecord.ts");
    });

    it(`should create User class when given User avro schema`, async () => {

        const avro = `${avroFolder}/User.avsc`;
        const compiledFile = `${compiledFolder}/com/example/avro/User.ts`;
        const expectedFile = `${expectedFolder}/User.ts.test`;

        const compiler = new Compiler(compiledFolder);

        await compiler.compile(avro);

        const actual = fs.readFileSync(compiledFile).toString();
        const expected = fs.readFileSync(expectedFile).toString();
        expect(actual).to.deep.equal(expected);
    });

    it(`should create TradeCollection class when given TradeCollection avro schema`, async () => {

        const avro = `${avroFolder}/TradeCollection.avsc`;
        const compiledFile = `${compiledFolder}/com/example/avro/TradeCollection.ts`;
        const expectedFile = `${expectedFolder}/TradeCollection.ts.test`;

        const compiler = new Compiler(compiledFolder);

        await compiler.compile(avro);

        const actual = fs.readFileSync(compiledFile).toString();
        const expected = fs.readFileSync(expectedFile).toString();
        expect(actual).to.deep.equal(expected);
    });

    it(`should create BaseAvroRecord file after compiling User schema`, async () => {

        const avro = `${avroFolder}/User.avsc`;
        const compiledFile = `${compiledFolder}/BaseAvroRecord.ts`;
        const expectedFile = `${expectedFolder}/BaseAvroRecord.ts.test`;

        const compiler = new Compiler(compiledFolder);

        await compiler.compile(avro);

        const actual = fs.readFileSync(compiledFile).toString();
        const expected = fs.readFileSync(expectedFile).toString();
        expect(actual).to.deep.equal(expected);
    });

});
