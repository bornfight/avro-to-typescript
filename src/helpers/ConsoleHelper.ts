export class ConsoleHelper {

    public static getArgs(): string[] {
        const args: string[] = process.argv;
        args.splice(0, 2);

        return args;
    }

    public static getUsage(): string {
        return this._usage;
    }

    public static break(error: string): void {
        console.log(error);
        console.log(this.getUsage());
        process.exit();
    }

    protected static _usage = "avro-to-typescript: package to compile avro schemas to typescript \n" +
        "[ --compile ] [ schema-dir ] [ output-dir ]";
}
