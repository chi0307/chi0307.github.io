import type { CardConfig } from '../../CreditCard'
import { cubeConfigs, evaConfigs, exampleCubeConfig, exampleEvaConfig } from './cathay'
import { exampleUniCardConfig, starLuxConfigs, uniCardConfigs } from './esunbank'
import { exampleTravelConfig, travelConfigs } from './hsbc'

export const exampleCardConfigs: CardConfig[] = [
  exampleEvaConfig,
  exampleCubeConfig,
  exampleTravelConfig,
  exampleUniCardConfig,
]

export const defaultCardConfigs: CardConfig[] = [
  ...evaConfigs,
  ...cubeConfigs,
  ...travelConfigs,
  ...starLuxConfigs,
  ...uniCardConfigs,
]
