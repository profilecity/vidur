<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

useHead({
  title: 'Applications | Admin Panel',
});

const route = useRoute();

const postingIdsQuery = route.query.postings as string | undefined;

const selectedPostings = ref<string[]>([]);
const postingsById = ref<Record<string, string>>({}); // id <> title;

const { applicants, applications, fetch: fetchApplicants } = useApplications();
const { data: postings, refresh } = await usePostingsLiteRepository({
  immediate: false,
});

onMounted(refresh);

if (postingIdsQuery) {
  try {
    selectedPostings.value = postingIdsQuery.split(',').map((s) => s.trim());
    fetchApplicants(selectedPostings.value);
  } catch (error) {
    console.error('Unable to select posting ids from query', error);
  }
}

watch(selectedPostings, fetchApplicants);

watchEffect(() => {
  const _postingsById: Record<string, string> = {};
  if (postings.value && postings.value.length > 0) {
    postings.value.forEach((p) => (_postingsById[p.id] = p.title));
  }
  postingsById.value = _postingsById;
});
</script>

<template>
  <FrameUntabbed title="View Applications">
    <template #action>
      <AbstractDropdownMultiSelect
        class="mt-2"
        title="Select Postings"
        :options="postings"
        v-model="selectedPostings"
      />
    </template>
    <template #content>
      <section
        class="p-4 mt-2"
        v-for="posting in selectedPostings"
        :key="posting"
        v-if="selectedPostings.length > 0"
      >
        <div class="text-md" v-if="applications[posting]">
          <span class="font-noto font-bold mr-2">
            {{ postingsById[posting] || '' }}
          </span>
          <span
            class="bg-blue-100 px-2 py-1 border border-blue-300 rounded-lg text-blue-700 text-sm"
          >
            {{ applications[posting]?.length }} Applicants
          </span>
        </div>
        <div class="text-sm">
          <AdminApplicationRow
            class="my-2"
            v-for="application in applications[posting]"
            :key="application.id"
            :applicant="applicants[application.candidateId]!"
            :application="application"
          />
        </div>
      </section>
      <div class="text-center px-4 mt-12" v-else>
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-t from-zinc-200 to-zinc-100 mb-4"
        >
          <svg class="w-5 h-6 fill-current" viewBox="0 0 20 24">
            <path
              class="text-zinc-500"
              d="M10 10.562l9-5-8.514-4.73a1 1 0 00-.972 0L1 5.562l9 5z"
            />
            <path
              class="text-zinc-300"
              d="M9 12.294l-9-5v10.412a1 1 0 00.514.874L9 23.294v-11z"
            />
            <path
              class="text-zinc-400"
              d="M11 12.294v11l8.486-4.714a1 1 0 00.514-.874V7.295l-9 4.999z"
            />
          </svg>
        </div>
        <h2 class="text-2xl text-zinc-800 font-bold mb-2">
          Start by selecting postings.
        </h2>
        <h3 class="text-md font-bold text-zinc-500 pl-9">
          Select postings from dropdown to start seeing applicant profiles.
        </h3>
      </div>
    </template>
  </FrameUntabbed>
</template>
