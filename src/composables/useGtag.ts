import { GA_MEASUREMENT_ID } from '@/configs/ga'

interface UseGtag {
  readonly sendPageView: (path: string) => void
  readonly sendEvent: (action: string, params?: Record<string, unknown>) => void
}

// composables/useGtag.ts
export function useGtag(): UseGtag {
  let gtag: typeof window.gtag = window.gtag
  if (typeof gtag !== 'function') {
    gtag = initialGtag()
  }

  const sendPageView = (path: string): void => {
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
    })
  }

  const sendEvent = (action: string, params?: Record<string, unknown>): void => {
    gtag('event', action, params)
  }

  return { sendPageView, sendEvent }
}

function initialGtag(): Exclude<typeof window.gtag, undefined> {
  const script1 = document.createElement('script')
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  script1.async = true
  document.head.appendChild(script1)

  const script2 = document.createElement('script')
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `
  document.head.appendChild(script2)
  window.isFirstPageViewSent = true
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return window.gtag!
}
