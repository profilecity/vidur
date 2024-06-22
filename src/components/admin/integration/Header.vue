<script setup lang="ts">
const route = useRoute();

if (!route.query.tab) {
  await navigateTo('/admin/integrations?tab=hooks');
}

const activeTab = computed(() => (route.query.tab as string));

const tabs = [
  {
    id: "hooks",
    display: "Hooks",
    icon: "tabler:fish-hook",
  },
  {
    id: "plugins",
    display: "Plugins",
    icon: "mingcute:plugin-2-line",
  }
]
</script>

<template>
  <ul class="flex flex-nowrap space-x-2 overflow-x-scroll no-scrollbar pb-2 border-b">
    <NuxtLink :to="`/admin/integrations?tab=${tab.id}`" v-for="tab in tabs" custom
      v-slot="{ href, navigate }">
      <li class="mr-0.5 md:mr-0 md:mb-0.5">
        <a class="flex items-center px-2.5 py-2 rounded-xl whitespace-nowrap"
          :class="activeTab == tab.id ? 'bg-zinc-950 text-white border' : 'hover:bg-zinc-200'" :href="href" @click="navigate">
          <Icon class="w-4 h-4 shrink-0 fill-current mr-2" :name="tab.icon" />
          <span class="text-sm font-medium">{{ tab.display }}</span>
        </a>
      </li>
    </NuxtLink>
  </ul>
</template>