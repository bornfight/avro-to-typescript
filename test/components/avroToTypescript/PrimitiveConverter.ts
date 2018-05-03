import * as chai from "chai";
import sinonChai = require("sinon-chai");
import {PrimitiveConverter} from "../../../src/components/avroToTypescript/PrimitiveConverter";

const expect = chai.expect;

chai.should();
chai.use(sinonChai);

describe("Compile primitive types", () => {

    const primitivesMap: any = {
        number: [
            "int",
            "long",
            "double",
            "float",
        ],
        Buffer: [
            "bytes",
        ],
        null: [
            "null",
        ],
        boolean: [
            "boolean",
        ],
        string: [
            "string",
        ],
    };

    for (const expectedType in primitivesMap) {
        if (primitivesMap.hasOwnProperty(expectedType) === false) {
            continue;
        }

        primitivesMap[expectedType].forEach((primitive: string) => {
            it(`should return ${expectedType} when given ${primitive}`, () => {
                const primitiveConverter = new PrimitiveConverter();
                const result = primitiveConverter.convertType(primitive);
                expect(expectedType).equal(result);
            });
        });
    }
});
