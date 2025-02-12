<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();

const emits = defineEmits<{
  clear: [string];
}>();

const heading = () => {
  switch (props.error.statusCode) {
    case 404:
      return 'Not Found';
    default:
      return 'Something Went Wrong';
  }
};
</script>

<template>
  <div class="flex flex-col text-center items-center space-y-2">
    <Icon name="fluent-color:dismiss-circle-16" class="w-32 h-32" />
    <span class="text-xl font-bold font-noto">{{ heading() }}</span>
    <span class="font-noto text-zinc-700" v-if="error.message">{{ error.message }}</span>
    <VInputButton variant="link" class="my-32" @click="emits('clear', '/')">Go Home</VInputButton>
  </div>
</template>
