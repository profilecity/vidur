<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

useHead({
  title: 'Applications | Admin Panel'
})

const route = useRoute();

const postingIdsQuery = route.query.postings as string | undefined;

const selectedPostings = ref<string[]>([]);

const { applicants, applications, fetch: fetchApplicants } = useApplications();

// TODO;
// const showEmptyPage = computed(() => selectedPostings.value.length == 0);

if (postingIdsQuery) {
  try {
    selectedPostings.value = postingIdsQuery.split(",").map(s => s.trim());
  } catch (error) {
    console.error("Unable to select posting ids from query", error);
  }
}

const onPostingsSelected = (postingIds: string[]) => {
  selectedPostings.value = postingIds;
}

watch(selectedPostings, (selectedPostings) => {
  fetchApplicants(selectedPostings);
})
</script>

<template>
<AdminApplicationsHeader :posting-ids="selectedPostings" @postings-selected="onPostingsSelected"/>
</template>