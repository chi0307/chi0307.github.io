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
        :text="config.description"
        @click="() => (selectedCard = { id, config: cloneDeep(config) })"
      />
    </div>
  </div>
  <v-dialog
    :model-value="Boolean(selectedCard)"
    fullscreen
    @update:model-value="selectedCard = null"
  >
    <v-card class="reward-detail-dialog">
      <v-toolbar>
        <v-btn icon="mdi-close" @click="selectedCard = null" />
        <v-toolbar-title>編輯卡片</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn text="Save" @click="saveCardConfig" />
        </v-toolbar-items>
      </v-toolbar>
      <div v-if="selectedCard" class="flex-col gap-4px m-8px">
        <v-text-field v-model="selectedCard.config.name" hide-details label="卡片名稱" />
        <v-text-field v-model="selectedCard.config.description" hide-details label="卡片描述" />
        <v-text-field v-model="selectedCard.config.cardUrl" hide-details label="信用卡網頁" />
      </div>
    </v-card>
  </v-dialog>
  <v-dialog v-model="showDefaultCardDialog" fullscreen>
    <v-card class="reward-detail-dialog">
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
import { ref } from 'vue'

import type { UUID } from '@/types'
import { generateUuid } from '@/utils'
import { cloneDeep } from '@/utils/cloneDeep'

import { defaultCardConfigs } from '../configs/defaultCards'
import type { CardConfig } from '../CreditCard'
import { useBestMileageCardsStore } from '../store'

const store = useBestMileageCardsStore()
const { cardConfigs } = storeToRefs(store)
const selectedCard = ref<{ id: UUID; config: CardConfig } | null>(null)

const showDefaultCardDialog = ref(false)
const needImportCardConfigs = ref<CardConfig[]>([])
function importCardConfigs(): void {
  for (const item of needImportCardConfigs.value) {
    store.updateCardConfig(generateUuid(), item)
    showDefaultCardDialog.value = false
  }
}

function saveCardConfig(): void {
  if (selectedCard.value === null) {
    return
  }
  store.updateCardConfig(selectedCard.value.id, selectedCard.value.config)
  selectedCard.value = null
}
</script>
