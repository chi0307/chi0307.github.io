<template>
  <div>
    <v-text-field
      :rules="rules"
      :inputmode="isFloat ? 'decimal' : 'numeric'"
      :model-value="modelValue"
      :clearable="clearable && modelValue !== 0"
      :prefix="prefix"
      :suffix="suffix"
      :messages="messages"
      @update:model-value="updateModelValue"
      @click:control="setFocusIndex"
    >
      <template v-if="label !== null" #label>
        <p class="relative">
          {{ label }}
          <span v-if="required" class="text-red ml-2px">*</span>
        </p>
      </template>
    </v-text-field>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const {
  modelValue = 0,
  required = false,
  label = null,
  isFloat = false,
  prefix,
  suffix,
  clearable = false,
  messages = '',
} = defineProps<{
  modelValue: number | undefined
  required?: boolean
  label?: string | null
  isFloat?: boolean
  prefix?: string
  suffix?: string
  clearable?: boolean
  messages?: string
}>()

const emits = defineEmits<{
  'update:model-value': [newValue: number]
}>()

type Rule = (value: string) => boolean | string

function checkNumber(value: string): number | null {
  const newNumber = isFloat ? parseFloat(value) : parseInt(value)
  return isNaN(newNumber) ? null : newNumber
}

const rules = computed(() => {
  const rules: Rule[] = []
  if (required) {
    rules.push((text: string): boolean | string => Boolean(checkNumber(text)) || '此欄位為必填')
  }
  return rules
})

function updateModelValue(newValue: string): void {
  const newNumber = checkNumber(newValue)
  emits('update:model-value', newNumber ?? 0)
}

/** 為了讓每次指標都從後面開始，每次 focus 的時候就觸發這邊 */
function setFocusIndex(event: MouseEvent): void {
  if (event.target instanceof HTMLInputElement) {
    const currentValue = event.target.defaultValue
    event.target.setSelectionRange(currentValue.length, currentValue.length)
  }
}
</script>
