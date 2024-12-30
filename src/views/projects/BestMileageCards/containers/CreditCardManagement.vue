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
        <TextField v-model="data.config.description" label="卡片描述" />
        <TextField v-model="data.config.cardUrl" is-url label="信用卡網頁" />
        <!-- TODO: 可以加上 Create XXX 顯示這樣最好了 -->
        <ClipList
          v-model="data.config.storeBlackList"
          addable
          label="卡片不回饋清單"
          :list="store.storeList"
        />
        <ClipList
          v-model="data.config.paymentBlackList"
          label="卡片不回饋支付方式"
          show-selected
          :list="Payment"
        />
        <div class="flex-col gap-8px mb-8">
          <v-label class="flex-shrink-0 w-full" text="方案設定 (點擊卡片進行編輯)" />
          <v-card
            v-for="(plan, index) of data.config.plans"
            :key="index"
            density="compact"
            class="mx-auto w-full flex-shrink-0"
            variant="outlined"
            @click="() => (editCardPlan = cloneDeep(plan))"
          >
            <v-card-text>
              <div class="flex items-center justify-between gap-4px min-h-1rem">
                {{ plan.config.name ?? '(空)' }}
                <span
                  class="mdi mdi-delete text-24px"
                  @click.stop="
                    () =>
                      store.openDialog({
                        text: `確定要刪除'${plan.config.name ?? '此'}'方案嗎？`,
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
          <v-card
            density="compact"
            class="mx-auto w-full flex-shrink-0"
            variant="outlined"
            @click="() => (editCardPlan = generateEmptyCardPlanConfig())"
          >
            <v-card-text>
              <div class="flex items-center justify-center min-h-1rem">
                <span class="mdi text-24px mdi-plus" />
              </div>
            </v-card-text>
          </v-card>
        </div>
        <div class="flex-col gap-8px mb-8">
          <v-label class="flex-shrink-0 w-full" text="點數交換方式 (點擊卡片進行編輯)" />
          <v-card
            v-for="(exchange, index) of data.config.pointExchanges"
            :key="index"
            density="compact"
            class="mx-auto w-full flex-shrink-0"
            variant="outlined"
            @click="() => (editCardPointExchange = cloneDeep(exchange))"
          >
            <v-card-text>
              <div class="flex items-center justify-between gap-4px min-h-1rem">
                {{ exchange.config.name }}
                <span
                  class="mdi mdi-delete text-24px"
                  @click.stop="
                    () =>
                      store.openDialog({
                        text: `確定要刪除'${exchange.config.name ?? '此'}'點數交換方式嗎？`,
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
          <v-card
            density="compact"
            class="mx-auto w-full flex-shrink-0"
            variant="outlined"
            @click="() => (editCardPointExchange = generateEmptyCardPointExchangeConfig())"
          >
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
  <FullscreenDialog
    v-model="editCardPlan"
    title="編輯方案"
    btn-title="儲存"
    :btn-event="saveCardConfigPlan"
  >
    <template #default="{ data }">
      <TextField v-model="data.config.name" label="方案名稱" />
      <v-textarea
        label="方案描述"
        :model-value="data.config.description"
        auto-grow
        clearable
        @update:model-value="
          (value) => (data.config.description = isTruthyString(value) ? value : null)
        "
      />
      <div class="flex-col gap-8px">
        <!-- TODO: 這邊抽出去變成 component 吧，畢竟還需要實作拖曳事件 -->
        <v-label class="flex-shrink-0 w-full">
          <p class="flex-col">
            回饋清單 (點擊卡片進行編輯)
            <span class="text-0.75em"> 依回饋排序檢查規則，符合即計算回饋，不再檢查後續項目 </span>
          </p>
        </v-label>
        TODO...
        <v-card
          v-for="(reward, index) of data.config.rewards"
          :key="index"
          density="compact"
          class="mx-auto w-full flex-shrink-0"
          variant="outlined"
        >
          <v-card-text>
            <div class="flex items-center justify-between gap-4px min-h-1rem">
              <p class="flex-col gap-4px">
                {{ reward.rewardStrategy.name ?? '(空)' }}
                <span class="text-0.9em">
                  {{ rewardStrategyFactory(reward.rewardStrategy).description }}
                </span>
              </p>
              <span
                class="mdi mdi-delete text-24px"
                @click.stop="
                  () =>
                    store.openDialog({
                      text: '確定要刪除嗎？',
                      events: [
                        {
                          text: '取消',
                        },
                        {
                          text: '刪除',
                          event: () => {
                            data.config.rewards.splice(index, 1)
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
      </div>
    </template>
  </FullscreenDialog>
  <FullscreenDialog
    v-model="editCardPointExchange"
    title="編輯交換方式"
    btn-title="儲存"
    :btn-event="saveCardConfigPointExchange"
  >
    <template #default="{ data }">
      <TextField v-model="data.config.name" label="名稱" required />
      <TextField v-model="data.config.airlineCode" label="目標里程" required />
      <div class="flex gap-4px items-center justify-center">
        <div class="flex-1">
          <NumberField v-model="data.config.pointsPerMile" label="points" required />
        </div>
        <span class="mdi mdi-arrow-right-thick text-24px mb-16px" />
        <div class="flex-1">
          <NumberField
            v-model="data.config.milesPerUnit"
            :label="`${data.config.airlineCode} 哩程`"
            required
          />
        </div>
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
                    {{ plan.name ?? '(空)' }}
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
import { ref, computed, type UnwrapRef } from 'vue'

import ClipList from '@/components/ClipList.vue'
import FullscreenDialog from '@/components/FullscreenDialog.vue'
import NumberField from '@/components/NumberField.vue'
import TextField from '@/components/TextFiled.vue'
import type { UUID } from '@/types'
import { generateUuid, isTruthyString } from '@/utils'
import { cloneDeep } from '@/utils/cloneDeep'

import { defaultCardConfigs } from '../configs/defaultCards'
import { isCardConfig, Payment, rewardStrategyFactory, type CardConfig } from '../CreditCard'
import { isCardPlanConfig, isCardPointExchangeConfig } from '../CreditCard/createCard'
import { useBestMileageCardsStore } from '../store'

const store = useBestMileageCardsStore()
const { cardConfigs, cards } = storeToRefs(store)
const editCard = ref<{ id: UUID; config: CardConfig } | null>(null)
const editCardPlan = ref<CardConfig['plans'][number] | null>(null)
const editCardPointExchange = ref<CardConfig['pointExchanges'][number] | null>(null)
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
function importCardConfigs(list: CardConfig[]): void {
  for (const item of list) {
    store.updateCardConfig(generateUuid(), item)
  }
}

function saveCardConfig({ id, config }: Exclude<UnwrapRef<typeof editCard>, null>): boolean {
  if (!isCardConfig(config)) {
    alert('儲存失敗')
    return false
  }
  store.updateCardConfig(id, config)
  return true
}

function generateEmptyCardPlanConfig(): Exclude<UnwrapRef<typeof editCardPlan>, null> {
  return {
    id: generateUuid(),
    config: {
      name: null,
      description: null,
      rewards: [],
    },
  }
}

function saveCardConfigPlan({
  id,
  config,
}: Exclude<UnwrapRef<typeof editCardPlan>, null>): boolean {
  if (editCard.value === null || !isCardPlanConfig(config)) {
    alert('儲存失敗')
    return false
  }
  const plan = editCard.value.config.plans.find((item) => item.id === id)
  if (plan) {
    plan.config = config
  } else {
    editCard.value.config.plans.push({ id, config })
  }
  return true
}

function generateEmptyCardPointExchangeConfig(): Exclude<
  UnwrapRef<typeof editCardPointExchange>,
  null
> {
  return {
    id: generateUuid(),
    config: {
      name: '',
      airlineCode: '',
      milesPerUnit: 0,
      pointsPerMile: 0,
    },
  }
}

function saveCardConfigPointExchange({
  id,
  config,
}: Exclude<UnwrapRef<typeof editCardPointExchange>, null>): boolean {
  if (
    editCard.value === null ||
    !isCardPointExchangeConfig(config) ||
    config.milesPerUnit === 0 ||
    config.pointsPerMile === 0
  ) {
    alert('儲存失敗')
    return false
  }
  const pointExchange = editCard.value.config.pointExchanges.find((item) => item.id === id)
  if (pointExchange) {
    pointExchange.config = config
  } else {
    editCard.value.config.pointExchanges.push({ id, config })
  }
  return true
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
