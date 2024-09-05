<script setup lang="ts">
import type { SelectableOption } from '~~/shared/types/general';
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  modelValue: string[];
  title: string;
  options: SelectableOption[];
}>();

const emits = defineEmits<{
  'update:modelValue': [string[]];
}>();

const selectedOptions = useVModel(props, 'modelValue', emits);
const selectionTracker = ref<string[]>(props.modelValue);

const confirm = (closeFn: () => void) => {
  selectedOptions.value = selectionTracker.value;
  closeFn();
};

const clearAction = () => {
  selectionTracker.value = [];
};
</script>

<template>
  <Dropdown :title="title" :close-on-esc="true">
    <template #input="{ open }">
      <slot name="input" :open="open">
        <InputButton variant="secondary" @click.prevent="open">
          <span class="mr-2">{{ title }}</span>
          <Icon name="octicon:filter-16" class="w-4 h-4 fill-current" />
          <span
            class="text-xs text-white rounded-full bg-zinc-900 ml-1 w-5 h-5 flex items-center justify-center"
            v-if="selectedOptions.length > 0"
          >
            {{ selectedOptions.length }}
          </span>
        </InputButton>
      </slot>
    </template>
    <template #content="{ close }">
      <ul class="mb-4">
        <li class="py-1 px-3" v-for="option in options" :key="option.id">
          <label class="flex items-center">
            <input
              type="checkbox"
              class="form-checkbox"
              :value="option.id"
              v-model="selectionTracker"
            />
            <span class="text-sm font-medium ml-2">{{ option.title }}</span>
          </label>
        </li>
      </ul>
      <div
        class="p-2 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between"
      >
        <InputButton variant="secondary" size="sm" @click.prevent="clearAction">
          Clear
        </InputButton>
        <InputButton size="sm" @click.prevent="confirm(close)">
          Select
        </InputButton>
      </div>
    </template>
  </Dropdown>
</template>
