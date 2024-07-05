<script setup lang="ts">
const route = useRoute();

if (!route.query.tab) {
  await navigateTo('/admin/settings?tab=general');
}

const activeTab = computed(() => (route.query.tab as string));

const tabs = [
  {
    id: "general",
    display: "General",
    icon: "codicon:settings",
  },
  {
    id: "members",
    display: "Members",
    icon: "fluent:people-20-regular",
  }
]
</script>

<template>
  <div class="flex text-xl font-bold text-zinc-900 px-4">Settings</div>
  <ul class="flex space-x-2 border-b pb-4 items-center mt-2 mb-4 px-4">
    <div class="bg-zinc-100 flex p-1 space-x-1 rounded-xl border border-zinc-200">
      <NuxtLink :to="`/admin/settings?tab=${tab.id}`" v-for="tab in tabs" custom
      v-slot="{ href, navigate }">
      <li class="mr-0.5 md:mr-0">
        <a class="flex items-center px-2.5 py-2 text-zinc-500"
          :class="activeTab == tab.id ? 'text-zinc-950 rounded-xl bg-white border border-zinc-200' : 
          'hover:bg-zinc-50 hover:rounded-xl'" 
          :href="href" @click="navigate">
          <Icon class="w-5 h-5 shrink-0 fill-current mr-2" :name="tab.icon" />
          <span class="text-sm" :class="activeTab == tab.id ? 'font-semibold' : ''">{{ tab.display }}</span>
        </a>
      </li>
    </NuxtLink>
    </div>
  </ul>
</template>