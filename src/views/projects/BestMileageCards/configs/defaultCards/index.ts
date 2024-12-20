import type { CardConfig } from '../../CreditCard'
import { cubeConfigs, exampleCubeConfig } from './cathay'
import { exampleUniCardConfig, starLuxConfigs, uniCardConfigs } from './esunbank'
import { exampleTravelConfig, travelConfigs } from './hsbc'

export const exampleCardConfigs: CardConfig[] = [
  exampleCubeConfig,
  exampleTravelConfig,
  exampleUniCardConfig,
]

export const defaultCardConfigs: CardConfig[] = [
  ...cubeConfigs,
  ...travelConfigs,
  ...starLuxConfigs,
  ...uniCardConfigs,
]
