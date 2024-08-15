<script setup lang="ts">
import type { SelectableOption } from "~/types/general";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: SelectableOption['id'];
  title: string;
  options: SelectableOption[];
}>();

const emits = defineEmits<{
  "update:modelValue": [SelectableOption['id']];
}>();

const selectedOptionId = useVModel(props, "modelValue", emits);
const selectedOption = computed(() => {
  if (selectedOptionId.value) {
    return props.options.find(o => o.id === selectedOptionId.value);
  }
})

const setSelectedOption = (id: SelectableOption['id'], closeFn: () => void) => {
  selectedOptionId.value = id;
  closeFn();
}
</script>

<template>
  <Dropdown :title="title" :close-on-esc="true">
    <template #input="{ open }">
      <slot name="input" :open="open">
        <button class="btn bg-white border-zinc-200 text-zinc-900 hover:border-slate-300 hover:text-slate-800"
          @click="open" v-if="selectedOption">
          <Icon :name="selectedOption.logo" class="w-4 h-4 fill-current mr-2" v-if="selectedOption.logo" />
          <span>{{ selectedOption.title }}</span>
        </button>
        <button class="btn bg-white border-zinc-200 text-zinc-900 hover:border-slate-300 hover:text-slate-800 space-x-2 items-center"
          @click="open" v-else>
          <Icon name="octicon:filter-16" class="w-4 h-4 fill-current" />
          <span class="mr-2">{{ title }}</span>
        </button>
      </slot>
    </template>
    <template #content="{ close }">
      <ul class="mb-4">
        <li class="py-1 px-3" v-for="option in options" :key="option.id">
          <button class="text-zinc-900 hover:text-slate-800"
            @click="setSelectedOption(option.id, close)">
            <Icon :name="option.logo" class="w-4 h-4 fill-current mr-2" v-if="option.logo" />
            <span>{{ option.title }}</span>
          </button>
        </li>
      </ul>
    </template>
  </Dropdown>
</template>