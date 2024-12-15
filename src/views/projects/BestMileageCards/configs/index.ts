import { isNotNullishValue } from '@/utils'

import type { CardConfig } from '../CreditCard'
import { cubeConfigs } from './cathay'
import { travelConfigs } from './hsbc'

export const defaultCardConfigs: CardConfig[] = [travelConfigs[2], cubeConfigs[4]].filter(
  isNotNullishValue,
)
