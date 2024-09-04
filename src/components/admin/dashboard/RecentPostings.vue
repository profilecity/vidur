<script setup lang="ts">
import type { JobPosting } from '~/server/db/schema';

defineProps<{
  postings: JobPosting[];
}>();
</script>
<template>
  <div
    class="bg-white rounded-lg border border-zinc-200 w-full md:w-2/3 lg:w-1/2"
  >
    <header class="px-5 py-4 border-b border-zinc-100">
      <h2 class="font-semibold text-zinc-800">Active Postings</h2>
    </header>
    <div class="p-3">
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full" v-if="postings.length > 0">
          <!-- Table header -->
          <thead class="text-xs uppercase text-zinc-400 bg-zinc-50 rounded-xl">
            <tr>
              <th class="p-2">
                <div class="font-semibold text-left">title</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-center">total applicants</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-center">actions</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm font-medium divide-y divide-zinc-100">
            <!-- Row -->
            <tr v-for="posting in postings">
              <td class="p-2">
                <div class="text-zinc-800">{{ posting.title }}</div>
              </td>
              <td class="p-2">
                <div class="text-center">{{ posting.totalApplicants }}</div>
              </td>
              <td class="p-2">
                <div class="flex w-full justify-center space-x-2">
                  <Icon name="tabler:share" class="w-4 h-4" />
                  <Icon name="majesticons:open" class="w-4 h-4" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="text-xs uppercase text-zinc-400 bg-zinc-50 rounded-sm p-3 font-bold"
          v-else
        >
          No Active Postings Found
        </div>
        <div class="text-center border-t border-zinc-100">
          <NuxtLink
            to="/admin/postings"
            class="block text-sm font-medium text-zinc-500 hover:text-zinc-600 py-3"
          >
            View All Postings<Icon name="ep:right" class="w-4 h-4 ml-1" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
