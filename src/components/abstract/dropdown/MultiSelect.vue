<script setup lang="ts">
import type { SelectableOption } from "~/types/general";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: string[];
  title: string;
  options: SelectableOption[];
}>();

const emits = defineEmits<{
  "update:modelValue": [string[]];
}>();

const selectedOptions = useVModel(props, "modelValue", emits);
const selectionTracker = ref<string[]>(props.modelValue);

const confirm = (closeFn: () => void) => {
  selectedOptions.value = selectionTracker.value;
  closeFn();
}

const clearAction = () => {
  selectionTracker.value = [];
}
</script>

<template>
  <Dropdown :title="title" :close-on-esc="true">
    <template #input="{ open }">
      <slot name="input" :open="open">
        <button class="btn bg-white border-zinc-200 text-zinc-900 hover:border-slate-300 hover:text-slate-800"
          @click="open">
          <span class="mr-2">{{ title }}</span>
          <Icon name="octicon:filter-16" class="w-4 h-4 fill-current" />
          <span class="text-xs text-white rounded-full bg-zinc-900 ml-1 w-5 h-5 flex items-center justify-center"
            v-if="selectedOptions.length > 0">
            {{ selectedOptions.length }}
          </span>
        </button>
      </slot>
    </template>
    <template #content="{ close }">
      <ul class="mb-4">
        <li class="py-1 px-3" v-for="option in options" :key="option.id">
          <label class="flex items-center">
            <input type="checkbox" class="form-checkbox" :value="option.id" v-model="selectionTracker" />
            <span class="text-sm font-medium ml-2">{{ option.title }}</span>
          </label>
        </li>
      </ul>
      <div class="p-2 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between">
        <button class="btn-xs bg-white border-zinc-200 hover:border-zinc-300 text-zinc-500 hover:text-zinc-600"
          @click="clearAction">
          Clear
        </button>
        <button class="btn-xs btn-primary" @click="confirm(close)">
          Select
        </button>
      </div>
    </template>
  </Dropdown>
</template>