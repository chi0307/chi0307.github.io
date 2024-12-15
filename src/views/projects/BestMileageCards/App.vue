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
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import CommonSettings from './containers/CommonSettings.vue'
import CreditCardManagement from './containers/CreditCardManagement.vue'
import SearchReward from './containers/SearchReward.vue'
import StoreAliasManagement from './containers/StoreAliasManagement.vue'

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
