import * as chai from "chai";
import * as fs from "fs";
import * as path from "path";
import { ClassConverter } from "../../../src";

const expect = chai.expect;

chai.should();

const dataFolder = path.resolve(`./test/data/`);
const avroFolder = path.resolve(dataFolder + `/avro/`);
const compiledFolder = path.resolve(dataFolder + `/expected/`);

const getExpectedResult = (file: string) => {
    return fs.readFileSync(file).toString();
};

describe("RecordType Converter test", () => {
    it("should convert User avro schema to TS class", () => {
        const converter = new ClassConverter();
        converter.convert(`${avroFolder}/User.avsc`);

        const actual = converter.joinExports();
        const expected = getExpectedResult(`${compiledFolder}/User.ts.test`);
        expect(actual).to.deep.equal(expected);
    });

    it("should convert TradeCollection avro schema to TS class", () => {
        const converter = new ClassConverter();
        converter.convert(`${avroFolder}/TradeCollection.avsc`);

        const actual = converter.joinExports();
        const expected = getExpectedResult(`${compiledFolder}/TradeCollection.ts.test`);
        expect(actual).to.deep.equal(expected);
    });
});
