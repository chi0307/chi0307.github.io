<template>
  <v-text-field
    clearable
    :rules="rules"
    :model-value="modelValue"
    @update:model-value="updateModelValue"
  >
    <template #label>
      <p class="relative">
        {{ label }}
        <span v-if="required" class="text-red ml-2px">*</span>
      </p>
    </template>
  </v-text-field>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

import { isTruthyString } from '@/utils'

const {
  modelValue = null,
  required = false,
  label,
  isUrl = false,
} = defineProps<{
  modelValue: string | null | undefined
  required?: boolean
  label: string
  isUrl?: boolean
}>()

const emits = defineEmits<{
  'update:model-value': [newValue: string | null]
}>()

type Rule = (value: string | null) => boolean | string

const rules = computed(() => {
  const rules: Rule[] = []
  if (required) {
    rules.push((text: string | null): boolean | string => !!text || '此欄位為必填')
  }
  if (isUrl) {
    rules.push((text: string | null): boolean | string => {
      return (
        Boolean(text === null || text === '' || text.startsWith('https://')) ||
        '請填寫正確的網址 (需為 https:// 開頭)'
      )
    })
  }
  return rules
})

function updateModelValue(newValue: string | null): void {
  newValue = newValue?.trim() ?? null
  emits('update:model-value', isTruthyString(newValue) ? newValue : null)
}
</script>
