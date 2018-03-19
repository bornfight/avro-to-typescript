import * as chai from "chai";
import {
    only,
    skip,
    suite,
    test,
} from "mocha-typescript";
import sinonChai = require("sinon-chai");
import {ExportModel} from "../../src/models/ExportModel";
import {InterfaceModel, InterfaceProperty} from "../../src/models/InterfaceModel";
const expect = chai.expect;

chai.should();
chai.use(sinonChai);

@suite("Testing InterfaceModelTest")
export class InterfaceModelTest {

    @skip
    @test private "should have properties name:string, surname:string, age:number"() {
        const interfaceModel = new InterfaceModel();
        const interfaceExportModel: ExportModel = new ExportModel();
        const expectedProperties: InterfaceProperty[] = [
            {
                name: "name",
                type: "string",
                raw: "name: string;",
            },
            {
                name: "surname",
                type: "string",
                raw: "surname: string;",
            },
            {
                name: "age",
                type: "number",
                raw: "age: number;",
            },
        ];
        interfaceExportModel.name = "User";
        interfaceExportModel.content = `
        export interface User {
            name: string;
            surname: string;
            age: number;
        }
        `;
        interfaceModel.setFromInterfaceExportModel(interfaceExportModel);
        expect(interfaceModel.properties).contains(expectedProperties);
    }
}
