export abstract class BaseCompiler {
    private _schemaPath: string;
    private _classPath: string;

    get classPath(): string {
        return this._classPath;
    }

    set classPath(value: string) {
        this._classPath = value;
    }

    get schemaPath(): string {
        return this._schemaPath;
    }

    set schemaPath(value: string) {
        this._schemaPath = value;
    }

    public abstract compile(data: string): Promise<object>;
}
