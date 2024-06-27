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
    <div class="flex justify-between items-center pb-4 border-b border-zinc-300">
      <!-- Left: Title -->
      <div class="mb-4 sm:mb-0">
        <h1 class="text-xl md:text-2xl text-zinc-800 font-bold flex items-center">
          <Icon class="w-6 h-6 md:w-8 md:h-8 shrink-0 fill-current mr-2" name="hugeicons:permanent-job" />Postings
        </h1>
      </div>
      <!-- Right: Actions -->
      <NuxtLink to="/admin/postings/edit" class="btn bg-zinc-900 hover:bg-zinc-800 text-white">
        <Icon name="ic:baseline-plus" class="w-5 h-5"/>
        <span class="ml-1">New Posting</span>
      </NuxtLink>
    </div>

    <div class="mt-4">
      <div class="max-w-2xl mx-auto mt-12" v-if="!postings.data.value?.length">
        <AdminPostingsEmptyState  />
      </div>
      <AdminPostingsTable :postings="postings.data.value" v-else/>
    </div>
  </div>
</template>