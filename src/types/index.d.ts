export type * from "./SelectionMenu";

/**
 * Describes an object that is JSON-compatible, aka doesn't contain self- / circular references or non-primitive JS properties  
 * [Source](https://github.com/microsoft/TypeScript/issues/1897#issuecomment-338650717)
 */
export type JSONCompatible =  boolean | number | string | null | JSONArray | JSONMap;
interface JSONMap { [key: string]: JSONCompatible; }
interface JSONArray extends Array<JSONCompatible> {}

/** Describes a value that either is a string itself or has a `.toString()` method, meaning it can be converted to a string */
export type Stringifiable = string | {
    toString(): string;
}

/** Describes any class reference that is constructable/newable */
export type Newable<T> = { new(...args: any[]): T; };
/** Describes any value that is a constructable/newable class reference or a function (ES5 classes and abstract ES6 classes) */
export type AnyClass<T> = Newable<T> | (() => any & { prototype: T });
/** https://stackoverflow.com/a/50375286/8602926 */
export type UnionToIntersection<U> = (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never
/** https://stackoverflow.com/a/53955431/8602926 */
export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true
/** All type names usable in `typeof()` */
export type JSPrimitiveTypeName = "bigint" | "boolean" | "function" | "number" | "object" | "string" | "symbol" | "undefined";


export type UUIDType = "alphanumerical" | "binary" | "custom" | "decimal" | "hexadecimal";
