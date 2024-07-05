<script setup lang="ts">
const { hooks, showEmptyState } = await useHooks();
</script>

<template>
  <AdminIntegrationHooksEmptyState class="mt-8" v-if="showEmptyState" />
  <div class="mt-4" v-else>
    <AdminIntegrationHooksNewAction/>
    <div class="grid grid-cols-12 gap-6 mt-2">
      <AdminIntegrationHooksCard v-for="hook in hooks" :key="hook.id" :hook="hook" />
    </div>
  </div>
</template>