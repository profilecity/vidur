<script setup lang="ts">
const { data: hooks } = await useHooksRepository();
const showEmptyState = computed(() => hooks.value.length == 0);
</script>

<template>
  <VFrameTabbed tab-group="integration">
    <template #action>
      <div class="flex space-x-2">
        <AdminHooksNewAction />
      </div>
    </template>
    <template #content>
      <AdminHooksEmptyState class="mt-8" v-if="showEmptyState" />
      <div class="mt-4 px-4" v-else>
        <div class="grid grid-cols-12 gap-6 mt-2">
          <AdminHooksCard v-for="hook in hooks" :key="hook.id" :hook="hook" />
        </div>
      </div>
    </template>
  </VFrameTabbed>
</template>
