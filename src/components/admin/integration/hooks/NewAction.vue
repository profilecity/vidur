<script setup lang="ts">
withDefaults(defineProps<{
  inputLabel?: string;
}>(), {
  inputLabel: "Create Hook"
});
</script>

<template>
  <Modal title="Create New hook">
    <template #input="{ open }">
      <button class="btn bg-zinc-900 hover:bg-zinc-800 text-white" @click="open">
        <Icon name="ic:baseline-plus" class="w-5 h-5" />
        <span class="ml-1">{{ inputLabel }}</span>
      </button>
    </template>
    <template #content="{ close }">
      <AdminIntegrationHooksForm @created="close"/>
    </template>
  </Modal>
</template>