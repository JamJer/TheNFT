export type NonNullPrimitves = number | string | boolean;
export type Dictionary<T = NonNullPrimitves> = { [key: string]: T}