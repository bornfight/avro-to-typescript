import * as chai from "chai";
import { PrimitiveConverter } from "../../../src";

const expect = chai.expect;

chai.should();

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

    for (const expected in primitivesMap) {
        if (primitivesMap.hasOwnProperty(expected) === false) {
            continue;
        }

        for (const primitive of primitivesMap[expected]) {

            it(`should return ${expected} when given ${primitive}`, () => {
                const converter = new PrimitiveConverter();
                const actual = converter.convert(primitive);

                expect(expected).equal(actual);
            });

        }
    }
});
