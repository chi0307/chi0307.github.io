<template>
  <div>
    {{ inputStores }}
    <div v-for="(items, index) of list" :key="index">
      <div v-for="(item, index2) of items" :key="index2">
        {{ item.planName }}, {{ item.name }}, {{ item.miles }}, 支付方式:
        {{ item.payments.join(', ') }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'

import { CreditCard, type TransactionInfo, createCard } from './CreditCard'

const cards = ref<CreditCard[]>([])

const inputStores = computed((): string[] => {
  return cards.value.flatMap((card) => card.inputStores)
})

const list = computed(() => {
  const paymentInfo: TransactionInfo = {
    amount: 200,
    transactionStore: 'momo',
    acceptedPayments: ['Line Pay', 'Apple Pay'],
    transactionAttributesType: 'Domestic',
  }
  return cards.value.map((card) => card.getAllPlanRewardMiles(paymentInfo))
})

onMounted(() => {
  cards.value = [createHsbc(), createCube()]
})

function createHsbc(): CreditCard {
  return createCard({
    name: '匯豐旅人卡',
    cardUrl: null,
    blackList: [],
    plans: [
      {
        name: '基本回饋',
        rewards: [
          {
            reward: {
              type: 'DirectMilesReward',
              name: '國外消費',
              spendingPerMile: 10,
            },
            stores: [],
            payments: [],
            transactionType: 'Foreign',
          },
          {
            reward: {
              type: 'DirectMilesReward',
              name: '國內消費',
              spendingPerMile: 20,
            },
            stores: [],
            payments: [],
            transactionType: 'Domestic',
          },
        ],
      },
    ],
  })
}

function createCube(): CreditCard {
  return createCard({
    name: 'Cube 卡',
    cardUrl: null,
    blackList: [],
    plans: [
      {
        name: '集精選',
        rewards: [
          {
            reward: {
              type: 'RoundedPointsRewardPercentage',
              name: '基本回饋',
              pointBackRate: 2,
              pointsPerMile: 300,
              milesPerUnit: 1000,
            },
            stores: ['台灣中油', '全聯', '7-11', '全家'],
            payments: [],
            transactionType: null,
          },
        ],
      },
      {
        name: '來支付',
        rewards: [
          {
            reward: {
              type: 'RoundedPointsRewardPercentage',
              name: '基本回饋',
              pointBackRate: 2,
              pointsPerMile: 300,
              milesPerUnit: 1000,
            },
            stores: [],
            payments: ['Line Pay'],
            transactionType: null,
          },
        ],
      },
      {
        name: '玩數位',
        rewards: [
          {
            reward: {
              type: 'RoundedPointsRewardPercentage',
              name: '基本回饋',
              pointBackRate: 3,
              pointsPerMile: 300,
              milesPerUnit: 1000,
            },
            stores: ['PChome', '蝦皮購物', '博客來', 'momo'],
            payments: [],
            transactionType: null,
          },
        ],
      },
      {
        name: '樂饗購',
        rewards: [
          {
            reward: {
              type: 'RoundedPointsRewardPercentage',
              name: '基本回饋',
              pointBackRate: 3,
              pointsPerMile: 300,
              milesPerUnit: 1000,
            },
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
        ],
      },
    ],
  })
}
</script>
