<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

useHead({
  title: 'Integrations | Admin Panel'
})

const { activeTab } = useTabGroup("integration");
</script>

<template>
  <AdminIntegrationHooksFrame v-if="activeTab.id == 'hooks'" />
  <AdminIntegrationPluginsFrame v-else-if="activeTab.id == 'plugins'" />
</template>