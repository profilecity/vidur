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
const postingsById = ref<Record<string, string>>({}); // id <> title;

const { applicants, applications, fetch: fetchApplicants } = useApplications();
const { data: postings } = useFetch<{ id: string; title: string }[]>('/api/postings');

if (postingIdsQuery) {
  try {
    selectedPostings.value = postingIdsQuery.split(",").map(s => s.trim());
    fetchApplicants(selectedPostings.value);
  } catch (error) {
    console.error("Unable to select posting ids from query", error);
  }
}

watch(selectedPostings, fetchApplicants);

watchEffect(() => {
  const _postingsById: Record<string, string> = {};
  if (postings.value && postings.value.length > 0) {
    postings.value.forEach(p => _postingsById[p.id] = p.title);
  }
  postingsById.value = _postingsById;
})
</script>

<template>
  <AdminApplicationsHeader :postings v-model="selectedPostings" />
  <section class="p-4"v-if="selectedPostings.length > 0">
    <section class="mb-6" v-for="posting in selectedPostings" :key="posting">
      <div class="text-md" v-if="applications[posting]">
        <span class="font-noto font-bold mr-2">{{ postingsById[posting] || "" }}</span> <span class="bg-blue-100 px-2 py-1 border border-blue-300 rounded-lg text-blue-700 text-sm">{{ applications[posting]?.length }} Applicants</span>
      </div>
      <AdminApplicationsTable class="mt-4" :applicants="applicants" :applications="applications[posting]" v-if="applications[posting]"/>
    </section>
  </section>
  <AdminApplicationsEmptyState class="max-w-2xl mx-auto mt-12" v-else/>
</template>
