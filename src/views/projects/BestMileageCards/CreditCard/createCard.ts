import typia from 'typia'

import { CreditCard } from './modules/Card'
import { Plan } from './modules/Plan'
import { rewardFactory } from './modules/Reward'
import type { CardConfig } from './modules/type'

export function createCard({
  name,
  blackList,
  cardUrl,
  plans: planConfigs,
  updateAt,
  airLines,
}: CardConfig): CreditCard {
  const plans: Plan[] = planConfigs.map(
    ({ name, rewards }) =>
      new Plan(
        name,
        rewards.map(({ stores, payments, transactionType, reward }) => ({
          reward: rewardFactory(reward),
          transactionType,
          stores: new Set(stores),
          payments: new Set(payments),
        })),
      ),
  )
  return new CreditCard({
    name,
    plans,
    blackList: new Set(blackList),
    cardUrl,
    updateAt: new Date(updateAt),
    airLines,
  })
}

export const isCardConfig = typia.createIs<CardConfig>()
