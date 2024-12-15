import typia from 'typia'

import { CustomStorageManager } from '@/utils/StorageManager'

import type { StoreAliases } from './configs/storeAliases'
import { type CardConfig, type ConditionType, type Payment } from './CreditCard'
import { isShowRewardMilesType, type ShowRewardMilesType } from './types'

export const storageManager = new CustomStorageManager<{
  showRewardMilesType: ShowRewardMilesType
  commonPaymentMethods: Payment[]
  cardConfigs: CardConfig[]
  conditionTypes: ConditionType[]
  aliasType: AliasType
  customAliases: StoreAliases
}>(
  localStorage,
  {
    showRewardMilesType: isShowRewardMilesType,
    commonPaymentMethods: typia.createIs<Payment[]>(),
    cardConfigs: typia.createIs<CardConfig[]>(),
    conditionTypes: typia.createIs<ConditionType[]>(),
    aliasType: typia.createIs<AliasType>(),
    customAliases: typia.createIs<StoreAliases>(),
  },
  'bestMileageCards',
)

export const aliasTypeList = ['default', 'additional', 'custom'] as const
export type AliasType = (typeof aliasTypeList)[number]
