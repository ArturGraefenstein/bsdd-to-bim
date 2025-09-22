import { v5 as uuidv5 } from "uuid";
const MY_NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"; // example
/**
 * Creates deterministic uuid based on string
 * @param input
 */
export function deterministicUUID(input: string): string {
    return uuidv5(input, MY_NAMESPACE);
}