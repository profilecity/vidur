<script setup lang="ts">
withDefaults(
  defineProps<{
    inputLabel?: string;
  }>(),
  {
    inputLabel: 'Create Hook',
  }
);
</script>

<template>
  <Modal title="Create New hook" description="Hooks allow you to send events to external systems securely.">
    <template #input="{ open }">
      <InputButton @click="open">
        <span>{{ inputLabel }}</span>
        <Icon name="ic:baseline-plus" class="ml-1 w-5 h-5" />
      </InputButton>
    </template>
    <template #content="{ close }">
      <AdminHooksForm @created="close" />
    </template>
  </Modal>
</template>
