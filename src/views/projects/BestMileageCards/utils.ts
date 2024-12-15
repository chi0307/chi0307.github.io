import typia from 'typia'

import { CustomStorageManager } from '@/utils/StorageManager'

import { type CardConfig, type ConditionType, type Payment } from './CreditCard'
import { isShowRewardMilesType, type ShowRewardMilesType } from './types'

export const storageManager = new CustomStorageManager<{
  showRewardMilesType: ShowRewardMilesType
  commonPaymentMethods: Payment[]
  cardConfigs: CardConfig[]
  conditionTypes: ConditionType[]
}>(
  localStorage,
  {
    showRewardMilesType: isShowRewardMilesType,
    commonPaymentMethods: typia.createIs<Payment[]>(),
    cardConfigs: typia.createIs<CardConfig[]>(),
    conditionTypes: typia.createIs<ConditionType[]>(),
  },
  'bestMileageCards',
)
