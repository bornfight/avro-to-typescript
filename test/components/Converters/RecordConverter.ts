import * as chai from "chai";
import * as fs from "fs";
import * as path from "path";
import { RecordConverter } from "../../../src";

const expect = chai.expect;

chai.should();

const dataFolder = path.resolve(`./test/data/`);
const avroFolder = path.resolve(dataFolder + `/avro/`);
const compiledFolder = path.resolve(dataFolder + `/expected/`);

const getExpectedResult = (file: string) => {
    return fs.readFileSync(file).toString();
};

describe("RecordType Converter test", () => {
    it("should convert simple avro schema to TS interface", () => {
        const converter = new RecordConverter();
        converter.convert(`${avroFolder}/SimpleRecord.avsc`);

        const actual = converter.joinExports();
        const expected = getExpectedResult(`${compiledFolder}/SimpleRecord.ts.test`);
        expect(actual).to.deep.equal(expected);
    });

    it("should convert simple avro schema json to TS interface", () => {
        const converter = new RecordConverter();
        const avro = JSON.parse(fs.readFileSync(`${avroFolder}/SimpleRecord.json`).toString());
        converter.convert(avro);

        const actual = converter.joinExports();
        const expected = getExpectedResult(`${compiledFolder}/SimpleRecord.ts.test`);
        expect(actual).to.deep.equal(expected);
    });

    it("should convert avro schema with interface to TS interface", () => {
        const converter = new RecordConverter();
        converter.convert(`${avroFolder}/RecordWithInterface.avsc`);

        const actual = converter.joinExports();
        const expected = getExpectedResult(`${compiledFolder}/RecordWithInterface.ts.test`);
        expect(actual).to.deep.equal(expected);
    });

    it("should convert avro schema with MapType type to TS interface", () => {
        const converter = new RecordConverter();
        converter.convert(`${avroFolder}/RecordWithMap.avsc`);

        const actual = converter.joinExports();
        const expected = getExpectedResult(`${compiledFolder}/RecordWithMap.ts.test`);
        expect(actual).to.deep.equal(expected);
    });

    it("should convert avro schema with all types to TS interface", () => {
        const converter = new RecordConverter();
        converter.convert(`${avroFolder}/RecordWithUnion.avsc`);

        const actual = converter.joinExports();
        const expected = getExpectedResult(`${compiledFolder}/RecordWithUnion.ts.test`);
        expect(actual).to.deep.equal(expected);
    });

    it("should convert avro schema with MapType type to TS interface", () => {
        const converter = new RecordConverter();
        converter.convert(`${avroFolder}/ComplexRecord.avsc`);

        const actual = converter.joinExports();
        const expected = getExpectedResult(`${compiledFolder}/ComplexRecord.ts.test`);
        expect(actual).to.deep.equal(expected);
    });
});
