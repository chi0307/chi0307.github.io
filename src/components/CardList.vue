<template>
  <div class="flex-col gap-8px">
    <v-label v-if="$slots['label'] || label" class="flex-shrink-0 w-full">
      <slot v-if="$slots['label']" name="label" />
      <p v-else-if="label">{{ label }}</p>
    </v-label>
    <div ref="CardListContainer" class="flex-col gap-8px" @dragleave="dragLeave">
      <v-card
        v-for="(item, index) of cacheList"
        :key="index"
        density="compact"
        class="mx-auto w-full flex-shrink-0 drag-item"
        :class="{ 'drag-over': dragOverIndex === index }"
        variant="outlined"
        @click="clickItem(item, index)"
        @dragover.prevent="dragOver($event, index)"
        @dragstart="dragStart($event, index)"
        @dragend="dragEnd"
      >
        <v-card-text class="!p-0">
          <div class="flex min-h-1rem items-stretch">
            <!-- 只有這個區域可以被拖曳 -->
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
              :class="{
                'ml-1rem': !draggable,
                'mr-1rem': !deletable,
              }"
            >
              <slot v-bind="item" />
            </div>
            <!-- 刪除按鈕 -->
            <p
              v-if="deletable"
              class="flex-center pl-0.25rem pr-0.5rem"
              @click.stop="deleteItem(item, index)"
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
import { onMounted, shallowRef, useTemplateRef, watch } from 'vue'

import { cloneDeep } from '@/utils/cloneDeep'

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

const CardListContainerElement = useTemplateRef<HTMLElement>('CardListContainer')

const cacheList = shallowRef<Item[]>([])
onMounted(() => {
  updateList()
})
watch(() => list, updateList, { deep: true })

function updateList(): void {
  cacheList.value = cloneDeep(list)
}

const emits = defineEmits<{
  clickItem: [item: Item, index: number]
  deleteItem: [item: Item, index: number]
  addItem: []
  'update:list': [Item[]]
}>()

const draggedIndex = shallowRef<number | null>(null) // 記錄被拖曳的索引
const dragOverIndex = shallowRef<number | null>(null) // 記錄目前拖曳到的索引

function dragStart(event: DragEvent, index: number): void {
  draggedIndex.value = index // 儲存被拖曳項目索引
  if (event.dataTransfer !== null) {
    event.dataTransfer.setData('text/plain', index.toString())
    event.dataTransfer.effectAllowed = 'move' // 僅允許「移動」操作

    // 創建一個 1x1px 的透明圖片作為預覽
    const emptyImg = new Image()
    emptyImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
    event.dataTransfer.setDragImage(emptyImg, 0, 0) // 設置透明圖片為拖曳影像
  }
}

function dragOver(event: DragEvent, index: number): void {
  event.preventDefault() // 允許放置
  if (draggedIndex.value === null || draggedIndex.value === index) {
    return
  }

  dragOverIndex.value = index // 更新高亮目標位置

  // 即時更新列表
  const draggedItem = cacheList.value.splice(draggedIndex.value, 1)[0] // 移除拖曳項目
  if (draggedItem === undefined) {
    return
  }
  cacheList.value.splice(index, 0, draggedItem) // 插入新位置

  draggedIndex.value = index // 更新拖曳索引
}

function dragLeave(event: DragEvent): void {
  // 離開父元素的檢查，因為子元素拖曳影響到了父元素的 drag leave event，需要特別過濾掉
  if (
    !event.relatedTarget ||
    !CardListContainerElement.value?.contains(event.relatedTarget as Node)
  ) {
    dragOverIndex.value = null // 離開時移除高亮顯示
  }
}

function dragEnd(): void {
  draggedIndex.value = null // 重置索引
  dragOverIndex.value = null // 重置高亮狀態
  emits('update:list', cacheList.value) // 即時同步更新列表
}

function clickItem(item: Item, index: number): void {
  emits('clickItem', item, index)
}

function deleteItem(item: Item, index: number): void {
  emits('clickItem', item, index)
}
</script>

<style scoped>
.drag-over {
  border: 2px dashed #007bff;
  background-color: #f0f8ff;
}
</style>
