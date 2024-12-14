import { CustomStorageManager } from '@/utils/StorageManager'

import { isShowRewardMilesType, type ShowRewardMilesType } from './types'

export const storageManager = new CustomStorageManager<{
  showRewardMilesType: ShowRewardMilesType
}>(
  localStorage,
  {
    showRewardMilesType: isShowRewardMilesType,
  },
  'bestMileageCards',
)
