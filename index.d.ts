import type { TypedArray as TA } from "which-typed-array";

declare namespace isTypedArray {
    type TypedArray = TA;
}

declare function isTypedArray(value: unknown): value is TA;

export = isTypedArray;
