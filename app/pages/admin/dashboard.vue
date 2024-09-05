<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

useHead({
  title: 'Dashboard | Admin Panel',
});

const { data: stats } = await useFetch('/api/analytics/stats');
const { profile } = useAuth();
</script>

<template>
  <div class="py-4 px-4 border-b border-zinc-200 bg-white">
    <div class="text-xl font-bold text-zinc-900 font-noto">
      👋🏽 Hello, {{ profile.firstName }}
    </div>
    <div class="text-sm text-zinc-500 mt-2">
      Track your hiring activities. You are almost there!
    </div>
  </div>
  <div class="p-4">
    <AdminDashboardStats :stats="stats" v-if="stats" />
  </div>
</template>
