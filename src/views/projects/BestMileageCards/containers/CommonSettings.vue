<template>
  <div class="flex-col gap-24px my-16px">
    <div class="gap-8px flex justify-around">
      <v-switch
        :model-value="onlyShowCurrentPlan"
        hide-details
        color="blue"
        @update:model-value="
          (data) => data !== null && bestMileageCardsStore.updateOnlyShowCurrentPlan(data)
        "
      >
        <template #label>
          <p class="text-0.75rem">只顯示當前方案</p>
        </template>
      </v-switch>
      <v-switch
        :model-value="onlyShowCurrentPointExchange"
        hide-details
        color="blue"
        @update:model-value="
          (data) => data !== null && bestMileageCardsStore.updateOnlyShowCurrentPointExchange(data)
        "
      >
        <template #label>
          <p class="text-0.75rem">只顯示當前交換方式</p>
        </template>
      </v-switch>
    </div>
    <ClipList
      label="使用中的付款方式"
      :model-value="commonPaymentMethods"
      :list="Payment"
      hide-details
      show-selected
      @update:model-value="bestMileageCardsStore.updateCommonPaymentMethods"
    />
    <div>
      <v-label text="其他設定" />
      <div class="flex mx-16px">
        <v-switch
          :model-value="conditionTypes"
          label="生日中"
          value="Birthday"
          hide-details
          color="blue"
          @update:model-value="
            (list) => list !== null && bestMileageCardsStore.updateConditionTypes(list)
          "
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import ClipList from '@/components/ClipList.vue'

import { Payment } from '../CreditCard'
import { useBestMileageCardsStore } from '../store'

const bestMileageCardsStore = useBestMileageCardsStore()
const { onlyShowCurrentPlan, onlyShowCurrentPointExchange, commonPaymentMethods, conditionTypes } =
  storeToRefs(bestMileageCardsStore)
</script>
