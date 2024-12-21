<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});

useHead({
  title: 'Integrations | Admin Panel',
});

const { activeTab } = useTabGroup('integration');
</script>

<template>
  <AdminHooksFrame v-if="activeTab.id == 'hooks'" />
  <AdminPluginsFrame v-else-if="activeTab.id == 'plugins'" />
</template>
