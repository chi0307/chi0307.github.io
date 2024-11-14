<template>
  <main class="m-24px flex-col gap-8px">
    <v-tabs v-model="selectedTab" align-tabs="center" color="deep-purple-accent-4">
      <v-tab v-for="({ id, title }, index) of tabs" :key="index" :value="id">
        {{ title }}
        <p
          v-if="id === selectedTab"
          class="w-24px h-24px flex-center"
          @click="showEditTabDialog = true"
        >
          <i class="fa-solid fa-pen ml-4px" />
        </p>
      </v-tab>
      <v-tab @click="addTab">
        <i class="fas fa-plus text-16px" />
      </v-tab>
    </v-tabs>
    <div class="flex-center w-full gap-4px">
      <div class="flex-1">
        <v-text-field
          :model-value="currentAmount"
          :label="`剩餘${foreignCurrencyString}`"
          validate-on="invalid-input"
          :rules="[isNumber]"
          type="number"
          hide-details="auto"
          @update:model-value="
            (newValue: string) => {
              const newAmount = parseInt(newValue)
              update('amount', isNaN(newAmount) ? 0 : newAmount)
            }
          "
        />
      </div>
      <div class="flex-1">
        <v-text-field :model-value="averageRate" hide-details="auto" label="平均匯率" disabled />
      </div>
    </div>
    <v-data-table :headers="headers" :items="rows">
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.actions="{ item }">
        <i class="fa-solid fa-trash" @click="deleteItemEvent(item)" />
      </template>
    </v-data-table>
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
          :label="`賣出${localCurrencyString}`"
        />
        <v-text-field
          v-model.number="addItem.buy"
          type="number"
          hide-details="auto"
          :label="`買入${foreignCurrencyString}`"
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
  <v-dialog v-model="showEditTabDialog">
    <v-card v-if="editTab !== null" prepend-icon="mdi-update" title="Setting">
      <template #text>
        <div class="flex-col gap-8px">
          <v-text-field v-model="editTab.title" hide-details="auto" label="標籤名稱" />
          <v-text-field
            v-model="editTab.locale"
            hide-details="auto"
            label="語系代碼"
            placeholder="zh-TW"
          />
          <v-text-field
            v-model="editTab.localCurrencyCode"
            hide-details="auto"
            label="本幣代碼"
            placeholder="TWD"
          />
          <v-text-field
            v-model="editTab.foreignCurrencyCode"
            hide-details="auto"
            label="外幣代碼"
            placeholder="JPY"
          />
        </div>
      </template>
      <template #actions>
        <v-btn class="ms-auto" text="Submit" @click="editTabEvent" />
      </template>
    </v-card>
  </v-dialog>
  <v-dialog :model-value="Boolean(deleteData)" @update:model-value="deleteData = null">
    <v-card class="mx-auto" max-width="320" title="Update Field">
      <template #text> {{ deleteData?.message ?? '' }} </template>
      <template #actions>
        <v-btn class="ms-auto" text="Cancel" @click="deleteData = null" />
        <v-btn class="ms-auto" text="Delete" @click="deleteData?.event" />
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
import { generateUuid, isTruthyString, roundNumber, sortListByDate } from '@/utils/utils'

import {
  type AverageExchangeRateItem,
  type AverageExchangeRateData,
  type AverageExchangeRateGroup,
  initAverageExchangeRateData,
  formatCurrency
} from './AverageExchangeRate'

interface DataRow {
  id: UUID
  date: string
  sell: number
  buy: number
  exchangeRate: number
  balance: number
}
interface TableRow {
  id: UUID
  date: string
  sell: string
  buy: string
  exchangeRate: number
  balance: string
}

const headers = computed(
  () =>
    [
      { title: '日期', key: 'date', nowrap: true, sortable: false },
      {
        title: `賣出${localCurrencyString.value}`,
        key: 'sell',
        nowrap: true,
        sortable: false,
        align: 'end'
      },
      {
        title: `買入${foreignCurrencyString.value}`,
        key: 'buy',
        nowrap: true,
        sortable: false,
        align: 'end'
      },
      { title: '匯率', key: 'exchangeRate', nowrap: true, sortable: false },
      {
        title: `剩餘${foreignCurrencyString.value}`,
        key: 'balance',
        nowrap: true,
        sortable: false,
        align: 'end'
      },
      {
        key: 'actions',
        sortable: false
      }
    ] as const
)

const rows = computed((): TableRow[] => {
  return dataRows.value.map((item) => ({
    ...item,
    sell: formatCurrency(
      item.sell,
      currentData.value?.locale,
      currentData.value?.localCurrencyCode
    ),
    buy: formatCurrency(
      item.buy,
      currentData.value?.locale,
      currentData.value?.foreignCurrencyCode
    ),
    balance: formatCurrency(
      item.balance,
      currentData.value?.locale,
      currentData.value?.foreignCurrencyCode
    )
  }))
})
const dataRows = computed((): DataRow[] => {
  let totalAmount = currentAmount.value
  return sortListByDate(currentList.value, 'date', 'desc').map((item) => {
    const balance = totalAmount > item.buy ? item.buy : totalAmount
    totalAmount -= balance
    return {
      id: item.id,
      date: format(item.date, 'yyyy/MM/dd'),
      sell: item.sell,
      buy: item.buy,
      exchangeRate: roundNumber(item.sell / item.buy, 4),
      balance
    }
  })
})
const averageRate = computed((): number => {
  let sellTotal = 0
  let buyTotal = 0
  for (const item of dataRows.value) {
    if (item.balance > 0) {
      buyTotal += item.balance
      sellTotal += item.balance * item.exchangeRate
    }
  }
  return buyTotal === 0 ? 0 : roundNumber(sellTotal / buyTotal, 4)
})

const showAddItemDialog = ref(false)
const showEditTabDialog = ref(false)
const selectedTab = ref<UUID | null>(null)
const restoreData = ref<AverageExchangeRateGroup>({})
const currentData = computed((): AverageExchangeRateData | null =>
  selectedTab.value !== null ? (restoreData.value[selectedTab.value] ?? null) : null
)
const currentList = computed((): AverageExchangeRateItem[] => currentData.value?.list ?? [])
const currentAmount = computed((): number => currentData.value?.amount ?? 0)
const tabs = computed((): { id: string; title: string }[] => {
  return Object.entries(restoreData.value).map(([id, { title }]) => ({ id, title }))
})
const localCurrencyString = computed(() =>
  isTruthyString(currentData.value?.localCurrencyCode)
    ? ` ${currentData.value.localCurrencyCode}`
    : '本幣'
)
const foreignCurrencyString = computed(() =>
  isTruthyString(currentData.value?.foreignCurrencyCode)
    ? ` ${currentData.value.foreignCurrencyCode}`
    : '外幣'
)

onMounted(() => {
  restoreData.value = localStorageManager.get('averageExchangeRate') ?? {}
  if (Object.keys(restoreData.value).length === 0) {
    addTab()
  }
  localStorageManager.set('averageExchangeRate', restoreData.value)
  const tabId = Object.keys(restoreData.value)[0]
  if (isUuid(tabId)) {
    selectedTab.value = tabId
  }
})

watch(showAddItemDialog, () => {
  addItem.value = resetItem()
})
function resetItem(): Omit<AverageExchangeRateItem, 'id'> {
  return {
    sell: 0,
    buy: 0,
    date: format(new Date(), "yyyy-MM-dd'T'HH:mm")
  }
}

const addItem = ref<Omit<AverageExchangeRateItem, 'id'>>(resetItem())
interface EditTab {
  title: string
  localCurrencyCode: string
  foreignCurrencyCode: string
  locale: string
}
const editTab = ref<EditTab | null>(null)

function addItemEvent(): void {
  const { buy, sell } = addItem.value
  const date = new Date(addItem.value.date).toISOString()
  const id = generateUuid()
  update('list', [{ buy, sell, date, id }, ...currentList.value])
  showAddItemDialog.value = false
}

function addTab(): void {
  const id = generateUuid()
  restoreData.value[id] = initAverageExchangeRateData()
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
  const data: AverageExchangeRateData =
    restoreData.value[selectedTab.value] ?? initAverageExchangeRateData()
  data[key] = value
  localStorageManager.set('averageExchangeRate', restoreData.value)
}

watch(showEditTabDialog, () => {
  if (currentData.value !== null) {
    editTab.value = {
      title: currentData.value.title,
      localCurrencyCode: currentData.value.localCurrencyCode ?? '',
      foreignCurrencyCode: currentData.value.foreignCurrencyCode ?? '',
      locale: currentData.value.locale ?? ''
    }
  }
})

function editTabEvent(): void {
  if (editTab.value === null) {
    return
  }
  const { title, localCurrencyCode, foreignCurrencyCode, locale } = editTab.value
  update('title', title)
  update('localCurrencyCode', isTruthyString(localCurrencyCode) ? localCurrencyCode : null)
  update('foreignCurrencyCode', isTruthyString(foreignCurrencyCode) ? foreignCurrencyCode : null)
  update('locale', isTruthyString(locale) ? locale : null)
  showEditTabDialog.value = false
}

const deleteData = ref<{ message: string; event: () => void } | null>(null)
function deleteItemEvent({ id }: TableRow): void {
  deleteData.value = {
    message: '確定要刪除這筆資料嗎？',
    event: (): void => {
      update(
        'list',
        [...currentList.value].filter((item) => item.id === id)
      )
      deleteData.value = null
    }
  }
}
</script>
