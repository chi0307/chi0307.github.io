import { CreditCard } from './card'
import { Plan } from './plan'
import { rewardFactory } from './rewards'
import type { CardConfig } from './type'

export function createCard(config: CardConfig): CreditCard {
  const plans: Plan[] = config.plans.map(
    ({ name, rewards }) =>
      new Plan(
        name,
        rewards.map(({ reward, stores, payments, transactionType }) => ({
          reward: rewardFactory(reward),
          stores,
          payments,
          transactionType,
        })),
      ),
  )
  return new CreditCard({
    ...config.card,
    plans,
  })
}
