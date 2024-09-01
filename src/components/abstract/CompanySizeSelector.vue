<script setup lang="ts">
const COMPANY_SIZE_OPTIONS = [
  { id: 0, title: '1 to 10', logo: 'clarity:employee-group-line' },
  { id: 1, title: '10 to 50', logo: 'clarity:employee-group-line' },
  { id: 2, title: '50 to 200', logo: 'clarity:employee-group-line' },
  { id: 3, title: '200 to 1k', logo: 'clarity:employee-group-line' },
  { id: 4, title: '1k to 5k', logo: 'clarity:employee-group-line' },
  { id: 5, title: '5k+', logo: 'clarity:employee-group-line' },
]

import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue?: number;
}>();

const emit = defineEmits<{
  'update:modelValue': [],
}>();

const selectedOption = useVModel(props, 'modelValue', emit);
</script>

<template>
  <AbstractDropdownSingleSelect title="Select Company Size" :options="COMPANY_SIZE_OPTIONS"
    v-model="selectedOption" />
</template>