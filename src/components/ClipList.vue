<template>
  <v-combobox
    v-if="addable"
    ref="comboboxComponent"
    v-model="selectedItem"
    :items="filterList"
    :messages="message ?? ''"
    :label="label"
    multiple
    hide-selected
    @update:menu="(status: boolean) => !status && comboboxComponent?.blur()"
  >
    <template #selection="{ item }">
      <v-chip closable @click:close="remove(item.value)">
        {{ item.value }}
      </v-chip>
    </template>
  </v-combobox>
  <v-autocomplete
    v-else
    ref="autocompleteComponent"
    v-model="selectedItem"
    :items="filterList"
    :messages="message ?? ''"
    :label="label"
    multiple
    hide-selected
    clear-on-select
    @update:menu="(status: boolean) => !status && autocompleteComponent?.blur()"
  >
    <template #selection="{ item }">
      <v-chip closable @click:close="remove(item.value)">
        {{ item.value }}
      </v-chip>
    </template>
  </v-autocomplete>
</template>
<script lang="ts" generic="Item extends string" setup>
import { computed, useTemplateRef } from 'vue'

import { sortList } from '@/utils/sorts'

const comboboxComponent = useTemplateRef<HTMLElement>('comboboxComponent')
const autocompleteComponent = useTemplateRef<HTMLElement>('autocompleteComponent')

const selectedItem = defineModel<Item[]>({ required: true })
const {
  list,
  label,
  addable = false,
} = defineProps<{
  list: readonly Item[]
  label: string
  message?: string
  addable?: boolean
}>()

const filterList = computed(() => {
  return sortList(
    list.filter((item) => !selectedItem.value.includes(item)),
    'asc',
  )
})

function remove(item: Item): void {
  selectedItem.value.splice(selectedItem.value.indexOf(item), 1)
}
</script>
