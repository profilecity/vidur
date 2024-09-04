<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

useHead({
  title: 'Dashboard | Admin Panel',
});

const stats = await useFetch('/api/analytics/stats');
const { user } = useAuth();
const firstName = user.value?.profile.firstName;
</script>

<template>
  <div class="py-4 px-4 border-b border-zinc-200 bg-white">
    <div class="text-xl font-bold text-zinc-900 font-noto">
      👋🏽 Hello, {{ firstName }}
    </div>
    <div class="text-sm text-zinc-500 mt-2">
      Track your hiring activities. You are almost there!
    </div>
  </div>
  <div class="p-4">
    <AdminDashboardStats :stats="stats.data.value" v-if="stats.data.value" />
  </div>
</template>
