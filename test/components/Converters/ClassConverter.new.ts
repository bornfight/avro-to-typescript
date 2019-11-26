import * as chai from "chai";
import * as fs from "fs";
import * as path from "path";
import {ClassConverter} from "../../../src";
import {dataDir} from "../../utils";

const expect = chai.expect;

chai.should();

const avscDir = path.join(dataDir(), "avro", "records");
const expectedDir = path.join(dataDir(), "expected");

const getExpectedResult = (file: string) => {
    return fs.readFileSync(file).toString();
};

describe("New Class Converter test", () => {
    it("should convert a record with default sub-records", () => {
        const converter = new ClassConverter();
        converter.convert(`${avscDir}/RecordWithRecord.avsc`);

        const actual = converter.joinExports();
        const expected = getExpectedResult(`${expectedDir}/RecordWithRecord.ts.test`);
        expect(actual).to.deep.equal(expected);
    });
});
