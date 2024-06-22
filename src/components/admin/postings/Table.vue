<script setup lang="ts">
import type { JobPosting } from "~/server/db/schema";

defineProps<{
  postings: JobPosting[];
}>();
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table-auto w-full">
      <!-- Table header -->
      <thead
        class="text-xs font-semibold uppercase text-zinc-500 border-t border-b border-zinc-200">
        <tr>
          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="font-semibold text-left">Title</div>
          </th>
          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="font-semibold text-left">Posted On</div>
          </th>
          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="font-semibold text-left">Status</div>
          </th>
          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="font-semibold text-right">Applicants</div>
          </th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody
        class="text-sm divide-y divide-zinc-200 border-b border-zinc-200">
        <AdminPostingsRow v-for="posting in postings" :key="posting.id" :posting="posting" />
      </tbody>
    </table>

  </div>
</template>