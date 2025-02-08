<script setup lang="ts">
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
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
  }>(),
  { placeholder: 'Select a value' }
);

const selectedValue = useVModel(props, 'modelValue');
const selectedTitle = ref<string>();

const open = ref(false);

// Initialise title as per provided id.
selectedTitle.value = props.options.find((o) => o.id === props.modelValue)?.title;

watch(selectedTitle, (selectedTitle) => {
  if (!selectedTitle) return;

  const selectedOption = props.options.find((o) => o.title === selectedTitle);
  if (!selectedOption) return;

  selectedValue.value = selectedOption.id;
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
    <ComboboxAnchor
      class="border-x border-t min-w-[160px] w-full inline-flex items-center justify-between rounded-t-lg leading-none px-2"
      :class="{ '!border !rounded-lg': !open }"
    >
      <ComboboxInput as-child>
        <input type="text" @focus="open = true" class="input-css" />
      </ComboboxInput>
      <ComboboxTrigger as-child>
        <VInputButton variant="ghost" size="icon-xs" ref="comboboxTrigger">
          <Icon name="radix-icons:chevron-down" class="h-4 w-4" />
        </VInputButton>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent
      class="absolute z-10 w-full min-w-[160px] max-h-80 overflow-y-auto bg-white overflow-hidden data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade border rounded-b-lg p-2"
    >
      <ComboboxViewport>
        <ComboboxEmpty class="text-sm text-zinc-500 text-center py-2" />
        <!-- TODO: it's possible to have grouped strucutre, see docs. removed for now to KISS -->
        <ComboboxItem v-for="option in options" :key="option.id" :value="option.title" as-child>
          <div
            class="text-sm rounded-lg flex items-center px-6 data-[disabled]:pointer-events-none cursor-pointer data-[highlighted]:outline-none data-[highlighted]:bg-zinc-200 mb-2"
          >
            <span class="flex flex-col">
              <span class="font-bold">{{ option.title }}</span>
              <span class="text-xs" v-if="option.description">{{ option.description }}</span>
            </span>
            <ComboboxItemIndicator class="absolute left-0 w-6 inline-flex items-center justify-center">
              <Icon name="radix-icons:check" />
            </ComboboxItemIndicator>
          </div>
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
