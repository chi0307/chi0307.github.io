<template>
  <v-dialog :model-value="Boolean(modelValue)" fullscreen @update:model-value="closeDialog">
    <v-card>
      <v-toolbar>
        <v-btn icon="mdi-close" @click="closeDialog" />
        <v-toolbar-title>{{ title ?? '' }}</v-toolbar-title>
        <v-toolbar-items>
          <v-btn
            :text="btnTitle"
            @click="
              async () => {
                if (modelValue !== null) {
                  const status = (await btnEvent(modelValue)) ?? true
                  if (status) {
                    closeDialog()
                  }
                }
              }
            "
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
</script>
