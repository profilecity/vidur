<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

useHead({
  title: 'Settings | Admin Panel'
})

const activeTab = useActiveTab(["general", "members"]);
</script>

<template>
  <AdminSettingsHeader/>
  <section v-if="activeTab == 'general'">
    <LazyAdminSettingsGeneralUpdate class="mt-3"/>
  </section>
  <section v-else-if="activeTab == 'members'">
    <LazyAdminSettingsMembersSection class="mt-3"/>
  </section>
  <section v-else>
    Invalid Page.
  </section>
</template>