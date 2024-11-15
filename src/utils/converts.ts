export type ConvertData<T, I, O> = T extends I
  ? O
  : T extends I | null
    ? O | null
    : T extends I | undefined
      ? O | undefined
      : T extends I | null | undefined
        ? O | null | undefined
        : T

export function convertToDate<T extends string | null | undefined>(
  data: T
): ConvertData<T, string, Date> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
  return (typeof data === 'string' ? new Date(data) : data) as any
}

export function convertField<T extends object, K extends keyof T, V>(
  list: T[],
  field: K,
  convertToAny: (value: T[K]) => V
): (Omit<T, K> & Record<K, V>)[] {
  return list.map((item) => {
    const newItem = { ...item, [field]: convertToAny(item[field]) } as Omit<T, K> & Record<K, V>
    return newItem
  })
}
