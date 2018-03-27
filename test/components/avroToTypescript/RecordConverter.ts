import * as chai from "chai";
import * as fs from "fs";
import {
    only,
    skip,
    suite,
    test,
} from "mocha-typescript";
import * as path from "path";
import sinonChai = require("sinon-chai");
import {RecordConverter} from "../../../src/components/avroToTypescript/RecordConverter";
import {RecordType} from "../../../src/interfaces/AvroSchemaInterface";

const expect = chai.expect;

chai.should();
chai.use(sinonChai);

const dataRoot = path.resolve(`${__dirname}/../../../../test/data`);
const avscFieldsDataRoot = `${dataRoot}/avscFieldsData`;
const expectedTsTypesRoot = `${dataRoot}/expectedTsTypes`;
const expectedTsClassesRoot = `${dataRoot}/expectedTsClasses`;

@suite("Testing RecordConverter")
class TestingRecordConverter {
    protected testRecordConverter(recordJsonPath: string, expectedTsPath: string) {
        const recordConverter = new RecordConverter();
        const recordType: RecordType =
            JSON.parse(fs.readFileSync(recordJsonPath).toString());
        const expectedTsType = fs.readFileSync(expectedTsPath).toString();
        recordConverter.convertRecord(recordType);
        const result = recordConverter.joinExports();
        expect(result).equal(expectedTsType);
    }

    protected testRecordClassConverter(recordJsonPath: string, expectedTsPath: string) {
        const recordConverter = new RecordConverter();
        const recordType: RecordType =
            JSON.parse(fs.readFileSync(recordJsonPath).toString());
        const expectedTsType = fs.readFileSync(expectedTsPath).toString();
        recordConverter.convertRecordToClass(recordType);
        const result = recordConverter.joinExports();
        expect(result).equal(expectedTsType);
    }

    @test
    private "should equal ./data/expectedTsClasses/testAvscSchemaUser when given testAvscSchemaUser.avsc"() {
        this.testRecordClassConverter(
            `${avscFieldsDataRoot}/testAvscSchemaUser.avsc`,
            `${expectedTsClassesRoot}/testAvscSchemaUser.ts.test`,
        );
    }

    @test
    private "should equal ./data/expectedTsTypes/testRecordSimple.ts when given testRecordSimple.json"() {
        this.testRecordConverter(
            `${avscFieldsDataRoot}/testRecordSimple.json`,
            `${expectedTsTypesRoot}/testRecordSimple.ts`,
        );
    }

    @test
    private "should equal ./data/expectedTsTypes/testRecordWithEnum.ts when given testRecordWithEnum.json"() {
        this.testRecordConverter(
            `${avscFieldsDataRoot}/testRecordWithEnum.json`,
            `${expectedTsTypesRoot}/testRecordWithEnum.ts`,
        );
    }

    @test
    private "should eq ./data/expectedTsTypes/testRecordWithInterface.ts if given testRecordWithInterface.json"() {
        this.testRecordConverter(
            `${avscFieldsDataRoot}/testRecordWithInterface.json`,
            `${expectedTsTypesRoot}/testRecordWithInterface.ts`,
        );
    }

    @test
    private "should eq ./data/expectedTsTypes/testRecordWithMapType.ts if given testRecordWithMapType.json"() {
        this.testRecordConverter(
            `${avscFieldsDataRoot}/testRecordWithMapType.json`,
            `${expectedTsTypesRoot}/testRecordWithMapType.ts`,
        );
    }

    @test
    private "should eq ./data/expectedTsTypes/testRecordMapTypeInterfaceEnum.ts if given testRecordMapTypeInterfaceEnum.json"() {
        this.testRecordConverter(
            `${avscFieldsDataRoot}/testRecordMapTypeInterfaceEnum.json`,
            `${expectedTsTypesRoot}/testRecordMapTypeInterfaceEnum.ts`,
        );
    }

    @test
    private "should eq ./data/expectedTsTypes/testRecordWithUnion.ts if given testRecordWithUnion.json"() {
        this.testRecordConverter(
            `${avscFieldsDataRoot}/testRecordWithUnion.json`,
            `${expectedTsTypesRoot}/testRecordWithUnion.ts`,
        );
    }
}
