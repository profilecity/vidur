<script setup lang="ts">
import type { Hook } from '~~/server/db/schema';
defineProps<{
  hook: Hook;
}>();
</script>

<template>
  <Modal title="Update Hook" description="Changes take effect immediatly. Previous system will stop receiving events.">
    <template #input="{ open }">
      <VInputButton variant="outline" size="icon" @click="open">
        <Icon name="iconamoon:edit" />
      </VInputButton>
    </template>
    <template #content="{ close }">
      <AdminHooksForm @updated="close" :hook="hook" />
    </template>
  </Modal>
</template>
