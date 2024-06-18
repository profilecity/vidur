<script setup lang="ts">
import type { Stats } from '~/server/api/analytics/stats.get';

const props = defineProps<{
  stats: Stats;
}>();
const stats: { val: number, title: string, icon: string }[] = [
  {
    val: props.stats.totalActiveApplicants,
    title: "Active Applicants",
    icon: "mdi:users-check"
  },
  {
    val: props.stats.totalApplicants,
    title: "Total Applicants",
    icon: "gis:map-users"
  },
  {
    val: props.stats.totalActivePostings,
    title: "Active Postings",
    icon: "hugeicons:permanent-job"
  },
];
</script>
<template>
  <div class="grid grid-cols-12 gap-6">
    <div
      class="flex flex-col col-span-6 md:col-span-4 lg:col-span-3 bg-white border border-zinc-300 rounded-lg" v-for="stat in stats">
      <div class="p-2">
        <header class="flex justify-start items-center space-x-2 mb-2">
          <!-- Icon -->
          <Icon :name="stat.icon" class="w-5 h-5"/>
          <h2 class="text-xs md:text-md lg:text-lg font-semibold text-zinc-800">{{ stat.title }}</h2>
        </header>
        <div class="flex items-start">
          <div class="text-3xl font-bold text-zinc-800 mr-2">{{ stat.val }}</div>
        </div>
      </div>
    </div>
  </div>
</template>