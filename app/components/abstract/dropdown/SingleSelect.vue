<script setup lang="ts">
import type { SelectableOption } from '~~/shared/types/general';
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  modelValue?: SelectableOption['id'];
  title: string;
  options: SelectableOption[];
  onlySelectedLogo?: boolean;
}>();

const emits = defineEmits<{
  'update:modelValue': [SelectableOption['id']];
}>();

const selectedOptionId = useVModel(props, 'modelValue', emits);
const selectedOption = computed(() => {
  if (selectedOptionId.value !== undefined) {
    return props.options.find((o) => o.id === selectedOptionId.value);
  }
});

const setSelectedOption = (id: SelectableOption['id'], closeFn: () => void) => {
  selectedOptionId.value = id;
  closeFn();
};
</script>

<template>
  <Dropdown :title="title" :close-on-esc="true">
    <template #input="{ open }">
      <slot name="input" :open="open">
        <VInputButton class="space-x-2" variant="outline" @click.prevent="open" v-if="selectedOption !== undefined">
          <Icon
            :name="selectedOption.logo"
            class="w-4 h-4 fill-current"
            :class="selectedOption.logoClass"
            v-if="selectedOption.logo"
          />
          <span v-if="!onlySelectedLogo">{{ selectedOption.title }}</span>
        </VInputButton>
        <VInputButton class="space-x-2" variant="outline" @click="open" v-else>
          <Icon name="octicon:filter-16" class="w-4 h-4 fill-current" />
          <span class="mr-2">{{ title }}</span>
        </VInputButton>
      </slot>
    </template>
    <template #content="{ close }">
      <ul class="mb-4">
        <li v-for="option in options" :key="option.id">
          <VInputButton variant="ghost" @click.prevent="setSelectedOption(option.id, close)">
            <Icon :name="option.logo" class="w-4 h-4 fill-current mr-2" :class="option?.logoClass" v-if="option.logo" />
            <span>{{ option.title }}</span>
          </VInputButton>
        </li>
      </ul>
    </template>
  </Dropdown>
</template>
