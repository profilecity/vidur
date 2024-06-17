<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const stats = await useFetch('/api/analytics/stats');
const activePostings = await useFetch('/api/analytics/job');
</script>

<template>
  <AdminDashboardStats :stats="stats.data.value" v-if="stats"/>
  <!-- TODO: fix type -->
  <AdminDashboardRecentPostings class="mt-4" :postings="activePostings.data.value as any" />
</template>