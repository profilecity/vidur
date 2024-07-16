<script setup lang="ts">
defineProps<{
  postingIds: string[];
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
    <AdminApplicationsPostingsFilter class="mt-2 pt-4" :posting-ids="postingIds" @postings-selected="onPostingsSelected"/>
  </section>
</template>