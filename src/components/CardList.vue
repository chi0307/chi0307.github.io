<template>
  <div class="flex-col gap-8px">
    <v-label v-if="$slots['label'] || label" class="flex-shrink-0 w-full">
      <slot v-if="$slots['label']" name="label" />
      <p v-else-if="label">{{ label }}</p>
    </v-label>
    <v-card
      v-for="(item, index) of list"
      :key="index"
      density="compact"
      class="mx-auto w-full flex-shrink-0"
      variant="outlined"
      @click="$emit('clickItem', item, index)"
    >
      <v-card-text class="!p-0">
        <div class="flex min-h-1rem items-stretch">
          <div v-if="draggable" class="flex-center pl-0.5rem pr-0.25rem cursor-ns-resize">
            <span class="mdi text-24px mdi-drag" />
          </div>
          <div
            class="flex-grow my-1rem min-h-20px flex items-center"
            :class="{
              'ml-1rem': !draggable,
              'mr-1rem': !deletable,
            }"
          >
            <slot v-bind="item" />
          </div>
          <p
            v-if="deletable"
            class="flex-center pl-0.25rem pr-0.5rem"
            @click.stop="$emit('deleteItem', item, index)"
          >
            <span class="mdi mdi-delete text-24px" />
          </p>
        </div>
      </v-card-text>
    </v-card>
    <v-card
      v-if="addable"
      density="compact"
      class="mx-auto w-full flex-shrink-0"
      variant="outlined"
      @click="$emit('addItem')"
    >
      <v-card-text>
        <div class="flex items-center justify-center min-h-1rem">
          <span class="mdi mdi-plus text-24px" />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup lang="ts" generic="Item extends object">
const {
  list,
  label = null,
  addable = false,
  draggable = false,
  deletable = false,
} = defineProps<{
  list: Item[]
  label?: string | null
  addable?: boolean
  draggable?: boolean
  deletable?: boolean
}>()

defineEmits<{
  clickItem: [item: Item, index: number]
  deleteItem: [item: Item, index: number]
  addItem: []
}>()
</script>
