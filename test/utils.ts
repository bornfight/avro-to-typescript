import * as path from "path";

export function dataDir(): string {
    return __dirname.match("/dist/")
        ? path.join(__dirname, "..", "..", "test", "data")
        : path.join(__dirname, "data");
}
