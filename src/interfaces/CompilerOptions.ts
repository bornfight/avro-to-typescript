export interface CompilerOptions {
    logicalTypes?: LogicalTypeOptions;
    stringEnums?: boolean;
}

export interface LogicalTypeOptions {
    [avroType: string]: string;
}
