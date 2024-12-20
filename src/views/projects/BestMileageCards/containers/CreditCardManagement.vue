<template>
  <div class="flex-col gap-8px">
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
    <v-card>
      <v-tabs v-model="tab">
        <v-tab v-for="(id, index) of cardIds" :key="index" :value="id">
          {{ cardConfigs.get(id)?.name ?? 'unknown' }}
        </v-tab>
        <v-tab :value="addTab">
          <i class="fas fa-plus text-16px" />
        </v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item v-for="(id, index) of cardIds" :key="index" :value="id">
            {{ currentCardConfig }}
          </v-tabs-window-item>
          <v-tabs-window-item :value="addTab">
            {{ addTab }}
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
  <v-dialog v-model="showDefaultCardDialog">
    <v-card class="mx-auto" min-width="100%" title="請選擇卡片匯入">
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
      <template #actions>
        <v-btn text="取消" @click="showDefaultCardDialog = false" />
        <v-btn text="匯入" @click="importCardConfigs" />
      </template>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

import type { UUID } from '@/types'
import { generateUuid } from '@/utils'

import { defaultCardConfigs } from '../configs/defaultCards'
import type { CardConfig } from '../CreditCard'
import { useBestMileageCardsStore } from '../store'

const addTab = 'ADD'
const store = useBestMileageCardsStore()
const { cardConfigs } = storeToRefs(store)
const cardIds = computed(() => [...cardConfigs.value.keys()])
const currentCardConfig = computed(() => {
  if (tab.value === addTab) {
    return null
  }
  return cardConfigs.value.get(tab.value) ?? null
})
const tab = ref<UUID | typeof addTab>(addTab)
onMounted(() => {
  const firstCardId = cardIds.value[0]
  if (firstCardId) {
    tab.value = firstCardId
  }
})

const showDefaultCardDialog = ref(false)
const needImportCardConfigs = ref<CardConfig[]>([])
function importCardConfigs(): void {
  for (const item of needImportCardConfigs.value) {
    store.updateCardConfig(generateUuid(), item)
    showDefaultCardDialog.value = false
  }
}
</script>
