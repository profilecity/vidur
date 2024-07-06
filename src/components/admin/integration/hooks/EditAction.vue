<script setup lang="ts">
import type { Hook } from '~/server/db/schema';
defineProps<{
  hook: Hook;
}>();
</script>

<template>
  <Modal title="Update Hook">
    <template #input="{ open }">
      <button class="btn btn-sm border border-zinc-200 hover:border-zinc-300 flex space-x-2 items-center text-zinc-700" @click="open">
        <Icon name="iconamoon:edit" class="w-5 h-5" />
      </button>
    </template>
    <template #content="{ close }">
      <AdminIntegrationHooksForm @updated="close" :hook="hook" />
    </template>
  </Modal>
</template>