import * as chai from "chai";
import * as fs from "fs";
import * as path from "path";
import { EnumConverter } from "../../../src";

const expect = chai.expect;

chai.should();

const dataFolder = path.resolve(`./test/data/`);
const avroFolder = path.resolve(dataFolder + `/avro/`);
const compiledFolder = path.resolve(dataFolder + `/expected/`);

const getExpectedResult = (file: string) => {
    return fs.readFileSync(file).toString();
};

describe("Enum Converter", () => {

    it(`should successfully convert Enum avro file to TS enum`, () => {
        const converter = new EnumConverter();
        converter.convert(`${avroFolder}/SimpleEnum.avsc`);

        const actual = converter.joinExports();
        const expected = getExpectedResult(`${compiledFolder}/SimpleEnum.ts.test`);
        expect(actual).to.deep.equal(expected);
    });
});
