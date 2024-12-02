<template>
  <div></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

import {
  getGarbageTruckCollectionLocationItem,
  getGarbageTruckDynamicInformationItem,
} from './openData'

onMounted(async () => {
  try {
    const a = await getGarbageTruckDynamicInformationItem()
    console.log('a', a)
  } catch (error) {
    console.error(error)
  }
  try {
    const b = await getGarbageTruckCollectionLocationItem()
    console.log('b', b)
  } catch (error) {
    console.error(error)
  }
})
</script>
