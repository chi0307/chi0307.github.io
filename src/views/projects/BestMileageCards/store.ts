import { defineStore } from 'pinia'
import { computed, onMounted, readonly, ref } from 'vue'

import type { UUID } from '@/types'
import { generateUuid, removeDuplicates } from '@/utils'
import { sortList } from '@/utils/sorts'

import { defaultCardConfigs } from './configs'
import { defaultStoreAliases, type StoreAliases } from './configs/storeAliases'
import { createCard, CreditCard, Payment, type CardConfig } from './CreditCard'
import type { ConditionType } from './CreditCard/modules/type'
import { type ShowRewardMilesType } from './types'
import { aliasTypeList, storageManager, type AliasType } from './utils'

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
  const storeList = computed(() => {
    return sortList(removeDuplicates(cards.value.flatMap((card) => card.storeList)), 'asc')
  })

  const conditionTypes = ref<ConditionType[]>(storageManager.get('conditionTypes') ?? [])
  function updateConditionTypes([...types]: readonly ConditionType[]): void {
    conditionTypes.value = types
    storageManager.set('conditionTypes', types)
  }

  const aliasType = ref<AliasType>(storageManager.get('aliasType') ?? 'default')
  function updateAliasType(type: AliasType): void {
    if (aliasTypeList.includes(type)) {
      aliasType.value = type
      storageManager.set('aliasType', type)
    }
  }

  const customAliases = ref(new Map<string, string[]>(storageManager.get('customAliases') ?? []))
  function updateCustomAliases(store: string, aliases: string[]): void {
    if (aliases.length === 0) {
      customAliases.value.delete(store)
    } else {
      customAliases.value.set(store, aliases)
    }
    storageManager.set('customAliases', [...customAliases.value])
  }
  function updateAllCustomAliases(list: StoreAliases[]): void {
    customAliases.value = new Map(list)
    storageManager.set('customAliases', list)
  }

  const storeAliases = computed(() => {
    const list: [string, readonly string[]][] = []
    if (['default', 'additional'].includes(aliasType.value)) {
      list.push(...defaultStoreAliases)
    }
    if (['additional', 'custom'].includes(aliasType.value)) {
      list.push(...customAliases.value)
    }

    const storeAliasesMap = new Map<string, Set<string>>()
    for (const [store, aliases] of list) {
      const item = storeAliasesMap.get(store) ?? new Set<string>()
      for (const alias of aliases) {
        item.add(alias)
      }
      storeAliasesMap.set(store, item)
    }
    return storeAliasesMap
  })

  return {
    showRewardMilesType: readonly(showRewardMilesType),
    updateShowRewardMilesType,
    commonPaymentMethods: readonly(commonPaymentMethods),
    updateCommonPaymentMethods,
    cards,
    updateCardConfig,
    storeList: readonly(storeList),
    conditionTypes: readonly(conditionTypes),
    updateConditionTypes,
    aliasType: readonly(aliasType),
    storeAliases,
    updateAliasType,
    customAliases: readonly(customAliases),
    updateCustomAliases,
    updateAllCustomAliases,
  }
})
