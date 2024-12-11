import typia from 'typia'

import { CreditCard } from './modules/Card'
import { Plan } from './modules/Plan'
import type { CardConfig } from './modules/type'

export function createCard({
  name,
  blackList,
  cardUrl,
  plans: planConfigs,
}: CardConfig): CreditCard {
  const plans: Plan[] = planConfigs.map(({ name, rewards }) => new Plan(name, rewards))
  return new CreditCard({ name, plans, blackList, cardUrl })
}

export const isCardConfig = typia.createIs<CardConfig>()
