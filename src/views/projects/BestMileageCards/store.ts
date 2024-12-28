import { defineStore } from 'pinia'
import { computed, onMounted, readonly, ref } from 'vue'

import type { UUID } from '@/types'
import { generateUuid, removeDuplicates } from '@/utils'
import { sortList } from '@/utils/sorts'

import { exampleCardConfigs } from './configs/defaultCards'
import { defaultStoreAliases, type StoreAliases } from './configs/storeAliases'
import { createCard, CreditCard, Payment, type CardConfig } from './CreditCard'
import type { ConditionType } from './CreditCard/modules/type'
import { aliasTypeList, storageManager, type AliasType } from './utils'

export interface DialogItem {
  text: string
  events: {
    text: string
    event?: () => Promise<void> | void
    class?: string
  }[]
}

export const useBestMileageCardsStore = defineStore('BestMileageCards', () => {
  const dialog = ref<DialogItem | null>(null)
  function openDialog(item: DialogItem): void {
    dialog.value = item
  }
  function closeDialog(): void {
    dialog.value = null
  }

  onMounted(() => {
    const configs = storageManager.get('cardConfigs') ?? []
    cardConfigs.value = new Map(configs.map((config) => [generateUuid(), config]))
  })

  const onlyShowCurrentPlan = ref<boolean>(storageManager.get('onlyShowCurrentPlan') ?? false)
  function updateOnlyShowCurrentPlan(status: boolean): void {
    storageManager.set('onlyShowCurrentPlan', status)
    onlyShowCurrentPlan.value = status
  }

  const onlyShowCurrentPointExchange = ref<boolean>(
    storageManager.get('onlyShowCurrentPointExchange') ?? false,
  )
  function updateOnlyShowCurrentPointExchange(status: boolean): void {
    storageManager.set('onlyShowCurrentPointExchange', status)
    onlyShowCurrentPointExchange.value = status
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
  /** 使用者的卡片資料 */
  const cards = computed((): Map<UUID, CreditCard> => {
    return new Map([...cardConfigs.value.entries()].map(([id, config]) => [id, createCard(config)]))
  })
  /** 要顯示的卡片資料，當沒有卡片資料的時候會顯示預設值 */
  const showCards = computed((): CreditCard[] => {
    if (cards.value.size === 0) {
      return exampleCardConfigs.map((config) => createCard(config))
    }
    return [...cards.value.values()]
  })
  function updateCardConfig(id: UUID, config: CardConfig): void {
    cardConfigs.value.set(id, config)
    storageManager.set('cardConfigs', [...cardConfigs.value.values()])
  }
  function deleteCardConfig(id: UUID): void {
    cardConfigs.value.delete(id)
    storageManager.set('cardConfigs', [...cardConfigs.value.values()])
  }
  function updatePlan(id: UUID, planId: UUID): boolean {
    const config = cardConfigs.value.get(id)
    if (config === undefined) {
      return false
    }
    try {
      cardConfigs.value.set(id, { ...config, selectedPlanId: planId })
    } catch {
      return false
    }
    storageManager.set('cardConfigs', [...cardConfigs.value.values()])
    return true
  }
  function updatePointExchange(id: UUID, pointExchangeId: UUID): boolean {
    const config = cardConfigs.value.get(id)
    if (config === undefined) {
      return false
    }
    try {
      cardConfigs.value.set(id, { ...config, selectedPointExchangeId: pointExchangeId })
    } catch {
      return false
    }
    storageManager.set('cardConfigs', [...cardConfigs.value.values()])
    return true
  }
  const storeList = computed(() => {
    return sortList(removeDuplicates(showCards.value.flatMap((card) => card.storeList)), 'asc')
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
    dialog: readonly(dialog),
    openDialog,
    closeDialog,
    onlyShowCurrentPlan: readonly(onlyShowCurrentPlan),
    updateOnlyShowCurrentPlan,
    onlyShowCurrentPointExchange: readonly(onlyShowCurrentPointExchange),
    updateOnlyShowCurrentPointExchange,
    commonPaymentMethods: readonly(commonPaymentMethods),
    updateCommonPaymentMethods,
    cardConfigs: readonly(cardConfigs),
    cards,
    showCards,
    updateCardConfig,
    deleteCardConfig,
    updatePlan,
    updatePointExchange,
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