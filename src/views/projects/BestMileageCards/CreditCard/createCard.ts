import typia from 'typia'

import { CreditCard } from './modules/Card'
import { Plan } from './modules/Plan'
import type { CardConfig } from './modules/type'

export function createCard(config: CardConfig): CreditCard {
  const plans: Plan[] = config.plans.map(({ name, rewards }) => new Plan(name, rewards))
  return new CreditCard({
    ...config.card,
    plans,
  })
}

export const isCardConfig = typia.createIs<CardConfig>()
