<template>
  <main class="m-24px flex-col gap-8px">
    <v-tabs v-model="selectedTab" align-tabs="center" color="deep-purple-accent-4">
      <v-tab v-for="({ id, title }, index) of tabs" :key="index" :value="id">{{ title }}</v-tab>
      <v-tab @click="addTab"> + </v-tab>
    </v-tabs>
    <div class="flex-center w-full gap-4px">
      <div class="flex-1">
        <v-text-field
          :model-value="currentAmount"
          label="剩餘外幣"
          validate-on="invalid-input"
          :rules="[isNumber]"
          type="number"
          hide-details="auto"
          @update:model-value="
            (newValue: string) => {
              const newAmount = parseInt(newValue)
              if (!isNaN(newAmount)) {
                update('amount', newAmount)
              }
            }
          "
        />
      </div>
      <div class="flex-1">
        <v-text-field :model-value="averageRate" hide-details="auto" label="平均匯率" disabled />
      </div>
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
          :model-value="addItem.buy === 0 ? 0 : roundNumber(addItem.sell / addItem.buy, 4)"
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

import { isNumber, isUuid } from '@/utils/checkTyping'
import { localStorageManager } from '@/utils/StorageManager'
import type { UUID } from '@/utils/types'
import { generateUuid, roundNumber, sortListByDate } from '@/utils/utils'

import type {
  AverageExchangeRateItem,
  AverageExchangeRateData,
  AverageExchangeRateGroup
} from './AverageExchangeRate'

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

const showAddItemDialog = ref(false)
const selectedTab = ref<UUID | null>(null)
const restoreData = ref<AverageExchangeRateGroup>({})
const currentData = computed((): AverageExchangeRateData | null =>
  selectedTab.value !== null ? (restoreData.value[selectedTab.value] ?? null) : null
)
const transactionList = computed((): AverageExchangeRateItem[] => currentData.value?.list ?? [])
const currentAmount = computed((): number => currentData.value?.amount ?? 0)
const tabs = computed((): { id: string; title: string }[] => {
  return Object.entries(restoreData.value).map(([id, { title }]) => ({ id, title }))
})

onMounted(() => {
  restoreData.value = localStorageManager.get('averageExchangeRate') ?? {}
  if (Object.keys(restoreData.value).length === 0) {
    addTab()
  }
  const tabId = Object.keys(restoreData.value)[0]
  if (isUuid(tabId)) {
    selectedTab.value = tabId
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

function addTab(): void {
  const id = generateUuid()
  restoreData.value[id] = {
    title: '新標籤',
    list: [],
    amount: 0
  }
  selectedTab.value = id
  localStorageManager.set('averageExchangeRate', restoreData.value)
}

function update<Key extends keyof AverageExchangeRateData>(
  key: Key,
  value: AverageExchangeRateData[Key]
): void {
  if (selectedTab.value === null) {
    return
  }
  const data: AverageExchangeRateData = restoreData.value[selectedTab.value] ?? {
    title: '',
    list: [],
    amount: 0
  }
  data[key] = value
  localStorageManager.set('averageExchangeRate', restoreData.value)
}
</script>
