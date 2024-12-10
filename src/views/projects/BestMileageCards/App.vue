<template>
  <div>
    {{ inputStores }}
    <div v-for="(items, index) of list" :key="index">
      <div v-for="(item, index2) of items" :key="index2">
        {{ item.planName }}, {{ item.name }}, {{ item.miles }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'

import { rewardFactory, CreditCard, Plan, type TransactionInfo } from './CreditCard'

const cards = ref<CreditCard[]>([])

const inputStores = computed((): string[] => {
  return cards.value.flatMap((card) => card.inputStores)
})

const list = computed(() => {
  const paymentInfo: TransactionInfo = {
    amount: 200,
    store: 'momo',
    payment: 'Line Pay',
    transactionType: 'Domestic',
  }
  return cards.value.map((card) => card.getAllPlanRewardMiles(paymentInfo))
})

onMounted(() => {
  cards.value = [createHsbc(), createCube()]
})

function createHsbc(): CreditCard {
  const plans: Plan[] = [
    new Plan('基本回饋', [
      {
        reward: rewardFactory({
          type: 'DirectMilesReward',
          name: '國外消費',
          spendingPerMile: 10,
        }),
        stores: [],
        payments: [],
        transactionType: 'Foreign',
      },
      {
        reward: rewardFactory({
          type: 'DirectMilesReward',
          name: '國內消費',
          spendingPerMile: 20,
        }),
        stores: [],
        payments: [],
        transactionType: 'Domestic',
      },
    ]),
  ]
  const hsbc = new CreditCard({
    name: '匯豐旅人卡',
    plans,
    cardUrl: null,
    blackList: [],
  })
  return hsbc
}

function createCube(): CreditCard {
  const plans: Plan[] = [
    new Plan('集精選', [
      {
        reward: rewardFactory({
          type: 'RoundedPointsRewardPercentage',
          name: '基本回饋',
          pointBackRate: 2,
          pointsPerMile: 300,
          milesPerUnit: 1000,
        }),
        stores: ['台灣中油', '全聯', '7-11', '全家'],
        payments: [],
        transactionType: null,
      },
    ]),
    new Plan('來支付', [
      {
        reward: rewardFactory({
          type: 'RoundedPointsRewardPercentage',
          name: '基本回饋',
          pointBackRate: 2,
          pointsPerMile: 300,
          milesPerUnit: 1000,
        }),
        stores: [],
        payments: ['Line Pay'],
        transactionType: null,
      },
    ]),
    new Plan('玩數位', [
      {
        reward: rewardFactory({
          type: 'RoundedPointsRewardPercentage',
          name: '基本回饋',
          pointBackRate: 3,
          pointsPerMile: 300,
          milesPerUnit: 1000,
        }),
        stores: ['PChome', '蝦皮購物', '博客來', 'momo'],
        payments: [],
        transactionType: null,
      },
    ]),
    new Plan('樂饗購', [
      {
        reward: rewardFactory({
          type: 'RoundedPointsRewardPercentage',
          name: '基本回饋',
          pointBackRate: 3,
          pointsPerMile: 300,
          milesPerUnit: 1000,
        }),
        stores: [
          'SOGO百貨',
          '太平洋百貨',
          '新光三越',
          'Uber Eats',
          'foodpanda',
          '康是美',
          '屈臣氏',
        ],
        payments: [],
        transactionType: null,
      },
    ]),
  ]
  const cube = new CreditCard({
    name: 'Cube 卡',
    plans,
    cardUrl: null,
    blackList: [],
  })
  return cube
}
</script>
