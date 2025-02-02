<script setup lang="ts">
withDefaults(
  defineProps<{
    VFormInput?: string;
  }>(),
  {
    VFormInput: 'Create Hook',
  }
);
</script>

<template>
  <Modal title="Create New hook" description="Hooks allow you to send events to external systems securely.">
    <template #input="{ open }">
      <VInputButton @click="open">
        <span>{{ VFormInput }}</span>
        <Icon name="ic:baseline-plus" class="ml-1 w-5 h-5" />
      </VInputButton>
    </template>
    <template #content="{ close }">
      <AdminHooksForm @created="close" />
    </template>
  </Modal>
</template>
