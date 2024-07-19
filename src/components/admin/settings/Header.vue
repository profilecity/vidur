<script setup lang="ts">
const activeTab = useActiveTab(["general", "members"]);

const tabs = [
  {
    id: "general",
    display: "General",
    icon: "codicon:settings",
    url: '/admin/settings?tab=general',
  },
  {
    id: "members",
    display: "Members",
    icon: "fluent:people-20-regular",
    url: '/admin/settings?tab=members',
  }
]
</script>

<template>
  <section class="sticky top-0 bg-white p-4 border-b border-zinc-200">
    <div class="flex text-xl font-bold text-zinc-900">Settings</div>
    <TabbedPane :active-tab="activeTab" :tabs="tabs" class="mt-2" />
  </section>
</template>