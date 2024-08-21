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
      <InputButton @click="open">
        <span>{{ inputLabel }}</span>
        <Icon name="ic:baseline-plus" class="ml-1 w-5 h-5" />
      </InputButton>
    </template>
    <template #content="{ close }">
      <AdminIntegrationHooksForm @created="close"/>
    </template>
  </Modal>
</template>