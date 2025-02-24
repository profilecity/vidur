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
  <div class="flex flex-col w-full form-input-container rounded-default" v-if="label">
    <Label class="block text-sm font-medium mb-1 text-zinc-900 font-noto pl-0.5" :class="labelClass" :for="id">
      {{ label }}
      <span class="text-xs ml-1 text-rose-500" v-if="error">{{ error }}</span>
      <br v-if="sublabel" />
      <span class="text-zinc-600 text-xs" v-if="sublabel">{{ sublabel }}</span>
    </Label>
    <slot name="input" />
  </div>
  <slot name="input" v-else />
</template>
