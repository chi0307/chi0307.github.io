import typia from 'typia'

import { CustomStorageManager } from '@/utils/StorageManager'

import { isStoreAliasesList, type StoreAliases } from './configs/storeAliases'
import { type CardConfig, type ConditionType, type Payment } from './CreditCard'

export const storageManager = new CustomStorageManager<{
  onlyShowCurrentPlan: boolean
  onlyShowCurrentPointExchange: boolean
  commonPaymentMethods: Payment[]
  cardConfigs: CardConfig[]
  conditionTypes: ConditionType[]
  aliasType: AliasType
  customAliases: StoreAliases[]
}>(
  localStorage,
  {
    onlyShowCurrentPlan: typia.createIs<boolean>(),
    onlyShowCurrentPointExchange: typia.createIs<boolean>(),
    commonPaymentMethods: typia.createIs<Payment[]>(),
    cardConfigs: typia.createIs<CardConfig[]>(),
    conditionTypes: typia.createIs<ConditionType[]>(),
    aliasType: typia.createIs<AliasType>(),
    customAliases: isStoreAliasesList,
  },
  'bestMileageCards',
)

export const aliasTypeList = ['default', 'additional', 'custom'] as const
export type AliasType = (typeof aliasTypeList)[number]
