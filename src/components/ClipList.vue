<template>
  <v-combobox
    v-if="addable"
    ref="comboboxComponent"
    :model-value="modelValue"
    :items="itemList"
    :messages="message ?? ''"
    :label="label"
    multiple
    :hide-details="hideDetails"
    :hide-selected="!showSelected"
    @update:model-value="updateModelValue"
    @update:menu="closeKeyboard(comboboxComponent)"
  >
    <template #selection="{ item }">
      <v-chip closable @click:close="remove(item.value)">
        {{ item.value }}
      </v-chip>
    </template>
  </v-combobox>
  <v-autocomplete
    v-else-if="searchable"
    ref="autocompleteComponent"
    :model-value="modelValue"
    :items="itemList"
    :messages="message ?? ''"
    :hide-details="hideDetails"
    :label="label"
    multiple
    :hide-selected="!showSelected"
    clear-on-select
    @update:model-value="updateModelValue"
    @update:menu="closeKeyboard(autocompleteComponent)"
  >
    <template #selection="{ item }">
      <v-chip closable @click:close="remove(item.value)">
        {{ item.value }}
      </v-chip>
    </template>
  </v-autocomplete>
  <v-select
    v-else
    ref="selectComponent"
    :model-value="modelValue"
    :items="itemList"
    :messages="message ?? ''"
    :hide-details="hideDetails"
    :label="label"
    multiple
    :hide-selected="!showSelected"
    @update:model-value="updateModelValue"
    @update:menu="closeKeyboard(selectComponent)"
  >
    <template #selection="{ item }">
      <v-chip closable @click:close="remove(item.value)">
        {{ item.value }}
      </v-chip>
    </template>
  </v-select>
</template>
<script lang="ts" generic="Item extends string" setup>
import { computed, useTemplateRef } from 'vue'

import { sortList } from '@/utils/sorts'

const comboboxComponent = useTemplateRef<HTMLElement>('comboboxComponent')
const autocompleteComponent = useTemplateRef<HTMLElement>('autocompleteComponent')
const selectComponent = useTemplateRef<HTMLElement>('selectComponent')

const {
  modelValue = [],
  list,
  label,
  searchable = false,
  addable = false,
  showSelected = false,
  hideDetails = false,
} = defineProps<{
  modelValue: readonly Item[] | undefined
  list: readonly Item[]
  label: string
  message?: string
  searchable?: boolean
  addable?: boolean
  /** 如果不顯示勾選框，會隱藏掉已經選擇的選項 */
  showSelected?: boolean
  hideDetails?: boolean
}>()

const emits = defineEmits<{
  'update:model-value': [newValue: Item[]]
}>()

const itemList = computed(() => sortList(list, 'asc'))

function remove(removeItem: Item): void {
  const newList = modelValue.filter((item) => item !== removeItem)
  updateModelValue(newList)
}

function updateModelValue([...newValue]: readonly Item[]): void {
  emits('update:model-value', newValue)
}

function closeKeyboard(element: HTMLElement | null): (status: boolean) => void {
  return function (status: boolean): void {
    if (!status && element !== null) {
      element.blur()
    }
  }
}
</script>
