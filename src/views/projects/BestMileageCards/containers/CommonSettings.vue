<template>
  <div class="flex-col gap-8px">
    <div class="flex-center gap-8px">
      <v-label text="回饋顯示" />
      <v-radio-group
        :model-value="showRewardMilesType"
        hide-details
        inline
        @update:model-value="
          (item) => item !== null && bestMileageCardsStore.updateShowRewardMilesType(item)
        "
      >
        <v-radio density="compact" label="全部方案" value="AllPlanRewardMiles" />
        <v-radio density="compact" label="當前方案" value="CurrentPlanRewardMiles" />
      </v-radio-group>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { useBestMileageCardsStore } from '../store'

const bestMileageCardsStore = useBestMileageCardsStore()
const { showRewardMilesType } = storeToRefs(bestMileageCardsStore)
</script>
