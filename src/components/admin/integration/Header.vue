<script setup lang="ts">
const activeTab = useActiveTab(["hooks", "plugins"]);

const tabs = [
  {
    id: "hooks",
    display: "Hooks",
    icon: "ph:link",
    url: "/admin/integrations?tab=hooks"
  },
  {
    id: "plugins",
    display: "Plugins",
    icon: "mingcute:plugin-2-line",
    url: "/admin/integrations?tab=plugins"
  }
]
</script>

<template>
  <section class="sticky top-0 bg-white p-4 border-b border-zinc-200">
    <div class="flex text-xl font-bold text-zinc-900">Integrations</div>
    <TabbedPane :active-tab="activeTab" :tabs="tabs" class="mt-2" />
  </section>
</template>