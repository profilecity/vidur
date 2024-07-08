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
      <button class="btn bg-zinc-900 border border-zinc-900 hover:bg-zinc-700 text-white" @click="open">
        <span>{{ inputLabel }}</span>
        <Icon name="ic:baseline-plus" class="ml-1 w-5 h-5" />
      </button>
    </template>
    <template #content="{ close }">
      <AdminIntegrationHooksForm @created="close"/>
    </template>
  </Modal>
</template>