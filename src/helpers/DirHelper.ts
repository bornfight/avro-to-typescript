import * as fs from "fs";
import * as path from "path";

export class DirHelper {
    public static mkdirIfNotExist(dir: string) {
        if (!this.exists(dir)) {
            console.log("Directory doesn't exist, creating it...");
            dir
                .split(path.sep)
                .reduce((currentPath, folder) => {
                    currentPath += folder + path.sep;
                    if (!fs.existsSync(currentPath)) {
                        fs.mkdirSync(currentPath);
                    }
                    return currentPath;
                }, "");
        }
    }

    public static exists(dir: string): boolean {
        return fs.existsSync(dir);
    }
}
