<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

useHead({
  title: 'Integrations | Admin Panel'
})

const activeTab = useActiveTab(["hooks", "plugins"]);
</script>

<template>
  <AdminIntegrationHeader />
  <section v-if="activeTab == 'hooks'">
    <LazyAdminIntegrationHooksSection />
  </section>
  <section v-else-if="activeTab == 'plugins'">

  </section>
</template>