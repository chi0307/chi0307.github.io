import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'

import { Payment } from './CreditCard'
import { defaultRewardMilesType, type ShowRewardMilesType } from './types'
import { storageManager } from './utils'

export const useBestMileageCardsStore = defineStore('BestMileageCards', () => {
  const showRewardMilesType = ref<ShowRewardMilesType>(
    storageManager.get('showRewardMilesType') ?? defaultRewardMilesType,
  )
  function updateShowRewardMilesType(type: ShowRewardMilesType): void {
    storageManager.set('showRewardMilesType', type)
    showRewardMilesType.value = type
  }

  const commonPaymentMethods = ref<Payment[]>(
    storageManager.get('commonPaymentMethods') ?? ['信用卡', 'Apple Pay', 'Line Pay', '街口支付'],
  )
  function updateCommonPaymentMethods(payments: Payment[]): void {
    payments = [...new Set(payments)]
    storageManager.set('commonPaymentMethods', payments)
    commonPaymentMethods.value = payments
  }

  return {
    showRewardMilesType: readonly(showRewardMilesType),
    updateShowRewardMilesType,
    commonPaymentMethods: readonly(commonPaymentMethods),
    updateCommonPaymentMethods,
  }
})
