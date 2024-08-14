<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: string[];
  postings: { id: string; title: string }[];
}>();

const emits = defineEmits<{
  "update:modelValue": [string[]];
}>();

const postingIds = useVModel(props, "modelValue", emits);
</script>

<template>
  <section class="sticky top-0 bg-white p-4 border-b">
    <div class="flex text-xl font-bold text-zinc-900">Applications</div>
    <AbstractDropdownMultiSelect class="mt-2 pt-4" title="Select Postings" :options="postings" v-model="postingIds" />
  </section>
</template>