<template>
  <section class="relative flex-center flex-col px-24px gap-24px py-32px">
    <ProjectCard
      v-for="(item, index) of projects"
      :key="index"
      class="card"
      :description="item.description"
      :image="item.image"
      :demo="item.demo ?? null"
      :repo="item.repo ?? null"
      :links="item.links ?? []"
      :deprecated="item.deprecated ?? false"
      :tech-stacks="item.techStacks ?? []"
    />
  </section>
</template>
<script lang="ts" setup>
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/configs/projects'
</script>

<style scoped>
.card {
  @apply w-full max-w-600px bg-white p-24px flex shadow-resume-card;
}
</style>
