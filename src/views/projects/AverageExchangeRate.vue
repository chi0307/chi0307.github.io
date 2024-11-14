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
    <v-data-table :items="columns"> </v-data-table>
    <div class="fixed bottom-24px right-24px" @click="showAddItemDialog = true">
      <v-btn icon>
        <i class="fas fa-plus" />
      </v-btn>
    </div>
  </main>
  <v-dialog v-model="showAddItemDialog">
    <v-card prepend-icon="mdi-update" title="Add Item">
      <template #text>
        <v-text-field
          v-model="addItem.date"
          type="datetime-local"
          hide-details="auto"
          label="交易日期"
        />
        <v-text-field
          v-model.number="addItem.sell"
          type="number"
          hide-details="auto"
          label="賣出台幣"
        />
        <v-text-field
          v-model.number="addItem.buy"
          type="number"
          hide-details="auto"
          label="買入外幣"
        />
        <v-text-field
          hide-details="auto"
          label="平均匯率"
          :model-value="addItem.buy === 0 ? 0 : addItem.sell / addItem.buy"
          disabled
        />
      </template>
      <template #actions>
        <v-btn class="ms-auto" text="Submit" @click="addItemEvent" />
      </template>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { format } from 'date-fns'
import { computed, onMounted, ref, watch } from 'vue'

import { isNumber } from '@/utils/checkTyping'
import { localStorageManager } from '@/utils/StorageManager'
import { roundNumber, sortListByDate } from '@/utils/utils'

import type { AverageExchangeRateItem } from './AverageExchangeRate'

interface TableColumns {
  date: string
  sell: number
  buy: number
  exchangeRate: number
  balance: number
}

const columns = computed((): TableColumns[] => {
  const dataList = sortListByDate(transactionList.value, 'date', 'desc')
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
const showAddItemDialog = ref(false)

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
    transactionList.value = sortListByDate(restoreData.transactionList, 'date', 'desc')
    currentAmount.value = restoreData.amount
  }
})

watch(showAddItemDialog, () => {
  addItem.value = resetItem()
})
function resetItem(): AverageExchangeRateItem {
  return {
    sell: 0,
    buy: 0,
    date: format(new Date(), "yyyy-MM-dd'T'HH:mm")
  }
}

const addItem = ref<AverageExchangeRateItem>(resetItem())

function addItemEvent(): void {
  const { buy, sell } = addItem.value
  const date = new Date(addItem.value.date).toISOString()
  transactionList.value.unshift({ buy, sell, date })
  showAddItemDialog.value = false
}
</script>
