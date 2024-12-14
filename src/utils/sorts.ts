type ReturnSortEvent = 1 | -1 | 0
type SortEvent<T> = (aItem: T, bItem: T) => ReturnSortEvent

export function sortList<T extends string | number | boolean>(
  list: T[],
  direction: 'asc' | 'desc',
): T[] {
  let sortEvent: SortEvent<T>
  if (direction === 'asc') {
    sortEvent = (aItem: T, bItem: T): ReturnSortEvent => {
      return aItem > bItem ? 1 : aItem < bItem ? -1 : 0
    }
  } else {
    sortEvent = (aItem: T, bItem: T): ReturnSortEvent => {
      return aItem > bItem ? -1 : aItem < bItem ? 1 : 0
    }
  }
  return [...list].sort(sortEvent)
}

export function sortListByField<T extends object>(
  list: T[],
  sortBy: keyof T,
  direction: 'asc' | 'desc',
): T[] {
  let sortEvent: SortEvent<T>
  if (direction === 'asc') {
    sortEvent = (aItem: T, bItem: T): ReturnSortEvent => {
      const aValue = aItem[sortBy]
      const bValue = bItem[sortBy]
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
    }
  } else {
    sortEvent = (aItem: T, bItem: T): ReturnSortEvent => {
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
