export function sortListByField<T extends object>(
  list: T[],
  sortBy: keyof T,
  direction: 'asc' | 'desc',
): T[] {
  type SortEvent = (aItem: T, bItem: T) => 1 | -1 | 0
  let sortEvent: SortEvent
  if (direction === 'asc') {
    sortEvent = (aItem: T, bItem: T): ReturnType<SortEvent> => {
      const aValue = aItem[sortBy]
      const bValue = bItem[sortBy]
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
    }
  } else {
    sortEvent = (aItem: T, bItem: T): ReturnType<SortEvent> => {
      const aValue = aItem[sortBy]
      const bValue = bItem[sortBy]
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  }
  return [...list].sort(sortEvent)
}

export function sortListByDate<T extends object, D extends keyof T>(
  list: T[],
  sortBy: D & (T[D] extends Date ? D : never), // 限制 D 的型別
  direction: 'asc' | 'desc',
): T[] {
  return sortListByField(list, sortBy, direction)
}
