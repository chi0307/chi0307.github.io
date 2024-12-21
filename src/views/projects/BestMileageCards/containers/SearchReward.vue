<template>
  <div class="gap-8px h-full flex-col">
    <v-text-field
      :model-value="amount"
      class="flex-grow-0"
      density="comfortable"
      hide-details
      label="交易金額"
      inputmode="decimal"
      :clearable="amount !== 0"
      @update:model-value="
        (numberString: string) =>
          (amount = isNaN(parseFloat(numberString)) ? 0 : parseFloat(numberString))
      "
    />
    <v-autocomplete
      ref="storeAutoComplete"
      v-model="transactionStore"
      :custom-filter="customSearchStore"
      class="flex-grow-0"
      density="comfortable"
      hide-details
      item-value="store"
      item-title="store"
      label="消費店家"
      :items="searchStoreList"
      :clearable="isTruthyString(transactionStore)"
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
    <div class="gap-8px flex-center">
      <v-label text="交易類型" />
      <v-radio-group v-model="transactionAttributesType" hide-details inline>
        <v-radio density="compact" label="國內交易" value="Domestic" />
        <v-radio density="compact" label="國外交易" value="Foreign" />
      </v-radio-group>
    </div>
    <div ref="rewardCardList" class="flex-col gap-4px flex-grow-1 overflow-y-auto">
      <v-card
        v-for="(item, index) of rewardMilesList"
        :key="index"
        density="compact"
        class="mx-auto w-full flex-shrink-0"
        variant="outlined"
        @click="() => (selectedRewardItem = item)"
      >
        <template #title>
          <div class="flex items-center justify-between">
            <div class="flex gap-4px items-end">
              {{ item.miles }}
              <p class="text-12px opacity-50 p-4px">{{ item.airLinesCode }}</p>
            </div>
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
  <v-dialog
    :model-value="Boolean(selectedRewardItem)"
    @update:model-value="selectedRewardItem = null"
  >
    <v-card
      v-if="selectedRewardItem"
      class="mx-auto reward-detail-dialog"
      min-width="100%"
      :title="`${selectedRewardItem.cardName} ${selectedRewardItem.planName ?? ''} ${selectedRewardItem.rewardName ?? ''}`"
    >
      <template #subtitle>
        <p class="text-wrap">
          {{ selectedRewardItem.description ?? '' }}
        </p>
      </template>
      <template #text>
        <div class="flex-col">
          <p class="flex justify-between">
            卡片說明：
            <a
              v-if="selectedRewardItem.cardUrl !== null"
              target="_blank"
              class="underline"
              :href="selectedRewardItem.cardUrl"
            >
              網站
            </a>
          </p>
          <p
            v-if="
              selectedRewardItem.cardDescription !== '' ||
              selectedRewardItem.cardDescription !== null
            "
          >
            {{ selectedRewardItem.cardDescription }}
          </p>
          <p v-if="selectedRewardItem.pointExchangeName !== ''">
            {{ selectedRewardItem.pointExchangeName }}
          </p>
          <br />
          <p>消費金額: {{ amount }}</p>
          <p>哩程預估: {{ selectedRewardItem.miles }}&ensp;{{ selectedRewardItem.airLinesCode }}</p>
          <br />
          <p v-for="(text, index) of selectedRewardItem.calculateDetail" :key="index">
            {{ text }}
          </p>
        </div>
      </template>
      <template #actions>
        <v-btn class="ms-auto" text="Close" @click="selectedRewardItem = null" />
      </template>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed, ref, useTemplateRef } from 'vue'

import { roundByDigits, floorByDigits, isTruthyString } from '@/utils'
import { sortListByField } from '@/utils/sorts'

import {
  type Payment,
  type Reward,
  type RewardType,
  type TransactionInfo,
  type TransactionType,
  type PointExchangeStrategy,
} from '../CreditCard'
import { useBestMileageCardsStore } from '../store'

const roundBy0 = roundByDigits(0)
const roundBy2 = roundByDigits(2)
const floorBy0 = floorByDigits(0)

interface RewardItem {
  cardName: string
  planName: string | null
  rewardName: string | null
  miles: number
  isSelectedPlan: boolean
  payments: readonly Payment[]
  airLinesCode: string
  calculateDetail: string[]
  cardUrl: string | null
  cardDescription: string | null
  description: string | null
  pointExchangeName: string | null
}

const {
  showRewardMilesType,
  commonPaymentMethods,
  cards,
  conditionTypes,
  storeAliases,
  storeList,
} = storeToRefs(useBestMileageCardsStore())

const amount = ref<number>(0)
const transactionStore = ref<string | null>(null)
const otherStore = '其他店家'
const transactionAttributesType = ref<TransactionType>('Domestic')
const acceptedPayments = ref<Payment[]>([])
const rewardCardListElement = useTemplateRef<HTMLElement>('rewardCardList')
const storeAutoCompleteElement = useTemplateRef<HTMLElement>('storeAutoComplete')

interface Item {
  store: string
  aliases?: string[]
}
const searchStoreList = computed((): Item[] => {
  const items = storeList.value.map((store) => ({
    store,
    aliases: [...(storeAliases.value.get(store) ?? [])],
  }))
  return [{ store: otherStore }, ...items]
})

function customSearchStore(
  value: string,
  searchQuery: string,
  item?: { raw: Item; value: string },
): boolean {
  searchQuery = searchQuery.toLowerCase()
  const list = [value, ...(item?.raw.aliases ?? [])].map((item) => item.toLowerCase())
  return list.some((item) => item.includes(searchQuery))
}

const rewardMilesList = computed((): RewardItem[] => {
  const paymentInfo: TransactionInfo = {
    amount: amount.value,
    acceptedPayments: acceptedPayments.value,
    transactionAttributesType: transactionAttributesType.value,
    currentConditions: [...conditionTypes.value],
  }
  if (isTruthyString(transactionStore.value)) {
    paymentInfo.transactionStore = transactionStore.value
  }
  const list: RewardItem[] = []
  for (const card of cards.value) {
    const rewardMileList = card.getRewardInfos(
      paymentInfo,
      showRewardMilesType.value === 'CurrentPlanRewardMiles'
        ? { onlyCurrentExchangeStrategy: true, onlyCurrentPlan: true }
        : {},
    )
    for (const item of rewardMileList) {
      const rewardItem: RewardItem = {
        cardName: card.name,
        planName: item.planName,
        rewardName: item.rewardName,
        miles: item.miles,
        payments: item.payments,
        airLinesCode: item.airlineCode,
        isSelectedPlan:
          showRewardMilesType.value === 'AllPlanRewardMiles' && item.planId === card.selectedPlanId,
        calculateDetail: getRewardDetail(item.rewardStrategy, item.pointExchangeStrategy),
        description:
          item.rewardStrategy === null
            ? null
            : `${item.rewardStrategy.description}，${item.pointExchangeStrategy.description}`,
        cardUrl: card.cardUrl,
        cardDescription: card.description,
        pointExchangeName: item.pointExchangeName,
      }
      list.push(rewardItem)
    }
  }
  rewardCardListElement.value?.scrollTo({ top: 0, behavior: 'smooth' })
  return sortListByField(sortListByField(list, 'isSelectedPlan', 'desc'), 'miles', 'desc')
})

const selectedRewardItem = ref<RewardItem | null>(null)
function getRewardDetail(
  reward: Reward<RewardType> | null,
  pointExchangeStrategy: PointExchangeStrategy,
): string[] {
  const { pointsPerMile, milesPerUnit, airlineCode } = pointExchangeStrategy

  const title = '回饋計算:'
  switch (reward?.type) {
    case 'RoundedPercentageReward':
    case 'TruncatedPercentageReward': {
      const numberFormatEvent = reward.type === 'RoundedPercentageReward' ? roundBy0 : floorBy0
      let totalPoints = 0
      return [
        title,
        ...reward.pointBackRates.map(({ rate, limit }) => {
          const total = Math.min(numberFormatEvent((amount.value * rate) / 100), limit ?? Infinity)
          totalPoints += total
          const limitString = limit !== undefined ? ` (limit ${limit})` : ''
          return `${amount.value} * ${rate}% = ${total}${limitString}`
        }),
        `總計 ${totalPoints} points`,
        `${totalPoints} / ${pointsPerMile} * ${milesPerUnit} = ${pointExchangeStrategy.calculateMiles(totalPoints)} ${airlineCode}`,
      ]
    }
    case 'AccumulatedPointsReward': {
      const points = roundBy2(amount.value / reward.spendingPerPoint)
      return [
        title,
        `${amount.value} / ${reward.spendingPerPoint} = ${points} points`,
        `${points} / ${pointsPerMile} * ${milesPerUnit} = ${pointExchangeStrategy.calculateMiles(points)} ${airlineCode}`,
      ]
    }
    case 'FixedRatePointsReward': {
      const points = floorBy0(amount.value / reward.spendingPerPoint)
      return [
        title,
        `${amount.value} / ${reward.spendingPerPoint} = ${points} points (小數省略)`,
        `${points} / ${pointsPerMile} * ${milesPerUnit} = ${pointExchangeStrategy.calculateMiles(points)} ${airlineCode}`,
      ]
    }
    default: {
      return []
    }
  }
}
</script>

<style scoped>
.v-card p {
  @apply line-height-none h-fit;
}

.reward-detail-dialog p {
  @apply line-height-125%;
}
</style>
