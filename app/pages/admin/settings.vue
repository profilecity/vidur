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
  <LazyAdminCareerSiteFrame v-if="activeTab.id == 'career-site'" />
  <LazyAdminSeoFrame v-else-if="activeTab.id == 'seo'" />
  <LazyAdminMembersFrame v-else-if="activeTab.id == 'members'" />
</template>
