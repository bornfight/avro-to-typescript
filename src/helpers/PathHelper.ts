import * as path from "path";

export class PathHelper {
    public static root(): string {
        return path.resolve( __dirname + "/../");
    }

    public static testRoot(): string {
        return `${PathHelper.root()}/../test`;
    }

    public static templates(): string {
        return `${PathHelper.root()}/../../src/templates`;
    }

    public static interfaces(): string {
        return `${PathHelper.root()}/interfaces`;
    }
}
