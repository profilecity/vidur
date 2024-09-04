<script setup lang="ts">
const props = defineProps<{
  tabGroup: TabGroup;
}>();

const { activeTab, tabs } = useTabGroup(props.tabGroup);
</script>

<template>
  <main>
    <section class="sticky top-0 bg-white w-full p-4 border-b">
      <TabbedPane :active-tab="activeTab" :tabs="tabs" />
      <div class="flex w-full items-center justify-between mt-4 mb-2">
        <div class="flex-col">
          <span class="flex text-xl font-bold text-zinc-900 font-noto">{{
            activeTab.title
          }}</span>
          <span class="flex text-sm text-zinc-600">{{
            activeTab.description
          }}</span>
        </div>
        <slot name="action" />
      </div>
    </section>
    <slot name="content" />
  </main>
</template>
