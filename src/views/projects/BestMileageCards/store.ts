import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'

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

  return {
    showRewardMilesType: readonly(showRewardMilesType),
    updateShowRewardMilesType,
  }
})
