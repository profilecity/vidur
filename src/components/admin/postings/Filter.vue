<script setup lang="ts">
defineProps<{
  postingIds: string[];
  postings: { id: string; title: string }[] | null;
}>();

const emits = defineEmits<{
  postingsSelected: [string[]];
}>();

const onPostingsSelected = (ids: string[]) => {
  emits("postingsSelected", ids);
}
</script>

<template>
  <AbstractOptionsSelectorDropdown title="Select Postings" :options="postings" :selected-ids="postingIds"
    @options-selected="onPostingsSelected" v-if="Array.isArray(postings)">
    <template #input="{ open }">
      <div class="flex items-center">
        <button ref="triggerRef"
            class="btn bg-white border-zinc-200 text-zinc-900 hover:border-slate-300 hover:text-slate-800"
            @click="open">
          <span class="mr-2">Select Postings</span>
          <Icon name="octicon:filter-16" class="w-4 h-4 fill-current" />
        </button>
      </div>
    </template>
  </AbstractOptionsSelectorDropdown>
</template>