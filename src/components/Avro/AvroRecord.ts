import { Serializable } from "./serde/Serializable";

export interface AvroRecord extends Serializable {
    schema(): object;
}
