<script setup lang="ts">
import type { Hook } from '~/server/db/schema';
defineProps<{
  hook: Hook;
}>();
</script>

<template>
  <Modal title="Update Hook">
    <template #input="{ open }">
      <button class="btn btn-sm border border-zinc-200 hover:border-zinc-300 flex space-x-1 items-center" @click="open">
        <Icon name="mdi:edit" class="w-4 h-4" />
        <span>Edit</span>
      </button>
    </template>
    <template #content="{ close }">
      <AdminIntegrationHooksForm @updated="close" :hook="hook" />
    </template>
  </Modal>
</template>