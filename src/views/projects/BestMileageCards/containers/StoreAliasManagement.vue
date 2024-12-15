<template>
  <div class="flex-col h-full overflow-hidden gap-8px">
    <div class="flex-shrink-0 flex-col gap-8px">
      <v-label text="別名設定" />
      <v-btn-toggle
        :model-value="aliasType"
        rounded="0"
        group
        class="w-full flex justify-center"
        @update:model-value="bestMileageCardsStore.updateAliasType"
      >
        <v-btn v-for="(item, index) of aliasTypeList" :key="index" class="flex-1" :value="item">
          {{ aliasTypeTranslation[item] }}
        </v-btn>
      </v-btn-toggle>
      <div v-if="aliasType !== 'default'" class="flex justify-between items-center">
        <div class="flex gap-8px">
          <v-btn @click="save"> Save </v-btn>
          <v-btn v-if="showUI" @click="add"> Add </v-btn>
        </div>
        <v-switch v-model="showUI" :disabled="lockShowUISwitch" hide-details label="圖示" />
      </div>
    </div>
    <div v-if="showUI" class="gap-4px flex-col flex-grow-1 overflow-y-auto">
      <v-card
        v-for="(item, index) of aliasList"
        :key="index"
        density="compact"
        class="mx-auto w-full flex-shrink-0"
        variant="outlined"
        @click="edit"
      >
        <template #text>
          <p class="text-1rem">{{ item.title }}</p>
          <p class="text-0.8rem">
            {{ item.aliases.join(', ') }}
          </p>
        </template>
      </v-card>
    </div>
    <div v-else class="flex-grow-1">
      <v-textarea
        :model-value="tempCustomAliases"
        :clearable="tempCustomAliases !== ''"
        auto-grow
        :disabled="aliasType === 'default'"
        :max-rows="15"
        :error-messages="configIsValid ? '' : 'json 無效'"
        label="自定義別名設定檔"
        @update:model-value="updateCustomAliases"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed, onActivated, ref, watch } from 'vue'

import { defaultStoreAliases, isStoreAliases } from '../configs/storeAliases'
import { useBestMileageCardsStore } from '../store'
import { aliasTypeList, type AliasType } from '../utils'

const bestMileageCardsStore = useBestMileageCardsStore()
const { aliasType, customAliases } = storeToRefs(bestMileageCardsStore)

const aliasTypeTranslation: Record<AliasType, string> = {
  default: '系統預設',
  additional: '預設+自定義',
  custom: '自定義',
}

interface AliasItem {
  title: string
  aliases: string[]
}
const aliasList = computed((): AliasItem[] => {
  const list = aliasType.value === 'default' ? defaultStoreAliases : customAliases.value
  return list.map(([title, aliases]) => ({ title, aliases: [...aliases] }))
})
function edit(): void {
  if (aliasType.value === 'default') {
    return
  }
  console.log('edit')
}

const configIsValid = ref(true)
const tempCustomAliases = ref<string>('[]')
watch(customAliases, (data) => {
  tempCustomAliases.value = JSON.stringify(data, null, 2)
})
function updateCustomAliases(str: string): void {
  str = str.trim()
  tempCustomAliases.value = str
  lockShowUISwitch.value = true
  if (str === '') {
    configIsValid.value = true
    return
  }
  try {
    const config: unknown = JSON.parse(str)
    configIsValid.value = isStoreAliases(config)
  } catch (error) {
    console.error(error)
    configIsValid.value = false
  }
}

const showUI = ref<boolean>(true)
const lockShowUISwitch = ref<boolean>(false)

function save(): void {
  let status
  if (showUI.value) {
    status = true
  } else {
    if (tempCustomAliases.value === '') {
      tempCustomAliases.value = '[]'
    }
    try {
      const config: unknown = JSON.parse(tempCustomAliases.value)
      if (isStoreAliases(config)) {
        bestMileageCardsStore.updateCustomAliases(config)
        status = true
      } else {
        status = false
      }
    } catch (error) {
      console.error(error)
      status = false
    }
  }
  if (status) {
    alert('儲存成功')
    lockShowUISwitch.value = false
  } else {
    alert(`儲存失敗${!showUI.value ? '，JSON 不符合規則' : ''}`)
  }
}

function add(): void {
  console.log('add')
}

onActivated(() => {
  tempCustomAliases.value = JSON.stringify(customAliases.value, null, 2)
  lockShowUISwitch.value = false
  configIsValid.value = true
  showUI.value = true
})
</script>
