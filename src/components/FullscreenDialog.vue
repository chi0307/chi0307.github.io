<template>
  <v-dialog :model-value="Boolean(modelValue)" fullscreen @update:model-value="closeDialog">
    <v-card>
      <v-toolbar>
        <v-btn icon="mdi-close" @click="closeDialog" />
        <v-toolbar-title>{{ title ?? '' }}</v-toolbar-title>
        <v-toolbar-items>
          <v-btn
            :class="{
              'text-red': warningSaveText,
            }"
            :text="btnTitle"
            @click="saveAndCloneDialog"
          />
        </v-toolbar-items>
      </v-toolbar>
      <div v-if="modelValue" class="overflow-y-auto p-16px pb-40px">
        <slot :data="modelValue" :update-data="updateData" />
      </div>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" generic="Data extends Object" setup>
import { ref } from 'vue'

const { modelValue, title, btnTitle, btnEvent } = defineProps<{
  modelValue: Data | null
  title?: string
  btnTitle: string
  btnEvent: ((value: Data) => Promise<boolean> | boolean) | ((value: Data) => Promise<void> | void)
}>()

const emits = defineEmits<{
  'update:model-value': [Data: Data | null]
}>()

function closeDialog(): void {
  emits('update:model-value', null)
}

function updateData(newData: Data): void {
  emits('update:model-value', newData)
}

const warningSaveText = ref(false)
async function saveAndCloneDialog(): Promise<void> {
  if (modelValue === null) {
    return
  }
  const status = await btnEvent(modelValue)
  if (status !== false) {
    closeDialog()
  } else {
    warningSaveText.value = true
    window.setTimeout(() => {
      warningSaveText.value = false
    }, 3000)
  }
}
</script>
