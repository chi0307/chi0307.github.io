import typia from 'typia'

import { CustomStorageManager } from '@/utils/StorageManager'

import { type CardConfig, type Payment } from './CreditCard'
import { isShowRewardMilesType, type ShowRewardMilesType } from './types'

export const storageManager = new CustomStorageManager<{
  showRewardMilesType: ShowRewardMilesType
  commonPaymentMethods: Payment[]
  cardConfigs: CardConfig[]
}>(
  localStorage,
  {
    showRewardMilesType: isShowRewardMilesType,
    commonPaymentMethods: typia.createIs<Payment[]>(),
    cardConfigs: typia.createIs<CardConfig[]>(),
  },
  'bestMileageCards',
)
