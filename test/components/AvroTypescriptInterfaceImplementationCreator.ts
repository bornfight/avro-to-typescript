import * as chai from "chai";
import {
    only,
    skip,
    suite,
    test,
} from "mocha-typescript";
import sinonChai = require("sinon-chai");
import {
    AvroTypescriptInterfaceImplementationCreator as ImplementationCreator,
} from "../../src/components/AvroTypescriptInterfaceImplementationCreator";
import {PathHelper} from "../../src/helpers/PathHelper";
const expect = chai.expect;

chai.should();
chai.use(sinonChai);

@suite("Testing components/AvroTypescriptInterfaceImplementationCreator")
export class AvroTypescriptInterfaceImplementationCreator {

    @test private "just testing class"() {
        const interfaceFilePath = `${PathHelper.testRoot()}/data/expectedTsTypes/testAvscSchemaUser.ts`;
        console.log(interfaceFilePath, "TUUUU", PathHelper.testRoot());
        const avroTypescriptInterfaceImplementationCreator = new ImplementationCreator(interfaceFilePath);
        avroTypescriptInterfaceImplementationCreator.init();
    }
}
