<script setup lang="ts">
import { Label } from 'radix-vue';

defineProps<{
  id?: string;
  labelClass?: string;
  error?: string;
  label?: string;
  sublabel?: string;
}>();
</script>

<template>
  <Label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" :class="labelClass" :for="id">
    {{ label }}
    <br v-if="sublabel" />
    <span class="text-zinc-600 text-xs" v-if="sublabel">{{ sublabel }}</span>
    <span class="text-xs ml-1 text-rose-500" v-if="error">{{ error }}</span>
  </Label>
</template>
