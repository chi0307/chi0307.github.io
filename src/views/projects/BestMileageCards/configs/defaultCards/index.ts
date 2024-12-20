import type { CardConfig } from '../../CreditCard'
import { defaultCubeConfig } from './cathay'
import { defaultUniCardConfig } from './esunbank'
import { defaultTravelConfig } from './hsbc'

export const defaultCardConfigs: CardConfig[] = [
  defaultCubeConfig,
  defaultTravelConfig,
  defaultUniCardConfig,
]
