<script setup lang="ts">
const HANDLE_OPTIONS = [
  { id: 'instagram', title: 'Instagram', logo: 'mdi:instagram' },
  { id: 'twitter', title: 'Twitter', logo: 'mdi:twitter' },
  { id: 'linkedin', title: 'LinkedIn', logo: 'mdi:linkedin' },
  { id: 'discord', title: 'Discord', logo: 'ic:baseline-discord' },
  { id: 'github', title: 'GitHub', logo: 'mdi:github' },
];

import { useVModel } from '@vueuse/core';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [];
}>();

const selectedHandle = useVModel(props, 'modelValue', emit);
</script>

<template>
  <AbstractDropdownSingleSelect title="Select Platform" :options="HANDLE_OPTIONS" v-model="selectedHandle" />
</template>
