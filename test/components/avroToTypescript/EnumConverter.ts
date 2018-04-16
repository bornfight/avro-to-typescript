import * as chai from "chai";
import * as fs from "fs";
import * as path from "path";
import sinonChai = require("sinon-chai");
import {EnumConverter} from "../../../src/components/avroToTypescript/EnumConverter";
import {EnumType} from "../../../src/interfaces/AvroSchemaInterface";

const expect = chai.expect;

chai.should();
chai.use(sinonChai);

const dataRoot = path.resolve(`${__dirname}/../../../test/data`);
const avscFieldsDataRoot = `${dataRoot}/avscFieldsData`;
const expectedTsTypesRoot = `${dataRoot}/expectedTsTypes`;

describe("Compile primitive types", () => {

    it(`should return same content as in ./data/expectedTsTypes/testEnum1.ts
     when given testEnum1.json`, () => {
        const enumConverter = new EnumConverter();
        const enumField: EnumType = JSON.parse(fs.readFileSync(`${avscFieldsDataRoot}/testEnum1.json`).toString());
        const expectedTsType = fs.readFileSync(`${expectedTsTypesRoot}/testEnum1.ts`).toString();
        enumConverter.convertType(enumField);
        const result = enumConverter.joinExports();
        expect(expectedTsType).equal(result);
    });
});
