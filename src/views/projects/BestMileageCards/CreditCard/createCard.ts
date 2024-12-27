import typia from 'typia'

import type { UUID } from '@/types'
import { PointExchangeStrategy } from '@/views/projects/BestMileageCards/CreditCard/modules/PointExchange'

import { CreditCard } from './modules/Card'
import { Plan } from './modules/Plan'
import { rewardStrategyFactory } from './modules/Reward'
import type { CardConfig } from './modules/type'

export function createCard({
  name,
  description,
  storeBlackList,
  paymentBlackList,
  cardUrl,
  plans: planConfigs,
  updateAt,
  pointExchanges,
  selectedPlanId,
  selectedPointExchangeId,
}: CardConfig): CreditCard {
  const plans = new Map<UUID, Plan>(
    planConfigs.map(({ id, config: { name, description, condition, rewards } }) => [
      id,
      new Plan(
        name,
        description ?? null,
        condition ?? null,
        rewards.map(
          ({
            stores,
            payments,
            transactionType,
            rewardStrategy,
            paymentBlackList,
            storeBlackList,
            condition,
          }) => ({
            rewardStrategy: rewardStrategyFactory(rewardStrategy),
            stores: new Set(stores),
            storeBlackList: new Set(storeBlackList),
            payments: new Set(payments),
            paymentBlackList: new Set(paymentBlackList),
            transactionType: transactionType ?? null,
            condition: condition ?? null,
          }),
        ),
      ),
    ]),
  )
  return new CreditCard({
    name,
    description: description ?? null,
    plans,
    storeBlackList: new Set(storeBlackList),
    paymentBlackList: new Set(paymentBlackList),
    cardUrl,
    updateAt: new Date(updateAt),
    selectedPlanId: selectedPlanId ?? null,
    selectedPointExchangeId: selectedPointExchangeId ?? null,
    pointExchanges: new Map(
      pointExchanges.map(({ id, config }) => [id, new PointExchangeStrategy(config)]),
    ),
  })
}

export const isCardConfig = typia.createIs<CardConfig>()
