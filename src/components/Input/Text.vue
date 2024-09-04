<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  id: string;
  placeholder: string;

  modelValue?: string | null;
  inputClass?: string;
  labelClass?: string;
  typeOverride?: string;

  error?: string;
  label?: string;
}>();

const model = useVModel(props, 'modelValue');
</script>

<template>
  <fieldset>
    <InputLabel :label-class :label :error :id />
    <input
      class="input-css"
      :type="typeOverride || 'text'"
      :class="inputClass"
      v-model="model"
      :placeholder
      :id
    />
  </fieldset>
</template>

<style scoped>
.input-css {
  @apply w-full py-1.5 px-2.5 border border-zinc-200 rounded-lg text-sm placeholder:text-zinc-400 focus:ring-1 focus:ring-inset focus:ring-zinc-300 sm:text-sm sm:leading-6 outline-none;
}
</style>
