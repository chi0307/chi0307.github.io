<template>
  <div></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import {
  rewardFactory,
  type RewardType,
  CreditCard,
  Plan,
  type TransactionInfo,
} from './CreditCard'

const cards = ref<CreditCard[]>([])

onMounted(() => {
  cards.value = [createHsbc(), createCube()]
  const paymentInfo: TransactionInfo = {
    amount: 200,
    store: 'Apple Store',
    payment: 'Apple Pay',
  }
  for (const card of cards.value) {
    card.currentPlanRewardMiles(paymentInfo)
  }
})

function createHsbc(): CreditCard {
  const type: RewardType = 'DirectMilesReward'
  const plan = new Plan('基本回饋', [
    {
      reward: rewardFactory({
        type,
        name: '國外消費',
        spendingPerMile: 10,
      }),
      stores: [],
      payments: [],
      transactionType: 'Foreign',
    },
    {
      reward: rewardFactory({
        type,
        name: '國內消費',
        spendingPerMile: 20,
      }),
      stores: [],
      payments: [],
      transactionType: 'Domestic',
    },
  ])
  const hsbc = new CreditCard({
    name: '匯豐旅人卡',
    plans: [plan],
    cardUrl: null,
    blackList: [],
  })
  return hsbc
}

function createCube(): CreditCard {
  const type: RewardType = 'RoundedPointsRewardPercentage'
  const plan1 = new Plan('集精選', [
    {
      reward: rewardFactory({
        type,
        name: '基本回饋',
        pointBackRate: 2,
        pointsPerMile: 300,
        milesPerUnit: 1000,
      }),
      stores: ['台灣中油', '全聯'],
      payments: [],
      transactionType: null,
    },
  ])
  const plan2 = new Plan('來支付', [
    {
      reward: rewardFactory({
        type,
        name: '基本回饋',
        pointBackRate: 2,
        pointsPerMile: 300,
        milesPerUnit: 1000,
      }),
      stores: [],
      payments: ['Line Pay'],
      transactionType: null,
    },
  ])
  const cube = new CreditCard({
    name: 'Cube 卡',
    plans: [plan1, plan2],
    cardUrl: null,
    blackList: [],
  })
  return cube
}
</script>
