<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string;
  options: { id: string, title: string }[];
  valid?: boolean;
  confirmLabel?: string;
  allowClear?: boolean;
  selectedIds?: string[];
}>(), { valid: true, confirmLabel: 'Apply', allowClear: true, selectedIds: () => [] });

const emits = defineEmits<{
  optionsSelected: [string[]];
}>();

const selectedOptions = ref<(string)[]>(props.selectedIds);

const makeConfirmAction = (closeFn: () => void) => {
  if (!props.valid) return;

  emits('optionsSelected', selectedOptions.value);
  closeFn();
}

const clearAction = () => {
  selectedOptions.value = [];
}
</script>

<template>
  <Dropdown :title="title" :close-on-esc="true">
    <template #input="{ open }">
      <slot name="input" :open="open" />
    </template>
    <template #content="{ close }">
      <ul class="mb-4">
        <li class="py-1 px-3" v-for="option in options" :key="option.id">
          <label class="flex items-center">
            <input type="checkbox" class="form-checkbox" :value="option.id" v-model="selectedOptions" />
            <span class="text-sm font-medium ml-2">{{ option.title }}</span>
          </label>
        </li>
      </ul>
      <div class="py-2 px-3 border-t border-zinc-200 bg-zinc-50">
        <ul class="flex items-center justify-between">
          <li>
            <button class="btn bg-white border-zinc-200 hover:border-zinc-300 text-zinc-500 hover:text-zinc-600"
              v-if="allowClear" @click="clearAction">
              Clear
            </button>
          </li>
          <li>
            <button class="btn bg-zinc-900 hover:bg-zinc-800 text-white" @click="makeConfirmAction(close)">
              {{ confirmLabel }}
            </button>
          </li>
        </ul>
      </div>
    </template>
  </Dropdown>
</template>