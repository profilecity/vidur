<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  id: string;
  placeholder: string;

  modelValue?: string;
  inputClass?: string;
  labelClass?: string;
  typeOverride?: string;

  error?: string;
  label?: string;
}>();

const model = useVModel(props, "modelValue")
</script>

<template>
  <div>
    <InputLabel :labelClass :label :error :id/>
    <input
      class="input-css"
      :type="typeOverride || 'text'"
      :class="inputClass" v-model="model" :placeholder :id>
  </div>
</template>

<style scoped>
.input-css {
  @apply w-full py-2 px-4 border border-zinc-200 rounded-xl text-sm placeholder:text-zinc-400 focus:ring-1 focus:ring-inset focus:ring-zinc-300 sm:text-sm sm:leading-6 outline-none;
}
</style>