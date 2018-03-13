import * as fs from "fs";
import ErrnoException = NodeJS.ErrnoException;

export class FileHelper {
    public filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    public getContent(): Promise<string | Buffer> {
        return new Promise( (resolve, reject) => {
            if (this.exists() === false) {
                reject(`File not found: ${this.filePath}`);
                return;
            }

            fs.readFile(this.filePath, {}, (error: ErrnoException, content: string | Buffer) => {
                if (error) {
                    console.log(error, "Err", this.filePath);
                    reject(error);
                    return;
                }

                resolve( content );
            });
        });
    }

    public save(content: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.exists() === false) {
                reject(`File not found: ${this.filePath}`);
                return;
            }

            fs.writeFileSync( this.filePath, content );
            resolve(true);
        });
    }

    public exists(): boolean {
        return fs.existsSync(this.filePath);
    }

    public async create(): Promise <void> {
        if (this.exists() === true) {
            return;
        }

        fs.writeFileSync(this.filePath, "");
    }
}
