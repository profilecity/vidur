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
  <VFormInput :label-class :label :error :id :sublabel>
    <template #input>
      <input
        class="form-input"
        :type="typeOverride || 'text'"
        :class="inputClass"
        v-model="localModel"
        :placeholder
        :id
      />
    </template>
  </VFormInput>
</template>

<style scoped></style>
