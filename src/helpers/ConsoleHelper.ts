export class ConsoleHelper {

    public static info(msg: string) {
        console.info(msg);
    }

    public static getArgs(): string[] {
        const args: string[] = process.argv;
        args.splice(0, 2);

        return args;
    }

    public static getUsage(): string {
        return this._usage;
    }

    public static break(error: string): void {
        console.error(`Error: ${error}`);
        console.info(this.getUsage());
        process.exit();
    }

    protected static _usage = "Check --help";
}
