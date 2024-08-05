<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

useHead({
  title: 'Settings | Admin Panel'
})

const activeTab = useActiveTab(["career-site", "seo", "members"]);
</script>

<template>
  <AdminSettingsHeader/>
  <section v-if="activeTab == 'career-site'">
    <LazyAdminSettingsGeneralUpdate :forms="'general'" class="mt-3"/>
  </section>
  <section v-else-if="activeTab == 'seo'">
    <LazyAdminSettingsGeneralUpdate :forms="'seo'" class="mt-3"/>
  </section>
  <section v-else-if="activeTab == 'members'">
    <LazyAdminSettingsMembersSection class="mt-3"/>
  </section>
  <section v-else>
    Invalid Page.
  </section>
</template>