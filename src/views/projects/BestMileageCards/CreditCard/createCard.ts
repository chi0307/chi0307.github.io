import { CreditCard } from './modules/Card'
import { Plan } from './modules/Plan'
import { rewardFactory } from './modules/Reward'
import type { CardConfig } from './modules/type'

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
