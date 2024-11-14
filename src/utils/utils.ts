export function redirect(url: `https://${string}`): void {
  window.open(url, '_self')
}
export function redirectNewWindow(url: `https://${string}`): void {
  window.open(url, '_blank')
}

export function roundNumber(num: number, digits: number): number {
  const pow = Math.pow(10, digits)
  return Math.round(num * pow) / pow
}

export function isNotNullishValue<T>(data: T | null | undefined): data is T {
  return data !== null && data !== undefined
}
