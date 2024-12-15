import { defineStore } from 'pinia'
import { computed, onMounted, readonly, ref } from 'vue'

import type { UUID } from '@/types'
import { generateUuid } from '@/utils'
import { defaultCardConfigs } from '@/views/projects/BestMileageCards/configs'
import type { ConditionType } from '@/views/projects/BestMileageCards/CreditCard/modules/type'

import { createCard, CreditCard, Payment, type CardConfig } from './CreditCard'
import { type ShowRewardMilesType } from './types'
import { storageManager } from './utils'

export const useBestMileageCardsStore = defineStore('BestMileageCards', () => {
  onMounted(() => {
    const configs = storageManager.get('cardConfigs') ?? []
    cardConfigs.value = new Map(configs.map((config) => [generateUuid(), config]))
  })

  const showRewardMilesType = ref<ShowRewardMilesType>(
    storageManager.get('showRewardMilesType') ?? 'AllPlanRewardMiles',
  )
  function updateShowRewardMilesType(type: ShowRewardMilesType): void {
    storageManager.set('showRewardMilesType', type)
    showRewardMilesType.value = type
  }

  const commonPaymentMethods = ref<Payment[]>(
    storageManager.get('commonPaymentMethods') ?? ['信用卡', 'Apple Pay', 'Line Pay', '街口支付'],
  )
  function updateCommonPaymentMethods([...payments]: readonly Payment[]): void {
    payments = [...new Set(payments)]
    storageManager.set('commonPaymentMethods', payments)
    commonPaymentMethods.value = payments
  }

  // TODO: 有空要再確認看看有沒有必要做 cache 避免浪費效能
  const cardConfigs = ref(new Map<UUID, CardConfig>())
  const cards = computed((): CreditCard[] => {
    const cards =
      cardConfigs.value.size === 0 ? defaultCardConfigs : [...cardConfigs.value.values()]
    return cards.map((config) => createCard(config))
  })
  function updateCardConfig(id: UUID, config: CardConfig): void {
    cardConfigs.value.set(id, config)
    storageManager.set('cardConfigs', [...cardConfigs.value.values()])
  }

  const conditionTypes = ref<ConditionType[]>(storageManager.get('conditionTypes') ?? [])
  function updateConditionTypes([...types]: readonly ConditionType[]): void {
    conditionTypes.value = types
    storageManager.set('conditionTypes', types)
  }

  return {
    showRewardMilesType: readonly(showRewardMilesType),
    updateShowRewardMilesType,
    commonPaymentMethods: readonly(commonPaymentMethods),
    updateCommonPaymentMethods,
    cards,
    updateCardConfig,
    conditionTypes: readonly(conditionTypes),
    updateConditionTypes,
  }
})
