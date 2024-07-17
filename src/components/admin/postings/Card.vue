<script setup lang="ts">
import type { JobPosting } from "~/server/db/schema";

const props = defineProps<{
  posting: JobPosting;
}>();

const iconBgColor = getPsuedoRandomColor(props.posting.id);

const tags = ref<string[]>([]);
if (props.posting && props.posting.tagsCSV) {
  tags.value = props.posting.tagsCSV.split(",").map(t => t.trim());
}
</script>

<template>
  <div class="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-sm rounded-xl border">
    <div class="flex flex-col h-full p-5">
      <header>
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            :class="`bg-${iconBgColor}-200`">
            <Icon class="w-6 h-6 md:w-6 md:h-6 shrink-0 fill-current" name="hugeicons:permanent-job" />
          </div>
          <div class="flex shrink-0 -space-x-3 -ml-px">
            <NuxtLink
              class="text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 bg-zinc-50 hover:bg-zinc-100"
              :to="'/admin/applications?postings=' + posting.id">
              {{ posting.totalApplicants }} Applicants
            </NuxtLink>
          </div>
        </div>
      </header>
      <div class="grow mt-2">
        <NuxtLink class="inline-flex text-gray-800 hover:text-gray-900 mb-1" :to="`/postings/${posting.id}`">
          <h2 class="text-xl leading-snug font-semibold">{{ posting.title }}</h2>
        </NuxtLink>
        <div class="flex flex-wrap items-center mt-1" v-if="posting.tagsCSV">
          <span
              class="text-xs inline-flex font-medium bg-zinc-100/30 text-zinc-800 rounded-xl text-center px-1 py-0.5 border border-zinc-500 mr-2"
              v-for="tag in tags">{{ tag }}</span>
        </div>
      </div>
      <footer class="mt-5">
        <div class="text-sm font-medium text-gray-500 mb-2">Created {{ timeAgo(new Date(posting.createdAt)) }}</div>
        <div class="flex justify-between items-center">
          <div class="text-xs font-medium rounded-full text-center px-2.5 py-1 bg-green-500/20 text-green-700"
            v-if="posting.isPublished">
            Published
          </div>
          <div class="text-xs font-medium rounded-full text-center px-2.5 py-1 bg-zinc-50 text-zinc-500" v-else>
            Draft
          </div>
          <NuxtLink class="btn-xs text-sm font-medium text-white hover:bg-zinc-800 bg-zinc-900 flex items-center"
            :to="'/admin/postings/edit?id=' + posting.id"><span>Edit</span>
            <Icon name="mdi:arrow-right" />
          </NuxtLink>
        </div>
      </footer>
    </div>
  </div>
</template>