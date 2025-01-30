<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  id?: string;
  placeholder: string;

  modelValue?: string | number | null;
  inputClass?: string;
  labelClass?: string;
  typeOverride?: string;

  error?: string;
  label?: string;
  sublabel?: string;
}>();

const model = useVModel(props, 'modelValue');
const localModel = ref<string | null>(props.modelValue ? props.modelValue.toString() : null);

watch(localModel, (v) => {
  if (!v) return;
  if (props.typeOverride && props.typeOverride === 'number') {
    model.value = parseFloat(v);
  } else {
    model.value = v;
  }
});
</script>

<template>
  <InputLabel :label-class :label :error :id :sublabel>
    <template #input>
      <input
        class="input-css"
        :type="typeOverride || 'text'"
        :class="inputClass"
        v-model="localModel"
        :placeholder
        :id
      />
    </template>
  </InputLabel>
</template>

<style scoped>
.input-css {
  @apply w-full py-1.5 px-2.5 border border-zinc-200 rounded-lg text-sm placeholder:text-zinc-400 focus:ring-1 focus:ring-inset focus:ring-zinc-300 sm:text-sm sm:leading-6 outline-none;
}
</style>
