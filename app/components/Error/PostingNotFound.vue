<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
  error: NuxtError;
}>();

const emits = defineEmits<{
  clear: [string];
}>();
</script>

<template>
  <div class="flex flex-col text-center items-center space-y-2">
    <Icon name="fluent-color:beach-16" class="w-64 h-64" />
    <span class="text-xl font-bold font-noto">Job posting not found.</span>
    <span class="font-noto text-zinc-700">Provided URL is invalid, or posting has expired.</span>
    <VInputButton variant="link" class="my-32" @click="emits('clear', '/')">Explore active postings</VInputButton>
  </div>
</template>
