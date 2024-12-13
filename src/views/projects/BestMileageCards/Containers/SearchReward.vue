<template>
  <v-text-field
    v-model.number="amount"
    class="mb-8px"
    density="comfortable"
    hide-details
    label="交易金額"
  />
  <v-autocomplete
    v-model="transactionStore"
    class="mb-8px"
    density="comfortable"
    hide-details
    label="消費店家"
    :items="storeList"
  />
  <v-label text="支援的付款方式" />
  <div class="flex items-center flex-wrap gap-x-8px">
    <v-checkbox
      v-for="(payment, index) of Payment"
      :key="index"
      v-model="acceptedPayments"
      density="compact"
      :value="payment"
      hide-details
      :label="payment"
    />
  </div>
  <div class="flex-center gap-8px">
    <v-label text="交易類型" />
    <v-radio-group v-model="transactionAttributesType" hide-details inline>
      <v-radio density="compact" label="國內交易" value="Domestic" />
      <v-radio density="compact" label="國外交易" value="Foreign" />
    </v-radio-group>
  </div>
  <div class="flex-col gap-4px">
    <v-card
      v-for="(item, index) of list"
      :key="index"
      density="compact"
      class="mx-auto w-full"
      :subtitle="`${item.planName} ${item.name ?? ''}`"
      :title="item.miles"
      link
    />
  </div>
  <!-- <div>
    {{ item.planName }}, {{ item.name }}, {{ item.miles }}, 支付方式:
    {{ item.payments.join(', ') }}
  </div> -->
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'

import { removeDuplicates } from '@/utils'

import {
  createCard,
  Payment,
  type CreditCard,
  type RewardMileInfo,
  type TransactionInfo,
  type TransactionType,
} from '../CreditCard'

const cards = ref<CreditCard[]>([])
const amount = ref<number>(0)
const transactionStore = ref<string>('')
const otherStore = '其他店家'
const transactionAttributesType = ref<TransactionType>('Domestic')
const acceptedPayments = ref<Payment[]>([])

const storeList = computed((): string[] => {
  return removeDuplicates(['其他店家', ...cards.value.flatMap((card) => card.storeList)])
})

const list = computed((): RewardMileInfo[] => {
  const paymentInfo: TransactionInfo = {
    amount: amount.value,
    acceptedPayments: acceptedPayments.value,
    transactionAttributesType: transactionAttributesType.value,
  }
  if (transactionStore.value !== '' && transactionStore.value !== otherStore) {
    paymentInfo.transactionStore = transactionStore.value
  }
  return cards.value
    .map((card) => card.getAllPlanRewardMiles(paymentInfo))
    .flat(1)
    .sort((a, b) => b.miles - a.miles)
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
        name: '',
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
              name: '',
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
              name: '',
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
              name: '',
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
              name: '',
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
