import {ExportModel} from "./ExportModel";

export interface InterfaceProperty {
    name: string;
    type: string;
    raw: string;
}

export class InterfaceModel {
    public properties: InterfaceProperty[] = [];
    public name: string;
    public exportModel: ExportModel;

    public setFromInterfaceExportModel( exportModel: ExportModel ) {
        this.exportModel = exportModel;
        this.name = exportModel.name;
        this.getPropertiesFromExportModel( exportModel );
    }

    protected getPropertiesFromExportModel( exportModel: ExportModel ) {
        const content = exportModel.content;
        const propertiesRegex = new RegExp(/{(.+)+}/, "gs");
        const propertyNamesRegex = new RegExp( /([a-zA-Z]+):/, "gs");
        const propertyTypesRegex = new RegExp( /([a-zA-Z]+);/, "gs");

        const propertiesPart = content.match( propertiesRegex );
        const propertyNames: string[] = content.match( propertyNamesRegex );
        const propertyTypes: string[] = content.match( propertyTypesRegex );
        console.log("PropertyPart", propertiesPart);
        console.log("PropertyNames", propertyNames);
        console.log("PropertyTypes", propertyTypes);
    }
}
