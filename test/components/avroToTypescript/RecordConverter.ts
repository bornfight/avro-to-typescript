import * as chai from "chai";
import * as fs from "fs";
import * as path from "path";
import sinonChai = require("sinon-chai");
import {RecordConverter} from "../../../src/components/avroToTypescript/RecordConverter";
import { RecordType} from "../../../src/interfaces/AvroSchemaInterface";
const expect = chai.expect;

chai.should();
chai.use(sinonChai);

const dataRoot = path.resolve(`${__dirname}/../../../../test/data`);
const avscFieldsDataRoot = `${dataRoot}/avscFieldsData`;
const expectedTsTypesRoot = `${dataRoot}/expectedTsTypes`;

describe("Testing RecordConverter", () => {

    it(`should return same content as in ./data/expectedTsTypes/testRecordSimple.ts
    when given testRecordSimple.json`, () => {
        testRecordConverter(
            `${avscFieldsDataRoot}/testRecordSimple.json`,
            `${expectedTsTypesRoot}/testRecordSimple.ts`,
        );
    });

    it(`should return same content as in ./data/expectedTsTypes/testRecordWithEnum.ts
    when given testRecordWithEnum.json`, () => {
        testRecordConverter(
            `${avscFieldsDataRoot}/testRecordWithEnum.json`,
            `${expectedTsTypesRoot}/testRecordWithEnum.ts`,
        );
    });

    it(`should return same content as in ./data/expectedTsTypes/testRecordWithInterface.ts
    when given testRecordWithInterface.json`, () => {
        testRecordConverter(
            `${avscFieldsDataRoot}/testRecordWithInterface.json`,
            `${expectedTsTypesRoot}/testRecordWithInterface.ts`,
        );
    });

    it(`should return same content as in ./data/expectedTsTypes/testRecordWithMapType.ts
    when given testRecordWithMapType.json`, () => {
        testRecordConverter(
            `${avscFieldsDataRoot}/testRecordWithMapType.json`,
            `${expectedTsTypesRoot}/testRecordWithMapType.ts`,
        );
    });

    it(`should return same content as in ./data/expectedTsTypes/testRecordMapTypeInterfaceEnum.ts
    when given testRecordMapTypeInterfaceEnum.json`, () => {
        testRecordConverter(
            `${avscFieldsDataRoot}/testRecordMapTypeInterfaceEnum.json`,
            `${expectedTsTypesRoot}/testRecordMapTypeInterfaceEnum.ts`,
        );
    });

    it(`should return same content as in ./data/expectedTsTypes/testRecordWithUnion.ts
    when given testRecordWithUnion.json`, () => {
        testRecordConverter(
            `${avscFieldsDataRoot}/testRecordWithUnion.json`,
            `${expectedTsTypesRoot}/testRecordWithUnion.ts`,
        );
    });

    function testRecordConverter(recordJsonPath: string, expectedTsPath: string) {
        const recordConverter = new RecordConverter();
        const recordType: RecordType =
            JSON.parse(fs.readFileSync(recordJsonPath).toString());
        const expectedTsType = fs.readFileSync(expectedTsPath).toString();
        recordConverter.convertRecord(recordType);
        const result = recordConverter.joinExports();
        expect(result).equal(expectedTsType);
    }

});
