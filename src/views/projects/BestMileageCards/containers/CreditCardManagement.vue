<template>
  <div class="flex-col gap-4px h-full overflow-hidden">
    <div class="flex justify-end">
      <v-btn
        text="匯入"
        @click="
          () => {
            needImportCardConfigs = []
            showDefaultCardDialog = true
          }
        "
      />
    </div>
    <div class="flex-1 gap-8px flex-col overflow-y-auto py-8px">
      <v-card
        v-for="([id, config], index) of cardConfigs.entries()"
        :key="index"
        density="compact"
        class="mx-auto w-full flex-shrink-0"
        variant="outlined"
        :title="config.name"
        :text="config.description ?? ''"
        @click="() => (switchPlanWithCardId = id)"
      >
        <template #title>
          <div class="flex items-center justify-between">
            {{ config.name }}
            <span
              class="mdi mdi-pencil absolute top-0 py-0.625rem px-1rem right-0"
              @click="() => (editCard = { id, config: cloneDeep(config) })"
            />
          </div>
        </template>
      </v-card>
    </div>
  </div>
  <v-dialog :model-value="Boolean(editCard)" fullscreen @update:model-value="editCard = null">
    <v-card>
      <v-toolbar>
        <v-btn icon="mdi-close" @click="editCard = null" />
        <v-toolbar-title>編輯卡片</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn text="Save" @click="saveCardConfig" />
        </v-toolbar-items>
      </v-toolbar>
      <div v-if="editCard" class="flex-col gap-2 m-16px">
        <TextField v-model="editCard.config.name" label="卡片名稱" required />
        <TextField v-model="editCard.config.description" label="卡片描述" />
        <TextField v-model="editCard.config.cardUrl" is-url label="信用卡網頁" />
        <div>
          <v-btn
            class="text-red"
            text="刪除"
            @click="
              store.openDialog({
                text: '確定要刪除嗎？',
                events: [
                  {
                    text: '取消',
                  },
                  {
                    text: '刪除',
                    event: deleteCardConfig,
                    class: 'text-red',
                  },
                ],
              })
            "
          />
        </div>
      </div>
    </v-card>
  </v-dialog>
  <v-dialog
    :model-value="Boolean(switchPlanWithCardId)"
    @update:model-value="switchPlanWithCardId = null"
  >
    <v-card min-width="100%">
      <v-card-text class="max-h-80dvh overflow-hidden flex !p-0">
        <div class="overflow-y-auto w-full p-24px">
          <div v-if="currentCardWithSwitchPan !== null" class="flex-col gap-8px">
            切換方案
            <v-card
              v-for="(plan, index) of currentCardWithSwitchPan.selectablePlan ?? []"
              :key="index"
              density="compact"
              class="mx-auto w-full flex-shrink-0"
              variant="outlined"
              @click="
                () => {
                  currentCardWithSwitchPan?.updatePlan(plan.id)
                  updateCardSelectedPlanId()
                }
              "
            >
              <v-card-text class="h-3.6rem flex items-center justify-between">
                {{ plan.name ?? '' }}
                <span
                  v-if="plan.id === currentCardSelectedPlanId"
                  class="mdi mdi-check-circle text-24px"
                />
              </v-card-text>
            </v-card>
            切換回饋
            <v-card
              v-for="(
                strategy, index
              ) of currentCardWithSwitchPan.selectablePointExchangeStrategy ?? []"
              :key="index"
              density="compact"
              class="mx-auto w-full flex-shrink-0"
              variant="outlined"
              @click="
                () => {
                  currentCardWithSwitchPan?.updatePointExchangeStrategy(strategy.id)
                  updateCardSelectedPointExchangeStrategyId()
                }
              "
            >
              <v-card-text class="h-3.6rem flex items-center justify-between">
                {{ strategy.name ?? '' }}
                <span
                  v-if="strategy.id === currentCardSelectedPointExchangeStrategyId"
                  class="mdi mdi-check-circle text-24px"
                />
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn class="ms-auto" text="Close" @click="switchPlanWithCardId = null" />
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="showDefaultCardDialog" fullscreen>
    <v-card>
      <v-toolbar>
        <v-btn icon="mdi-close" @click="showDefaultCardDialog = false" />
        <v-toolbar-title>請選擇卡片</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn text="匯入" @click="importCardConfigs" />
        </v-toolbar-items>
      </v-toolbar>
      <div class="flex-col gap-4px m-8px">
        <v-checkbox
          v-for="(item, index) of defaultCardConfigs"
          :key="index"
          v-model="needImportCardConfigs"
          :value="item"
          hide-details
          density="comfortable"
        >
          <template #label>
            <div class="flex-col">
              <p class="text-1rem">
                {{ item.name }}
              </p>
              <p class="text-0.75rem">
                {{ item.description }}
              </p>
            </div>
          </template>
        </v-checkbox>
      </div>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'

import TextField from '@/components/TextFiled.vue'
import type { UUID } from '@/types'
import { generateUuid } from '@/utils'
import { cloneDeep } from '@/utils/cloneDeep'

import { defaultCardConfigs } from '../configs/defaultCards'
import type { CardConfig } from '../CreditCard'
import { useBestMileageCardsStore } from '../store'

const store = useBestMileageCardsStore()
const { cardConfigs, cards } = storeToRefs(store)
const editCard = ref<{ id: UUID; config: CardConfig } | null>(null)
const switchPlanWithCardId = ref<UUID | null>(null)
const currentCardWithSwitchPan = computed(() => {
  const card =
    switchPlanWithCardId.value === null
      ? null
      : (cards.value.get(switchPlanWithCardId.value) ?? null)
  if (card === null) {
    return null
  }
  updateCardSelectedPlanId()
  updateCardSelectedPointExchangeStrategyId()
  return card
})

const currentCardSelectedPlanId = ref<UUID | null>(null)
function updateCardSelectedPlanId(): void {
  const card =
    switchPlanWithCardId.value === null
      ? null
      : (cards.value.get(switchPlanWithCardId.value) ?? null)
  if (card !== null) {
    currentCardSelectedPlanId.value = card.selectedPlanId
  }
}

const currentCardSelectedPointExchangeStrategyId = ref<UUID | null>(null)
function updateCardSelectedPointExchangeStrategyId(): void {
  const card =
    switchPlanWithCardId.value === null
      ? null
      : (cards.value.get(switchPlanWithCardId.value) ?? null)
  if (card !== null) {
    currentCardSelectedPointExchangeStrategyId.value = card.selectedPointExchangeStrategyId
  }
}

const showDefaultCardDialog = ref(false)
const needImportCardConfigs = ref<CardConfig[]>([])
function importCardConfigs(): void {
  for (const item of needImportCardConfigs.value) {
    store.updateCardConfig(generateUuid(), item)
    showDefaultCardDialog.value = false
  }
}

function saveCardConfig(): void {
  if (editCard.value === null) {
    return
  }
  store.updateCardConfig(editCard.value.id, editCard.value.config)
  editCard.value = null
}

function deleteCardConfig(): void {
  if (editCard.value === null) {
    return
  }
  store.deleteCardConfig(editCard.value.id)
  editCard.value = null
}
</script>
