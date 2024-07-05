<script setup lang="ts">
type Tab = {
  id: string;
  display: string;
  icon: string;
  url: string;
}

defineProps<{
  tabs: Tab[];
  activeTab: string;
}>();
</script>

<template>
  <div class="flex items-center">
    <div class="bg-zinc-100 flex p-1 space-x-1 rounded-xl border border-zinc-200">
      <NuxtLink :to="tab.url" v-for="tab in tabs" class="flex items-center px-2.5 py-2 text-zinc-500 rounded-xl"
        :class="activeTab == tab.id ? 'text-zinc-950 bg-white border border-zinc-200' : 'hover:bg-zinc-50'">
        <Icon class="w-5 h-5 shrink-0 fill-current mr-2" :name="tab.icon" />
        <span class="text-sm" :class="activeTab == tab.id ? 'font-semibold' : ''">{{ tab.display }}</span>
      </NuxtLink>
    </div>
  </div>
</template>