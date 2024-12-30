<template>
  <div class="flex-col h-full overflow-hidden gap-8px">
    <div class="flex-shrink-0 flex-col gap-8px">
      <v-label text="別名設定" />
      <v-btn-toggle
        :model-value="aliasType"
        rounded="0"
        group
        class="w-full flex justify-center"
        :disabled="lockShowUISwitch"
        @update:model-value="updateAliasType"
      >
        <v-btn v-for="(item, index) of aliasTypeList" :key="index" class="flex-1" :value="item">
          {{ aliasTypeTranslation[item] }}
        </v-btn>
      </v-btn-toggle>
      <div v-if="aliasType !== 'default'" class="flex justify-between items-center">
        <div class="flex gap-8px">
          <v-btn v-if="showUI" @click="editStoreAlias(null)"> Add </v-btn>
          <v-btn v-else @click="saveStoreAliasesJson"> 儲存 </v-btn>
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
        @click="editStoreAlias(item.title)"
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
        clearable
        auto-grow
        :disabled="aliasType === 'default'"
        :max-rows="15"
        :messages="lockShowUISwitch ? '上方儲存完成後才能執行其他動作，離開這頁不會存檔' : ''"
        :error-messages="configIsValid ? '' : 'json 無效'"
        label="自定義別名設定檔"
        @update:model-value="checkAndUpdateCustomAliasesJson"
      />
    </div>
  </div>
  <FullscreenDialog
    v-model="editStoreAliasData"
    title="編輯商店別名"
    btn-title="儲存"
    :btn-event="saveStoreAlias"
  >
    <template #default="{ data }">
      <div class="flex-col gap-24px m-8px">
        <v-autocomplete
          ref="storeList"
          v-model="data.title"
          class="flex-grow-0"
          hide-details
          label="目標店家"
          :items="bestMileageCardsStore.storeList"
          placeholder="選擇店家"
          @update:menu="(status: boolean) => !status && storeListElement?.blur()"
        />
        <div class="flex-col gap-4px">
          <v-label text="自定義別名列表" />
          <v-text-field
            v-for="(alias, index) of data.aliases"
            :key="index"
            hide-details
            clearable
            :model-value="alias"
            @update:model-value="(text) => updateAliases(text, index)"
            @click:clear="() => data.aliases.splice(index, 1)"
          />
        </div>
      </div>
    </template>
  </FullscreenDialog>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed, onActivated, ref, useTemplateRef, watch } from 'vue'

import FullscreenDialog from '@/components/FullscreenDialog.vue'
import { isTruthyString } from '@/utils'

import { defaultStoreAliases, isStoreAliasesList } from '../configs/storeAliases'
import { useBestMileageCardsStore } from '../store'
import { aliasTypeList, type AliasType } from '../utils'

// TODO: 後面有空再 refactor 吧，感覺沒想好設計就做事，思考很混亂，而且先做卡片意義比較大
const bestMileageCardsStore = useBestMileageCardsStore()
const { aliasType, customAliases, storeAliases } = storeToRefs(bestMileageCardsStore)

const storeListElement = useTemplateRef<HTMLElement>('storeList')

const aliasTypeTranslation: Record<AliasType, string> = {
  default: '系統預設',
  additional: '預設+自定義',
  custom: '自定義',
}

interface AliasItem {
  title: string | null
  aliases: string[]
}

const showUI = ref<boolean>(true)
const lockShowUISwitch = ref<boolean>(false)
const configIsValid = ref(true)
const tempCustomAliases = ref<string>('[]')
const editStoreAliasData = ref<AliasItem | null>(null)

const aliasList = computed((): AliasItem[] => {
  let list: readonly [string, readonly string[]][]
  if (aliasType.value === 'default') {
    list = defaultStoreAliases
  } else if (aliasType.value === 'additional') {
    list = [...storeAliases.value].map(([key, value]) => [key, [...value]])
  } else {
    list = [...customAliases.value]
  }
  return list.map(([title, aliases]) => ({ title, aliases: [...aliases] }))
})

watch(
  () => editStoreAliasData.value?.title,
  (storeName) => {
    if (storeName === undefined || storeName === null || editStoreAliasData.value === null) {
      return
    }
    const aliases = [...(customAliases.value.get(storeName) ?? [])]
    if (aliases[aliases.length - 1] !== '') {
      aliases.push('')
    }
    editStoreAliasData.value.aliases = aliases
  },
)
watch(showUI, resetTempCustomAliases)

onActivated(() => {
  resetTempCustomAliases()
  lockShowUISwitch.value = false
  configIsValid.value = true
  showUI.value = true
})

function updateAliases(text: string, index: number): void {
  if (editStoreAliasData.value === null) {
    return
  }
  let aliases = editStoreAliasData.value.aliases
  aliases[index] = text
  if (aliases[aliases.length - 1] !== '') {
    aliases.push('')
  }
}

/** UI 操作上新增或編輯別名 */
function editStoreAlias(title: string | null): void {
  if (aliasType.value === 'default') {
    return
  }
  if (title === null) {
    editStoreAliasData.value = {
      title: null,
      aliases: [],
    }
  } else {
    const aliases = [...(customAliases.value.get(title) ?? [])]
    if (aliases[aliases.length - 1] !== '') {
      aliases.push('')
    }
    editStoreAliasData.value = {
      title,
      aliases,
    }
  }
}

/** 儲存自定義別名資料 */
function saveStoreAlias({ title: storeName, aliases }: AliasItem): void {
  if (storeName !== null) {
    bestMileageCardsStore.updateCustomAliases(
      storeName,
      [...new Set(aliases)].filter(isTruthyString),
    )
  }
}

function checkAndUpdateCustomAliasesJson(str: string): void {
  str = str.trim()
  tempCustomAliases.value = str
  lockShowUISwitch.value = true
  if (str === '') {
    configIsValid.value = true
    return
  }
  try {
    const config: unknown = JSON.parse(str)
    configIsValid.value = isStoreAliasesList(config)
  } catch (error) {
    console.error(error)
    configIsValid.value = false
  }
}

function saveStoreAliasesJson(): void {
  let status
  if (showUI.value) {
    status = true
  } else {
    if (tempCustomAliases.value === '') {
      tempCustomAliases.value = '[]'
    }
    try {
      const config: unknown = JSON.parse(tempCustomAliases.value)
      if (isStoreAliasesList(config)) {
        bestMileageCardsStore.updateAllCustomAliases(config)
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

function resetTempCustomAliases(): void {
  tempCustomAliases.value = JSON.stringify([...customAliases.value], null, 2)
}

function updateAliasType(type: AliasType): void {
  if (lockShowUISwitch.value) {
    return
  }
  if (type === 'default') {
    showUI.value = true
  }
  bestMileageCardsStore.updateAliasType(type)
}
</script>
