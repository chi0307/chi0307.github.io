<template>
  <main class="m-24px flex-col gap-8px">
    <div class="flex-center w-full gap-4px">
      <v-text-field
        v-model.number="currentAmount"
        label="剩餘金額"
        validate-on="invalid-input"
        :rules="[isNumber]"
        hide-details="auto"
      />
      <v-text-field v-model="averageRate" hide-details="auto" label="平均匯率" disabled />
    </div>
    <v-data-table :items="columns" />
    <div class="fixed bottom-24px right-24px">
      <v-btn icon>
        <i class="fas fa-plus" />
      </v-btn>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { format } from 'date-fns'
import { computed, onMounted, ref, watch } from 'vue'

import { isNumber } from '@/utils/checkTyping'
import { localStorageManager } from '@/utils/StorageManager'
import { roundNumber } from '@/utils/utils'

import type { AverageExchangeRateItem } from './AverageExchangeRate'

interface TableColumns {
  date: string
  sell: number
  buy: number
  exchangeRate: number
  balance: number
}

const columns = computed((): TableColumns[] => {
  const dataList = [...transactionList.value].sort((aItem, bItem) =>
    aItem.date > bItem.date ? -1 : 1
  )
  let totalAmount = currentAmount.value
  const list = dataList.map((item) => {
    const balance = totalAmount > item.buy ? item.buy : totalAmount
    totalAmount -= balance
    return {
      date: format(item.date, 'yyyy/MM/dd'),
      sell: item.sell,
      buy: item.buy,
      exchangeRate: roundNumber(item.sell / item.buy, 4),
      balance
    }
  })
  return list
})
const averageRate = computed((): number => {
  let sellTotal = 0
  let buyTotal = 0
  for (const item of columns.value) {
    if (item.balance > 0) {
      buyTotal += item.balance
      sellTotal += item.balance * item.exchangeRate
    }
  }
  return buyTotal === 0 ? 0 : roundNumber(sellTotal / buyTotal, 4)
})

const transactionList = ref<AverageExchangeRateItem[]>([])
const currentAmount = ref<number>(0)

watch(
  () => [transactionList, currentAmount],
  () => {
    localStorageManager.set('averageExchangeRate', {
      transactionList: transactionList.value,
      amount: currentAmount.value
    })
  },
  { deep: true }
)

onMounted(() => {
  const restoreData = localStorageManager.get('averageExchangeRate')
  if (restoreData !== null) {
    transactionList.value = restoreData.transactionList
    currentAmount.value = restoreData.amount
  }
})
</script>
