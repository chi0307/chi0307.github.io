<template>
  <div class="flex-col gap-8px h-full">
    <v-text-field
      v-model.number="amount"
      class="flex-grow-0"
      density="comfortable"
      hide-details
      label="交易金額"
      inputmode="decimal"
    />
    <v-autocomplete
      ref="storeAutoComplete"
      v-model="transactionStore"
      class="flex-grow-0"
      density="comfortable"
      hide-details
      label="消費店家"
      :items="storeList"
      :clearable="transactionStore !== ''"
      placeholder="全部店家"
      @update:menu="(status: boolean) => !status && storeAutoCompleteElement?.blur()"
    />
    <div>
      <v-label text="支援的付款方式" />
      <div class="flex items-center flex-wrap gap-x-8px">
        <v-checkbox
          v-for="(payment, index) of commonPaymentMethods"
          :key="index"
          v-model="acceptedPayments"
          density="compact"
          :value="payment"
          hide-details
          :label="payment"
        />
      </div>
    </div>
    <div class="flex-center gap-8px">
      <v-label text="交易類型" />
      <v-radio-group v-model="transactionAttributesType" hide-details inline>
        <v-radio density="compact" label="國內交易" value="Domestic" />
        <v-radio density="compact" label="國外交易" value="Foreign" />
      </v-radio-group>
    </div>
    <div ref="rewardCardList" class="gap-4px flex-col flex-grow-1 overflow-y-auto">
      <v-card
        v-for="(item, index) of rewardMilesList"
        :key="index"
        density="compact"
        class="mx-auto w-full flex-shrink-0"
        variant="outlined"
      >
        <template #title>
          <div class="flex items-center justify-between">
            {{ item.miles }}
            <i v-if="item.isSelectedPlan" class="fa-solid fa-circle-check" />
          </div>
        </template>
        <template #text>
          <div class="flex-col gap-8px">
            <p class="text-0.75rem">
              {{ `${item.cardName} ${item.planName ?? ''} ${item.rewardName ?? ''}` }}
              {{ item.payments.length === 0 ? '' : ` (支付方式: ${item.payments.join(', ')})` }}
            </p>
          </div>
        </template>
      </v-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, useTemplateRef } from 'vue'

import { removeDuplicates } from '@/utils'
import { sortList, sortListByField } from '@/utils/sorts'

import { hsbcCards } from '../configs/hsbc'
import {
  createCard,
  CreditCard,
  type Payment,
  type RewardMileInfo,
  type TransactionInfo,
  type TransactionType,
} from '../CreditCard'
import { useBestMileageCardsStore } from '../store'

interface RewardItem {
  cardName: string
  planName: string | null
  rewardName: string | null
  miles: number
  isSelectedPlan: boolean
  payments: readonly Payment[]
}

const { showRewardMilesType, commonPaymentMethods } = storeToRefs(useBestMileageCardsStore())

const cards = ref<CreditCard[]>([])
const amount = ref<number>(0)
const transactionStore = ref<string>('')
const otherStore = '其他店家'
const transactionAttributesType = ref<TransactionType>('Domestic')
const acceptedPayments = ref<Payment[]>([])
const rewardCardListElement = useTemplateRef<HTMLElement>('rewardCardList')
const storeAutoCompleteElement = useTemplateRef<HTMLElement>('storeAutoComplete')

const storeList = computed((): string[] => {
  const stores = sortList(removeDuplicates(cards.value.flatMap((card) => card.storeList)), 'asc')
  return [otherStore, ...stores]
})

function getRewardMiles(card: CreditCard, paymentInfo: TransactionInfo): RewardMileInfo[] {
  if (showRewardMilesType.value === 'CurrentPlanRewardMiles') {
    return [card.currentPlanRewardMiles(paymentInfo)]
  } else {
    return card.getAllPlanRewardMiles(paymentInfo)
  }
}

const rewardMilesList = computed((): RewardItem[] => {
  const paymentInfo: TransactionInfo = {
    amount: amount.value,
    acceptedPayments: acceptedPayments.value,
    transactionAttributesType: transactionAttributesType.value,
  }
  if (transactionStore.value !== '') {
    paymentInfo.transactionStore = transactionStore.value
  }
  const list: RewardItem[] = []
  for (const card of cards.value) {
    if (!(card instanceof CreditCard)) {
      continue
    }
    const rewardMileList = getRewardMiles(card, paymentInfo)
    for (const item of rewardMileList) {
      const rewardItem: RewardItem = {
        cardName: card.name,
        planName: item.planName,
        rewardName: item.name,
        miles: item.miles,
        payments: item.payments,
        isSelectedPlan:
          showRewardMilesType.value === 'AllPlanRewardMiles' && item.planId === card.selectedPlanId,
      }
      list.push(rewardItem)
    }
  }
  rewardCardListElement.value?.scrollTo({ top: 0, behavior: 'smooth' })
  return sortListByField(list, 'miles', 'desc')
})

onMounted(() => {
  cards.value = [
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    createCard(hsbcCards[0]!),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    createCard(hsbcCards[1]!),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    createCard(hsbcCards[2]!),
    createCube(),
  ]
})

function createCube(): CreditCard {
  return createCard({
    name: 'Cube 卡',
    cardUrl: null,
    blackList: [],
    updateAt: '2024-12-01T00:00:00.000Z',
    plans: [
      {
        name: '集精選',
        rewards: [
          {
            reward: {
              type: 'RoundedPointsRewardPercentage',
              name: null,
              pointBackRate: 2,
              pointsPerMile: 300,
              milesPerUnit: 1000,
              airLines: 'EVA',
            },
            stores: ['台灣中油', '全聯', '7-11', '全家'],
            payments: [
              '信用卡',
              'Apple Pay',
              'Samsung Pay',
              'Google Pay',
              'Fitbit Pay',
              'Garmin Pay',
              'Hami Pay',
            ],
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
              name: null,
              pointBackRate: 2,
              pointsPerMile: 300,
              milesPerUnit: 1000,
              airLines: 'EVA',
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
              name: null,
              pointBackRate: 3,
              pointsPerMile: 300,
              milesPerUnit: 1000,
              airLines: 'EVA',
            },
            stores: ['PChome', '蝦皮購物', '博客來', 'momo'],
            payments: [
              '信用卡',
              'Apple Pay',
              'Samsung Pay',
              'Google Pay',
              'Fitbit Pay',
              'Garmin Pay',
              'Hami Pay',
            ],
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
              name: null,
              pointBackRate: 3,
              pointsPerMile: 300,
              milesPerUnit: 1000,
              airLines: 'EVA',
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

            payments: [
              '信用卡',
              'Apple Pay',
              'Samsung Pay',
              'Google Pay',
              'Fitbit Pay',
              'Garmin Pay',
              'Hami Pay',
            ],
            transactionType: null,
          },
        ],
      },
    ],
  })
}
</script>

<style scoped>
.v-card-text p {
  @apply line-height-none;
}
</style>
