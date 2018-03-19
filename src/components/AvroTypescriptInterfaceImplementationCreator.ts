import {FileHelper} from "../helpers/FileHelper";
import {PathHelper} from "../helpers/PathHelper";
import {ExportModel} from "../models/ExportModel";

export class AvroTypescriptInterfaceImplementationCreator {
    public interfaceFilePath: string;
    public templatesPath = {
        classMethodsPath: `${PathHelper.templates()}/typescriptClassMethodsTemplate`,
        classPath: `${PathHelper.templates()}/typescriptClassTemplate`,
    };
    public templatesContent = {
        classMethodsContent: "",
        classContent: "",
    };

    public mainClassExportModel: {
        mainClass: ExportModel,
        implementationInterfaces: ExportModel[],
    };

    constructor(interfaceFilePath: string) {
        this.interfaceFilePath = interfaceFilePath;
    }

    public setMainClassExportModel( exportClassModel: ExportModel , implementationInterfaceModels: ExportModel[]) {
        this.mainClassExportModel.mainClass = exportClassModel;
        this.mainClassExportModel.implementationInterfaces = implementationInterfaceModels;
    }

    public async init(): Promise<void> {
        await this.getTemplates();
        this.renderTemplates();
        console.log("Hello", this.templatesContent);
        return;
    }

    protected async getTemplates(): Promise<void> {
        const templateClassMethodsFileHelper = new FileHelper(this.templatesPath.classMethodsPath);
        const templateClassFileHelper = new FileHelper(this.templatesPath.classPath);
        this.templatesContent.classMethodsContent = (await templateClassMethodsFileHelper.getContent()).toString();
        this.templatesContent.classContent = (await templateClassFileHelper.getContent()).toString();
    }

    protected renderTemplates(): void {
        return;
    }
}
