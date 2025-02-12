<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import type { SelectableOption } from '~~/shared/types/general';

const { data: reviewTags } = await useReviewTagsRepository();

const options: SelectableOption[] = reviewTagGroupVsIndex
  .flatMap((_, i) => reviewTags.value.filter((rt) => rt.parent === i))
  .map((rt) => ({
    id: rt.id,
    title: rt.title,
    logo: 'material-symbols:circle',
    logoClass: `text-${reviewTagColorVsIndex[rt.parent]}-200 rounded-full border border-${reviewTagColorVsIndex[rt.parent]}-600`,
  }));

const props = defineProps<{
  modelValue?: number;
}>();

const selectedTag = useVModel(props, 'modelValue');
</script>

<template>
  <AbstractDropdownSingleSelect :options title="Select Tag" v-model="selectedTag" />
</template>
