<script setup lang="ts">
import type { JobPosting } from '~~/server/db/schema';

const props = defineProps<{
  posting: JobPosting;
}>();

const iconBgColor = getPsuedoRandomColor(props.posting.id);

const tags = ref<string[]>([]);
if (props.posting && props.posting.tagsCSV) {
  tags.value = props.posting.tagsCSV.split(',').map((t) => t.trim());
}
</script>

<template>
  <div class="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-sm rounded-xl border border-zinc-200">
    <div class="flex flex-col h-full p-5">
      <header>
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="`bg-${iconBgColor}-200`">
            <Icon class="w-5 h-5 shrink-0 text-zinc-800" name="hugeicons:permanent-job" />
          </div>
          <div class="flex shrink-0 -space-x-3 -ml-px">
            <InputButton as="NuxtLink" variant="secondary" size="sm" :to="'/admin/applications?postings=' + posting.id">
              {{ posting.totalApplicants }} Applicants
            </InputButton>
          </div>
        </div>
      </header>
      <div class="grow mt-2">
        <NuxtLink class="inline-flex text-gray-800 hover:text-gray-900 mb-1" :to="`/postings/${posting.id}`">
          <h2 class="text-xl leading-snug font-semibold font-noto">
            {{ posting.title }}
          </h2>
        </NuxtLink>
        <div class="flex flex-wrap items-center" v-if="posting.tagsCSV">
          <span
            class="mt-2 inline-flex text-sm text-zinc-800 rounded-lg text-center py-1 px-2 border border-zinc-200 mr-2"
            v-for="tag in tags"
            >{{ tag }}</span
          >
        </div>
      </div>
      <footer class="mt-5">
        <div class="text-sm font-medium text-gray-500 mb-2">Created {{ timeAgo(new Date(posting.createdAt)) }}</div>
        <div class="flex justify-between items-center">
          <div
            class="text-xs font-medium rounded-lg text-center px-2.5 py-1 bg-red-100 text-red-700"
            v-if="posting.isExpired"
          >
            Expired
          </div>
          <div
            class="text-xs font-medium rounded-lg text-center px-2.5 py-1 bg-green-100 text-green-700"
            v-else-if="posting.isPublished"
          >
            Published
          </div>
          <div class="text-xs font-medium rounded-lg text-center px-2.5 py-1 bg-sky-100 text-sky-700" v-else>Draft</div>
          <InputButton as="NuxtLink" variant="outline" size="icon" :to="'/admin/postings/edit?id=' + posting.id"
            ><Icon name="iconamoon:edit" class="w-5 h-5" />
          </InputButton>
        </div>
      </footer>
    </div>
  </div>
</template>
