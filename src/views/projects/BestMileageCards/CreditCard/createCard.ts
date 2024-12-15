import typia from 'typia'

import type { UUID } from '@/types'
import { generateUuid } from '@/utils'

import { CreditCard } from './modules/Card'
import { Plan } from './modules/Plan'
import { rewardFactory } from './modules/Reward'
import type { CardConfig } from './modules/type'

export function createCard({
  name,
  description,
  storeBlackList,
  paymentBlackList,
  cardUrl,
  plans: planConfigs,
  updateAt,
  airLines,
}: CardConfig): CreditCard {
  const plans = new Map<UUID, Plan>(
    planConfigs.map(({ name, rewards }) => [
      generateUuid(),
      new Plan(
        name,
        rewards.map(
          ({ stores, payments, transactionType, reward, paymentBlackList, storeBlackList }) => ({
            reward: rewardFactory(reward),
            stores: new Set(stores),
            storeBlackList: new Set(storeBlackList),
            payments: new Set(payments),
            paymentBlackList: new Set(paymentBlackList),
            transactionType,
          }),
        ),
      ),
    ]),
  )
  return new CreditCard({
    name,
    description,
    plans,
    storeBlackList: new Set(storeBlackList),
    paymentBlackList: new Set(paymentBlackList),
    cardUrl,
    updateAt: new Date(updateAt),
    airLines,
  })
}

export const isCardConfig = typia.createIs<CardConfig>()
