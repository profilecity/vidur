<script setup lang="ts">
import type { Hook } from '~/server/db/schema';
defineProps<{
  hook: Hook;
}>();
</script>

<template>
  <Modal
    title="Update Hook"
    description="Changes take effect immediatly. Previous system will stop receiving events."
  >
    <template #input="{ open }">
      <InputButton variant="outline" size="icon" @click="open">
        <Icon name="iconamoon:edit" />
      </InputButton>
    </template>
    <template #content="{ close }">
      <AdminIntegrationHooksForm @updated="close" :hook="hook" />
    </template>
  </Modal>
</template>
