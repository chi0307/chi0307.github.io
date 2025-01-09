<template>
  <div class="flex-col gap-8px">
    <v-label v-if="$slots['label'] || label" class="flex-shrink-0 w-full">
      <slot v-if="$slots['label']" name="label" />
      <p v-else>{{ label }}</p>
    </v-label>

    <div ref="cardListContainer" class="flex-col gap-8px" @dragleave="handleDragLeave">
      <div v-for="(item, index) in cacheList" ref="cardItem" :key="index">
        <v-card
          density="compact"
          class="mx-auto w-full flex-shrink-0 card-item"
          :class="{
            'drag-over': dragOverIndex === index || touchStartIndex === index,
          }"
          variant="outlined"
        >
          <v-card-text class="!p-0">
            <div class="flex min-h-1rem items-stretch">
              <!-- 拖曳區域 -->
              <div
                v-if="draggable"
                draggable="true"
                class="flex-center pl-0.5rem pr-0.25rem cursor-ns-resize"
                @dragover.prevent="handleDragOver($event, index)"
                @dragstart="handleDragStart($event, index)"
                @dragend="handleDragEnd"
                @touchstart="handleTouchStart($event, index)"
                @touchmove.prevent="handleTouchMove($event)"
                @touchend="handleTouchEnd"
              >
                <span class="mdi text-24px mdi-drag" />
              </div>

              <!-- 內容區域 -->
              <div
                class="flex-grow min-h-20px flex items-center py-1rem cursor-pointer"
                :class="{ 'pl-1rem': !draggable, 'pr-1rem': !deletable }"
                @click="emitClickItem(item, index)"
              >
                <slot v-bind="item" />
              </div>

              <!-- 刪除按鈕 -->
              <p
                v-if="deletable"
                class="flex-center pl-0.25rem pr-0.5rem cursor-pointer"
                @click="emitDeleteItem(item, index)"
              >
                <span class="mdi mdi-delete text-24px" />
              </p>
            </div>
          </v-card-text>
        </v-card>
      </div>
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
const cardItemElements = useTemplateRef<HTMLElement[]>('cardItem')
const cacheList = shallowRef<Item[]>([])
const draggedIndex = shallowRef<number | null>(null)
const dragOverIndex = shallowRef<number | null>(null)
const touchStartIndex = shallowRef<number | null>(null)
const touchStartY = shallowRef<number | null>(null)

onMounted((): void => {
  updateList()
})

watch(() => props.list, updateList, { deep: true })

function updateList(): void {
  cacheList.value = cloneDeep(props.list)
}

function handleDragStart(event: DragEvent, index: number): void {
  if (!event.dataTransfer) {
    return // 如果 dataTransfer 為 null，提前 return 避免錯誤
  }
  clearSelection()
  draggedIndex.value = index
  event.dataTransfer.setData('text/plain', index.toString())
  event.dataTransfer.effectAllowed = 'move'
  const emptyImg = new Image()
  emptyImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
  event.dataTransfer.setDragImage(emptyImg, 0, 0)
}

function handleTouchStart(event: TouchEvent, index: number): void {
  const touch = event.touches[0] ?? null
  if (!touch) {
    return // 如果沒有觸控點，提前 return
  }
  clearSelection()
  touchStartIndex.value = index
  touchStartY.value = touch.clientY
}

function handleTouchMove(event: TouchEvent): void {
  if (touchStartIndex.value === null || touchStartY.value === null) {
    return
  }

  const touch = event.touches[0] ?? null
  if (!touch) {
    return
  }

  const deltaY = touch.clientY - touchStartY.value

  const changeItem = checkTouchOver(touchStartIndex.value, deltaY)
  if (changeItem) {
    const targetIndex = touchStartIndex.value + (deltaY > 0 ? 1 : -1)
    if (targetIndex < 0 || targetIndex >= cacheList.value.length) {
      return
    }

    const draggedItem = cacheList.value[touchStartIndex.value]
    if (!draggedItem) {
      return
    }

    cacheList.value.splice(touchStartIndex.value, 1)
    cacheList.value.splice(targetIndex, 0, draggedItem)
    touchStartIndex.value = targetIndex
    touchStartY.value = touch.clientY // 更新起始 Y 位置，避免快速連續移動錯位
  }
}

function handleTouchEnd(): void {
  touchStartIndex.value = null
  touchStartY.value = null
  emits('update:list', cacheList.value)
}

function handleDragOver(event: DragEvent, index: number): void {
  event.preventDefault()
  if (draggedIndex.value === index || draggedIndex.value === null) {
    return
  }

  const draggedItem = cacheList.value[draggedIndex.value]
  if (!draggedItem) {
    return
  }

  cacheList.value.splice(draggedIndex.value, 1)
  cacheList.value.splice(index, 0, draggedItem)
  dragOverIndex.value = index
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

function clearSelection(): void {
  const selection = window.getSelection() // 取得目前選取的內容
  if (selection) {
    selection.removeAllRanges() // 移除所有選取範圍
  }
}

function checkTouchOver(touchStartIndex: number, deltaY: number): boolean {
  // 這邊故意省去 gap 8px 的高度，至少讓他不需要位移那麼遠就可以交換元素，另外這邊計算是模糊計算，所以並不一定準確 QQ，要在想看看怎麼計算比較實際
  const calculateCardItemHeight =
    cardItemElements.value?.map((item) => item.getBoundingClientRect().height) ?? []
  const currentItemHeight = calculateCardItemHeight[touchStartIndex]
  if (deltaY > 0) {
    const nextItemHeight = calculateCardItemHeight[touchStartIndex + 1]
    if (currentItemHeight === undefined || nextItemHeight === undefined) {
      return false
    }
    const targetHeight = currentItemHeight / 2 + nextItemHeight / 2
    return deltaY >= targetHeight
  } else {
    const previousItemHeight = calculateCardItemHeight[touchStartIndex - 1]
    if (currentItemHeight === undefined || previousItemHeight === undefined) {
      return false
    }
    const targetHeight = currentItemHeight / 2 + previousItemHeight / 2
    return Math.abs(deltaY) >= targetHeight
  }
}
</script>

<style scoped>
.drag-over {
  border: 1px dashed #007bff;
  background-color: #f0f8ff;
}

/** 隱藏掉 vuetify card hover 的事件，因為搭配上拖曳事件，會變得很奇怪，拖曳中底色會影響到不該影響的內容 */
.card-item :deep(.v-ripple__container) {
  display: none !important;
}
</style>
