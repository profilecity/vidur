<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

useHead({
  title: 'Dashboard | Admin Panel'
})

const stats = await useFetch('/api/analytics/stats');
const { user } = await useAuth();
const firstName = user.value?.profile.firstName;
</script>

<template>
  <div class="px-4 py-4">
    <div class=" pb-4 mb-4 border-b border-zinc-200">
      <div class="text-xl font-bold text-zinc-900">👋🏽 Hello, {{ firstName }}</div>
      <div class="text-sm text-zinc-500 mt-2">Track your hiring activities. You are almost there!</div>
    </div>
    <AdminDashboardStats :stats="stats.data.value" v-if="stats.data.value"/>
  </div>
</template>