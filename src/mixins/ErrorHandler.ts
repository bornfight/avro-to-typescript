import {Mixin} from "../core/Mixin";
import {MixinHelper} from "../helpers/MixinHelper";

export interface ErrorHandlerInterface {
    errors: string[];
    hasErrors: () => boolean;
    addError: (errorMessage: string) => void;
    errorType: string;
}

export enum errorHandlerTypes {
    WARN = "warn",
    THROW_ERROR = "throw_error",
}

export interface ErrorHandlerConfigurationInterface {
    errorType?: errorHandlerTypes;
}

export class ErrorHandlerMixin extends Mixin {
    public errorType = errorHandlerTypes.WARN;
    protected errors: string[] = [];

    public hasErrors(): boolean {
        if (this.errors === undefined) {
            return false;
        }

        return this.errors.length > 0;
    }

    protected addError(errorMessage: string) {
        if (this.errors === undefined) {
            this.errors = [];
        }

        if (this.errorType === errorHandlerTypes.WARN) {
            console.log("Error added: ", errorMessage);
        }

        if (this.errorType === errorHandlerTypes.THROW_ERROR) {
            throw new Error(errorMessage);
        }

        this.errors.push(errorMessage);
    }
}

/**
 * @name ErrorHandler
 */
export function ErrorHandler( configurations: ErrorHandlerConfigurationInterface = {}) {
    return MixinHelper.getMixinAnnotation(ErrorHandlerMixin);
}
