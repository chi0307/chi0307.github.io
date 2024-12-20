import { isNotNullishValue } from '@/utils'

import type { CardConfig } from '../../CreditCard'
import { cubeConfigs } from './cathay'
import { starLuxConfigs, uniCardConfigs } from './esunbank'
import { travelConfigs } from './hsbc'

export const defaultCardConfigs: CardConfig[] = [
  travelConfigs[2],
  cubeConfigs[4],
  starLuxConfigs[0],
  uniCardConfigs[0],
].filter(isNotNullishValue)
