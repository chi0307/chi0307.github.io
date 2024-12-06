<template>
  <div></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { CreditCard, Plan, rewardFactory, RewardRule, type PaymentInfo } from './CreditCard'

const cards = ref<CreditCard[]>([])

onMounted(() => {
  cards.value = [createHsbc(), createCube()]
  const paymentInfo: PaymentInfo = {
    amount: 200,
    store: 'Apple Store',
    payment: 'Apple Pay',
  }
  for (const card of cards.value) {
    card.currentPlanRewardMiles(paymentInfo)
  }
})

function createHsbc(): CreditCard {
  const rewardRules: RewardRule[] = [
    new RewardRule({
      reward: rewardFactory({ type: 'DirectMilesReward', name: '國內消費', spendingPerMile: 20 }),
    }),
  ]
  const plan = new Plan('基本回饋', rewardRules)
  const hsbc = new CreditCard({
    name: '匯豐旅人卡',
    plans: [plan],
  })
  return hsbc
}

function createCube(): CreditCard {
  const rewardRules: RewardRule[] = [
    new RewardRule({
      reward: rewardFactory({
        type: 'RoundedPointsRewardPercentage',
        name: '集精選',
        pointBackRate: 2,
        pointsPerMile: 300,
        milesPerUnit: 1000,
      }),
      stores: ['台灣中油', '全聯'],
    }),
    new RewardRule({
      reward: rewardFactory({
        type: 'RoundedPointsRewardPercentage',
        name: '來支付',
        pointBackRate: 2,
        pointsPerMile: 300,
        milesPerUnit: 1000,
      }),
      payments: ['Line Pay'],
    }),
  ]
  const plans = new Plan('集精選')
}
</script>
