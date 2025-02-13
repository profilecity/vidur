<script setup lang="ts">
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from 'radix-vue';
import type { SelectableOption } from '~~/shared/types/general';
import { useVModel } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    modelValue?: SelectableOption['id'];
    options: SelectableOption[];
    placeholder?: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
  }>(),
  { placeholder: 'Select a value', side: 'bottom' }
);

const selectedOptionId = useVModel(props, 'modelValue');

// Initialise title as per provided id.
const selectedTitle = ref<string | undefined>(props.options.find((o) => o.id === props.modelValue)?.title);

const open = ref(false);

watch(selectedTitle, (selectedTitle) => {
  if (!selectedTitle) return;

  const selectedOption = props.options.find((o) => o.title === selectedTitle);
  if (!selectedOption) return;

  selectedOptionId.value = selectedOption.id;
});

const filterFunction = (_: string[], searchTerm: string) => {
  return props.options
    .filter((option) => {
      const searchTermFiltered = searchTerm.toLowerCase();
      const inTitle = option.title.toLowerCase().includes(searchTermFiltered);
      const inId = option.id.toString().toLowerCase().includes(searchTermFiltered);
      const inDescription = !!option.description?.toLowerCase().includes(searchTermFiltered);

      return inTitle || inId || inDescription;
    })
    .map((o) => o.title);
};
</script>

<template>
  <ComboboxRoot v-model:open="open" v-model="selectedTitle" class="relative" :filter-function="filterFunction">
    <ComboboxAnchor>
      <ComboboxInput as-child>
        <input type="text" @focus="open = true" class="form-input min-w-[160px]" />
      </ComboboxInput>
      <ComboboxTrigger as-child>
        <VInputButton variant="ghost" size="icon-xs" ref="comboboxTrigger" class="absolute right-1 top-0 h-full">
          <Icon name="radix-icons:chevron-down" class="h-4 w-4" />
        </VInputButton>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent
      class="absolute top-10 z-10 w-full min-w-[160px] max-h-80 overflow-y-auto bg-white overflow-hidden border rounded-b-lg"
      :class="{
        'animate-slideDownAndFade': side === 'top',
        'animate-slideUpAndFade': side === 'bottom',
        'animate-slideLeftAndFade': side === 'right',
        'animate-slideRightAndFade': side === 'left',
      }"
      :side
    >
      <ComboboxViewport>
        <ComboboxEmpty class="text-sm text-zinc-500 text-center py-2" />
        <!-- TODO: it's possible to have grouped strucutre, see docs. removed for now to KISS -->
        <ComboboxItem
          class="text-left form-input hover:bg-primary-bg/60 my-1 mx-auto !w-[96%] data-[highlighted]:!bg-primary-bg/60"
          :class="`${option.id === selectedOptionId ? '!bg-primary-bg' : ''}`"
          v-for="option in options"
          :key="option.id"
          :value="option.title"
        >
          <span class="font-bold">{{ option.title }}</span>
          <span class="text-xs ml-2" v-if="option.description">{{ option.description }}</span>
        </ComboboxItem>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>

<style scoped>
.input-css {
  @apply w-full border-none text-sm rounded-lg placeholder:text-zinc-400 sm:text-sm sm:leading-6 outline-none focus:ring-0 !px-0;
}
</style>
