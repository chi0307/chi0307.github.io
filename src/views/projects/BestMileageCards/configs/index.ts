import type { CardConfig } from '../CreditCard'
import { cubeConfigs } from './cathay'
import { travelConfigs } from './hsbc'

export const defaultCardConfigs: CardConfig[] = [...travelConfigs, ...cubeConfigs]
