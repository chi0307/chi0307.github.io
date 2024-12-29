<template>
  <div class="flex-col gap-4px h-full overflow-hidden">
    <div class="flex">
      <v-label class="ml-4px flex-grow !text-0.9rem">
        點擊
        <span class="mdi mdi-pencil mx-4px" />
        編輯卡片，點擊卡片切換方案
      </v-label>
      <v-btn text="匯入" @click="() => (needImportCardConfigs = [])" />
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
              @click.stop="() => (editCard = { id, config: cloneDeep(config) })"
            />
          </div>
        </template>
      </v-card>
    </div>
  </div>
  <FullscreenDialog
    v-model="editCard"
    title="編輯卡片"
    btn-title="儲存"
    :btn-event="saveCardConfig"
  >
    <template #default="{ data }">
      <div class="flex-col gap-2">
        <TextField v-model="data.config.name" label="卡片名稱" required />
        <TextField
          :model-value="data.config.description ?? ''"
          label="卡片描述"
          @update:model-value="(description) => (data.config.description = description)"
        />
        <TextField v-model="data.config.cardUrl" is-url label="信用卡網頁" />
        <!-- TODO: 可以加上 Create XXX 顯示這樣最好了 -->
        <ClipList
          addable
          label="卡片不回饋清單"
          :model-value="data.config.storeBlackList ?? []"
          :list="store.storeList"
          @update:model-value="(list) => (data.config.storeBlackList = list)"
        />
        <ClipList
          label="卡片不回饋支付方式"
          show-selected
          :model-value="data.config.paymentBlackList ?? []"
          :list="Payment"
          @update:model-value="(list) => (data.config.paymentBlackList = list)"
        />
        <div class="flex-col gap-8px mb-8">
          <v-label class="flex-shrink-0 w-full" text="方案設定" />
          <v-card
            v-for="(plan, index) of data.config.plans"
            :key="index"
            density="compact"
            class="mx-auto w-full flex-shrink-0"
            variant="outlined"
          >
            <v-card-text>
              <div class="flex items-center justify-between gap-4px min-h-1rem">
                {{ plan.config.name ?? '預設' }}
                <span
                  class="mdi mdi-delete text-24px"
                  @click.stop="
                    () =>
                      store.openDialog({
                        text: `確定要刪除'${plan.config.name ?? '預設'}'方案嗎？`,
                        events: [
                          {
                            text: '取消',
                          },
                          {
                            text: '刪除',
                            event: () => {
                              data.config.plans.splice(index, 1)
                            },
                            class: 'text-red',
                          },
                        ],
                      })
                  "
                />
              </div>
            </v-card-text>
          </v-card>
          <v-card density="compact" class="mx-auto w-full flex-shrink-0" variant="outlined">
            <v-card-text>
              <div class="flex items-center justify-center min-h-1rem">
                <span class="mdi text-24px mdi-plus" />
              </div>
            </v-card-text>
          </v-card>
        </div>
        <div class="flex-col gap-8px mb-8">
          <v-label class="flex-shrink-0 w-full" text="點數交換方式" />
          <v-card
            v-for="(exchange, index) of data.config.pointExchanges"
            :key="index"
            density="compact"
            class="mx-auto w-full flex-shrink-0"
            variant="outlined"
          >
            <v-card-text>
              <div class="flex items-center justify-between gap-4px min-h-1rem">
                {{ exchange.config.name }}
                <span
                  class="mdi mdi-delete text-24px"
                  @click.stop="
                    () =>
                      store.openDialog({
                        text: `確定要刪除'${exchange.config.name ?? '預設'}'點數交換方式嗎？`,
                        events: [
                          {
                            text: '取消',
                          },
                          {
                            text: '刪除',
                            event: () => {
                              data.config.pointExchanges.splice(index, 1)
                            },
                            class: 'text-red',
                          },
                        ],
                      })
                  "
                />
              </div>
            </v-card-text>
          </v-card>
          <v-card density="compact" class="mx-auto w-full flex-shrink-0" variant="outlined">
            <v-card-text>
              <div class="flex items-center justify-center min-h-1rem">
                <span class="mdi mdi-plus text-24px" />
              </div>
            </v-card-text>
          </v-card>
        </div>
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
    </template>
  </FullscreenDialog>
  <v-dialog
    :model-value="Boolean(switchPlanWithCardId)"
    @update:model-value="switchPlanWithCardId = null"
  >
    <v-card min-width="100%">
      <v-card-text class="overflow-hidden flex max-h-80dvh !p-0">
        <div class="overflow-y-auto w-full p-24px">
          <div v-if="currentCardWithSwitchPlan !== null" class="flex-col gap-8px">
            切換方案
            <v-card
              v-for="(plan, index) of currentCardWithSwitchPlan.selectablePlan ?? []"
              :key="index"
              density="compact"
              class="mx-auto w-full flex-shrink-0"
              variant="outlined"
              @click="
                () =>
                  switchPlanWithCardId &&
                  currentCardWithSwitchPlan &&
                  plan.id !== currentCardWithSwitchPlan.selectedPlanId &&
                  store.updatePlan(switchPlanWithCardId, plan.id)
              "
            >
              <v-card-text>
                <div class="flex items-center justify-between gap-4px min-h-1rem">
                  <p class="flex-col gap-1">
                    {{ plan.name ?? '預設' }}
                    <span v-if="plan.description" class="opacity-50 text-0.75rem">
                      {{ plan.description }}
                    </span>
                  </p>
                  <span
                    v-if="plan.id === currentCardWithSwitchPlan.selectedPlanId"
                    class="mdi text-24px mdi-check-circle"
                  />
                </div>
              </v-card-text>
            </v-card>
            切換點數交換方式
            <v-card
              v-for="(exchange, index) of currentCardWithSwitchPlan.selectablePointExchange ?? []"
              :key="index"
              density="compact"
              class="mx-auto w-full flex-shrink-0"
              variant="outlined"
              @click="
                () =>
                  switchPlanWithCardId &&
                  currentCardWithSwitchPlan &&
                  exchange.id !== currentCardWithSwitchPlan.selectedPointExchangeId &&
                  store.updatePointExchange(switchPlanWithCardId, exchange.id)
              "
            >
              <v-card-text>
                <div class="flex items-center justify-between min-h-1rem gap-4px">
                  <p class="flex-col gap-4px">
                    {{ exchange.name }}
                    <span class="opacity-50 text-0.75rem">{{ exchange.description }}</span>
                  </p>
                  <span
                    v-if="exchange.id === currentCardWithSwitchPlan.selectedPointExchangeId"
                    class="mdi mdi-check-circle text-24px"
                  />
                </div>
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
  <FullscreenDialog
    v-model="needImportCardConfigs"
    title="請選擇卡片"
    btn-title="匯入"
    :btn-event="importCardConfigs"
  >
    <template #default="{ data, updateData }">
      <div class="flex-col gap-2">
        <v-checkbox
          v-for="(item, index) of defaultCardConfigs"
          :key="index"
          :model-value="data"
          :value="item"
          hide-details
          color="blue"
          density="comfortable"
          class="import-card-checkbox"
          @update:model-value="(newData) => newData && updateData(newData)"
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
    </template>
  </FullscreenDialog>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'

import ClipList from '@/components/ClipList.vue'
import FullscreenDialog from '@/components/FullscreenDialog.vue'
import TextField from '@/components/TextFiled.vue'
import type { UUID } from '@/types'
import { generateUuid } from '@/utils'
import { cloneDeep } from '@/utils/cloneDeep'

import { defaultCardConfigs } from '../configs/defaultCards'
import { Payment, type CardConfig } from '../CreditCard'
import { useBestMileageCardsStore } from '../store'

const store = useBestMileageCardsStore()
const { cardConfigs, cards } = storeToRefs(store)
const editCard = ref<{ id: UUID; config: CardConfig } | null>(null)
const switchPlanWithCardId = ref<UUID | null>(null)
const currentCardWithSwitchPlan = computed(() => {
  const card =
    switchPlanWithCardId.value === null
      ? null
      : (cards.value.get(switchPlanWithCardId.value) ?? null)
  if (card === null) {
    return null
  }
  return card
})

const needImportCardConfigs = ref<CardConfig[] | null>(null)
function importCardConfigs(): void {
  if (needImportCardConfigs.value === null) {
    return
  }
  for (const item of needImportCardConfigs.value) {
    store.updateCardConfig(generateUuid(), item)
    needImportCardConfigs.value = null
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
<style scoped>
.import-card-checkbox:deep(.v-label--clickable) {
  @apply w-full;
}
</style>
