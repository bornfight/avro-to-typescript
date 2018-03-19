import * as chai from "chai";
import {
    only,
    skip,
    suite,
    test,
} from "mocha-typescript";
import sinonChai = require("sinon-chai");
import {RenderHelper} from "../../src/helpers/RenderHelper";
const expect = chai.expect;

chai.should();
chai.use(sinonChai);

@suite("Testing helpers/RenderHelper")
export class RenderHelperTest {

    @test
    public "should return same content when none of params are given"() {
        const content = "My name is {{name}}. My surname is {{surname}}. {{name}} {{surname}}";
        const params = {};
        const renderedContent = RenderHelper.renderWithParams( content, params );
        expect(renderedContent).equals(content);
    }

    @test
    public "should render when given two params and content has one param of each"() {
        const content = "My name is {{name}}. My surname is {{surname}}.";
        const expectedRenderedContent = "My name is Testing. My surname is Suite.";
        const params = {
            name: "Testing",
            surname: "Suite",
        };
        const renderedContent = RenderHelper.renderWithParams( content, params );
        expect(renderedContent).equals(expectedRenderedContent);
    }

    @test
    public "should render when given two params and content has two params of each"() {
        const content = "My name is {{name}}. My surname is {{surname}}. {{name}} {{surname}}";
        const expectedRenderedContent = "My name is Testing. My surname is Suite. Testing Suite";
        const params = {
            name: "Testing",
            surname: "Suite",
        };
        const renderedContent = RenderHelper.renderWithParams( content, params );
        expect(renderedContent).equals(expectedRenderedContent);
    }

}
