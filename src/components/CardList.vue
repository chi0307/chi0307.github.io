<template>
  <div class="flex-col gap-8px">
    <v-label v-if="$slots.label || label" class="flex-shrink-0 w-full">
      <slot v-if="$slots.label" name="label" />
      <p v-else>{{ label }}</p>
    </v-label>

    <div ref="cardListContainer" class="flex-col gap-8px" @dragleave="handleDragLeave">
      <v-card
        v-for="(item, index) in cacheList"
        :key="index"
        density="compact"
        class="mx-auto w-full flex-shrink-0 drag-item"
        :class="{
          'drag-over': dragOverIndex === index,
        }"
        variant="outlined"
        @click="emitClickItem(item, index)"
        @dragover.prevent="handleDragOver($event, index)"
        @dragstart="handleDragStart($event, index)"
        @dragend="handleDragEnd"
      >
        <v-card-text class="!p-0">
          <div class="flex min-h-1rem items-stretch">
            <!-- 拖曳區域 -->
            <div
              v-if="draggable"
              draggable="true"
              class="flex-center pl-0.5rem pr-0.25rem cursor-ns-resize"
            >
              <span class="mdi text-24px mdi-drag" />
            </div>

            <!-- 內容區域 -->
            <div
              class="flex-grow my-1rem min-h-20px flex items-center"
              :class="{ 'ml-1rem': !draggable, 'mr-1rem': !deletable }"
            >
              <slot v-bind="item" />
            </div>

            <!-- 刪除按鈕 -->
            <p
              v-if="deletable"
              class="flex-center pl-0.25rem pr-0.5rem"
              @click.stop="emitDeleteItem(item, index)"
            >
              <span class="mdi mdi-delete text-24px" />
            </p>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <!-- 新增按鈕 -->
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
import { onMounted, useTemplateRef, shallowRef, watch } from 'vue'

import { cloneDeep } from '@/utils/cloneDeep'

const props = defineProps<{
  list: Item[]
  label?: string | null
  addable?: boolean
  draggable?: boolean
  deletable?: boolean
}>()

const emits = defineEmits<{
  clickItem: [item: Item, index: number]
  deleteItem: [item: Item, index: number]
  addItem: []
  'update:list': [Item[]]
}>()

const cardListContainer = useTemplateRef<HTMLElement>('cardListContainer')
const cacheList = shallowRef<Item[]>([])
const draggedIndex = shallowRef<number | null>(null)
const dragOverIndex = shallowRef<number | null>(null)

onMounted((): void => {
  updateList()
})

watch(() => props.list, updateList, { deep: true })

function updateList(): void {
  cacheList.value = cloneDeep(props.list)
}

function handleDragStart(event: DragEvent, index: number): void {
  if (event.dataTransfer === null) {
    return // 如果 dataTransfer 為 null，提前 return 避免錯誤
  }
  draggedIndex.value = index
  event.dataTransfer.setData('text/plain', index.toString())
  event.dataTransfer.effectAllowed = 'move'
  const emptyImg = new Image()
  emptyImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
  event.dataTransfer.setDragImage(emptyImg, 0, 0)
}

function handleDragOver(event: DragEvent, index: number): void {
  event.preventDefault()
  if (draggedIndex.value === index || draggedIndex.value === null) {
    return
  }

  dragOverIndex.value = index
  const draggedItem = cacheList.value.splice(draggedIndex.value, 1)[0]
  if (draggedItem === undefined) {
    return
  }
  cacheList.value.splice(index, 0, draggedItem)
  draggedIndex.value = index
}

function handleDragLeave(event: DragEvent): void {
  const relatedTarget = event.relatedTarget
  if (relatedTarget !== null && cardListContainer.value?.contains(relatedTarget as Node)) {
    return
  }
  dragOverIndex.value = null
}

function handleDragEnd(): void {
  draggedIndex.value = null
  dragOverIndex.value = null
  emits('update:list', cacheList.value)
}

function emitClickItem(item: Item, index: number): void {
  emits('clickItem', item, index)
}

function emitDeleteItem(item: Item, index: number): void {
  emits('deleteItem', item, index)
}
</script>

<style scoped>
.drag-over {
  border: 2px dashed #007bff;
  background-color: #f0f8ff;
}
</style>
