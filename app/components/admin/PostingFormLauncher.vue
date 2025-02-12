<script setup lang="ts">
import type { JobPosting } from '~~/server/db/schema';

defineProps<{
  posting?: JobPosting;
}>();
</script>

<template>
  <Modal :full-screen="true">
    <template #title-bar>
      <div class="flex items-center space-x-2">
        <Icon class="w-5 h-5 shrink-0 fill-current mr-2" name="iconamoon:edit" />
        <span v-if="!posting">New Posting</span>
        <span v-else>{{ posting.title }}</span>
      </div>
    </template>
    <template #input="{ open }">
      <slot name="input" :open />
    </template>
    <template #content="{ close }">
      <LazyAdminPostingForm :id="posting ? posting.id : undefined" @done="close" />
    </template>
  </Modal>
</template>
