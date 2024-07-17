<script setup lang="ts">
import type { JobPosting } from "~/server/db/schema";

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

useHead({
  title: 'Postings | Admin Panel'
})

const postings = await useFetch<JobPosting[]>('/api/posting');
</script>

<template>
  <div class="w-full max-w-9xl mx-auto">
    <!-- Page header -->
    <AdminPostingsHeader/>

    <div class="mt-4">
      <div class="max-w-2xl mx-auto mt-12" v-if="!postings.data.value?.length">
        <AdminPostingsEmptyState />
      </div>
      <!-- <AdminPostingsTable :postings="postings.data.value" v-else/> -->
      <div class="grid grid-cols-12 gap-6 p-4">
        <AdminPostingsCard v-for="posting in postings.data.value" :key="posting.id" :posting="posting" />
      </div>
    </div>
  </div>
</template>