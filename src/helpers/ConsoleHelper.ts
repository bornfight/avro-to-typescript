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

    public static validCompileArgs(options: any): boolean {
        if (options.compile[0] === undefined || options.compile[1] === undefined) {
            ConsoleHelper.break("Invalid parameters");
        }

        return true;
    }

    protected static _usage = "Check --help";
}
