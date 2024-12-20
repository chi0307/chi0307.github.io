/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair, @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, security/detect-object-injection, @typescript-eslint/no-unsafe-member-access */
type DeepWritable<T> = T extends Function
  ? T
  : T extends readonly (infer U)[]
    ? DeepWritable<U>[]
    : T extends ReadonlyMap<infer K, infer V>
      ? Map<DeepWritable<K>, DeepWritable<V>>
      : T extends ReadonlySet<infer U>
        ? Set<DeepWritable<U>>
        : T extends object
          ? { -readonly [K in keyof T]: DeepWritable<T[K]> }
          : T

export function cloneDeep<T>(item: T): DeepWritable<T> {
  if (item === null || typeof item !== 'object') {
    return item as DeepWritable<T> // 基本類型直接返回
  }

  if (Array.isArray(item)) {
    // 處理 ReadonlyArray 或 Array 型別
    return item.map((i) => cloneDeep(i)) as DeepWritable<T>
  }

  if (item instanceof Map) {
    // 處理 ReadonlyMap 或 Map 型別
    return new Map(
      Array.from(item.entries()).map(([key, value]) => [cloneDeep(key), cloneDeep(value)]),
    ) as DeepWritable<T>
  }

  if (item instanceof Set) {
    // 處理 ReadonlySet 或 Set 型別
    return new Set(Array.from(item.values()).map((value) => cloneDeep(value))) as DeepWritable<T>
  }

  if (item instanceof Date) {
    // 處理 Date 型別
    return new Date(item.getTime()) as DeepWritable<T>
  }

  if (item instanceof RegExp) {
    // 處理 RegExp 型別
    return new RegExp(item.source, item.flags) as DeepWritable<T>
  }

  // 處理普通物件，遞迴拷貝每個屬性
  const result: any = {}
  Object.keys(item).forEach((key) => {
    result[key] = cloneDeep((item as any)[key])
  })

  return result as DeepWritable<T>
}
