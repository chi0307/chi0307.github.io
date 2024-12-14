import typia from 'typia'

import { CustomStorageManager } from '@/utils/StorageManager'
import type { Payment } from '@/views/projects/BestMileageCards/CreditCard'

import { isShowRewardMilesType, type ShowRewardMilesType } from './types'

export const storageManager = new CustomStorageManager<{
  showRewardMilesType: ShowRewardMilesType
  commonPaymentMethods: Payment[]
}>(
  localStorage,
  {
    showRewardMilesType: isShowRewardMilesType,
    commonPaymentMethods: typia.createIs<Payment[]>(),
  },
  'bestMileageCards',
)
