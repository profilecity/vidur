<script setup lang="ts">
defineProps<{
  id: string;
  labelClass?: string;
  error?: string;
  label?: string;
}>();
</script>

<template>
  <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" :class="labelClass" :for="id">
    {{ label }} <span class="text-xs ml-1 text-rose-500" v-if="error">{{ error }}</span>
  </label>
</template>