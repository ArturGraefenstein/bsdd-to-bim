import type {BSSDProperty} from "./bsdd-property.types.js";
import type {BSDDClass} from "./bsdd-class.types.js";


export type BSSDDictionary = {
    Classes: BSDDClass[],
    Properties: BSSDProperty[],
}