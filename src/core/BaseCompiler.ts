import {AvroToTypescriptCompiler} from "../components/AvroToTypescriptCompiler";
import {ErrorHandler, ErrorHandlerInterface} from "../mixins/ErrorHandler";

@ErrorHandler()
export abstract class BaseCompiler implements ErrorHandlerInterface {
    public static errorMessage = {
        avroSchemaPathIsUndefined: "Avro path schema is undefined",
        tsSchemaPathIsUndefined: "Typescript path schema is undefined",
        notCompileReady: "Compiler is not ready",
    };

    public errorType: string;
    public errors: string[];
    public hasErrors: () => boolean;
    public addError: (errorMessage: string) => void;

    get tsSchemaPath(): string {
        return this._tsSchemaPath;
    }

    set tsSchemaPath(value: string) {
        this._tsSchemaPath = value;
    }

    get avroSchemaPath(): string {
        return this._avroSchemaPath;
    }

    set avroSchemaPath(value: string) {
        this._avroSchemaPath = value;
    }

    private _avroSchemaPath: string;
    private _tsSchemaPath: string;

    public abstract compile(data: string): Promise<object>;

    protected isCompileReady(): boolean {
        if (this.avroSchemaPath === undefined) {
            this.addError(AvroToTypescriptCompiler.errorMessage.avroSchemaPathIsUndefined);
        }

        if (this.tsSchemaPath === undefined) {
            this.addError(AvroToTypescriptCompiler.errorMessage.tsSchemaPathIsUndefined);
        }

        if (this.hasErrors() === true) {
            throw new Error(this.errors[0]);
        }

        return true;
    }
}
