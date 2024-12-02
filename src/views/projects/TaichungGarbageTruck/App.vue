<template>
  <div id="map" class="w-100dvw h-100dvh"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

// import { setPosition } from './map'
import {
  getGarbageTruckCollectionLocationItem,
  getGarbageTruckDynamicInformationItem,
} from './openData'

onMounted(async () => {
  // await loadMap('map')
  // await setPosition()
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
