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
  <section class="sticky top-0 bg-white p-4 border-b">
    <div class="flex text-xl font-bold text-zinc-900">Applications</div>
    <AdminPostingsFilter class="mt-2 pt-4" @postings-selected="onPostingsSelected" :postings :posting-ids/>
  </section>
</template>