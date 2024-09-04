<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

useHead({
  title: 'Settings | Admin Panel',
});

const { activeTab } = useTabGroup('settings');
</script>

<template>
  <LazyAdminSettingsCareerSiteFrame v-if="activeTab.id == 'career-site'" />
  <LazyAdminSettingsSeoFrame v-else-if="activeTab.id == 'seo'" />
  <LazyAdminSettingsMembersFrame v-else-if="activeTab.id == 'members'" />
</template>
