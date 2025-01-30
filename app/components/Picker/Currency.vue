<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { currencyDetails } from '~~/shared/consts/currencies';
import type { SelectableOption } from '~~/shared/types/general';

const props = defineProps<{
  modelValue?: string;
}>();

const selectedValue = useVModel(props, 'modelValue');

const options: SelectableOption[] = currencyDetails.map((c) => ({
  id: c.code,
  title: c.name,
  description: c.code,
}));
</script>

<template>
  <InputCombobox v-model="selectedValue" :options />
</template>
