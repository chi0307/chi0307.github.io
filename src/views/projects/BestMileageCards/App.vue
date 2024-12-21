<template>
  <v-app>
    <v-app-bar density="comfortable" :elevation="2">
      <template #prepend>
        <v-app-bar-nav-icon @click="openNavigation = !openNavigation">
          <i class="fa-solid fa-bars" />
        </v-app-bar-nav-icon>
        <v-app-bar-title>{{ currentPage }}</v-app-bar-title>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="openNavigation">
      <template v-for="(item, index) of pageList" :key="index">
        <v-list-item
          :title="item"
          class="h-48px"
          :class="{ 'text-emphasis': currentPage === item }"
          @click="
            () => {
              currentPage = item
              openNavigation = false
            }
          "
        />
        <v-divider />
      </template>
    </v-navigation-drawer>
    <main style="height: calc(100dvh - 56px)" class="overflow-hidden mt-56px p-8px">
      <KeepAlive>
        <component :is="componentList[currentPage]" />
      </KeepAlive>
    </main>
  </v-app>
  <v-dialog :model-value="Boolean(dialog)" @update:model-value="store.closeDialog">
    <v-card v-if="dialog !== null" class="mx-auto" min-width="100%" :text="dialog.text">
      <template #actions>
        <v-btn
          v-for="(event, index) of dialog.events"
          :key="index"
          :text="event.text"
          @click="
            async () => {
              if ('event' in event) {
                await event.event()
              }
              store.closeDialog()
            }
          "
        />
      </template>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import CommonSettings from './containers/CommonSettings.vue'
import CreditCardManagement from './containers/CreditCardManagement.vue'
import SearchReward from './containers/SearchReward.vue'
import StoreAliasManagement from './containers/StoreAliasManagement.vue'
import { useBestMileageCardsStore } from './store'

const store = useBestMileageCardsStore()
const { dialog } = storeToRefs(store)

const componentList = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  查詢回饋: SearchReward,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  信用卡管理: CreditCardManagement,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  商家別名: StoreAliasManagement,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  喜好設定: CommonSettings,
} as const
type PageList = keyof typeof componentList
const pageList = Object.keys(componentList) as unknown as PageList[]

const openNavigation = ref(false)
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const currentPage = ref<PageList>(pageList[0]!)
</script>
