import {BaseConverter} from "../../core/BaseConverter";
import {TypeHelper} from "../../helpers/TypeHelper";
import {AvroSchemaInterface} from "../../interfaces/AvroSchemaInterface";
import {RecordConverter} from "./RecordConverter";

export class AvroSchemaConverter extends BaseConverter {

    public async convert(avroSchema: AvroSchemaInterface): Promise<string> {
        let content: string = "";
        const recordConverter = new RecordConverter();

        if (TypeHelper.isRecordType(avroSchema)) {
            recordConverter.convertRecord(avroSchema);
            content = recordConverter.joinExports();
        }

        if (TypeHelper.isRecordType(avroSchema) === false) {
            recordConverter.convertType(avroSchema);
            content = recordConverter.joinExports();
        }

        this.exports = recordConverter.exports;

        return content;
    }
}
