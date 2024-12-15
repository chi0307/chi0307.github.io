<template>
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
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { useBestMileageCardsStore } from '../store'
import { aliasTypeList, type AliasType } from '../utils'

const bestMileageCardsStore = useBestMileageCardsStore()
const { aliasType } = storeToRefs(bestMileageCardsStore)

const aliasTypeTranslation: Record<AliasType, string> = {
  default: '系統預設',
  additional: '預設+自定義',
  custom: '自定義',
}
</script>
