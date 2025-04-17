/// <reference types="vite/client" />

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    /**
     * 因為同時存在 github page 跟 vue SPA
     *
     * 所以有可能會導致重複送 page view 資料 (initial 的時候跟 vue afterEach 的時候)
     *
     * 這個 flag 是為了避免重複送 page view 資料
     *
     * 這個 flag 會在 main.ts 的時候設置為 true
     *
     * 當 router.afterEach 的時候會檢查這個 flag
     *
     * 如果是 true 就不會送 page view 資料
     */
    isFirstPageViewSent?: boolean
  }
}

export {}
