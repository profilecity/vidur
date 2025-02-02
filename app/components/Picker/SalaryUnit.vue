<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { salaryUnits } from '~~/shared/consts/posting';
import type { SelectableOption } from '~~/shared/types/general';

const props = defineProps<{
  modelValue?: string;
}>();

const selectedValue = useVModel(props, 'modelValue');

const options: SelectableOption[] = salaryUnits.map((c) => ({
  id: c,
  title: c,
}));
</script>

<template>
  <VInputOption v-model="selectedValue" :options />
</template>
