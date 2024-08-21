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
        <InputButton variant="outline" @click="open" v-if="selectedOption">
          <Icon :name="selectedOption.logo" class="w-4 h-4 fill-current mr-2" v-if="selectedOption.logo" />
          <span>{{ selectedOption.title }}</span>
        </InputButton>
        <InputButton variant="outline"
          @click="open" v-else>
          <Icon name="octicon:filter-16" class="w-4 h-4 fill-current" />
          <span class="mr-2">{{ title }}</span>
        </InputButton>
      </slot>
    </template>
    <template #content="{ close }">
      <ul class="mb-4">
        <li v-for="option in options" :key="option.id">
          <InputButton variant="ghost" @click="setSelectedOption(option.id, close)">
            <Icon :name="option.logo" class="w-4 h-4 fill-current mr-2" v-if="option.logo" />
            <span>{{ option.title }}</span>
          </InputButton>
        </li>
      </ul>
    </template>
  </Dropdown>
</template>