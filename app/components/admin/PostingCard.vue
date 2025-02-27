<script setup lang="ts">
import type { JobPosting } from '~~/server/db/schema';
import { differenceInDays } from 'date-fns';

const props = defineProps<{
  posting: JobPosting;
}>();

const iconBgColor = getPsuedoRandomColor(props.posting.id);

const tags = ref<string[]>([]);
if (props.posting && props.posting.tagsCSV) {
  tags.value = props.posting.tagsCSV.split(',').map((t) => t.trim());
}

const expiryMessage = computed(() => {
  if (!props.posting.validTill) return '';
  const expiryDate = new Date(props.posting.validTill);
  const daysLeft = differenceInDays(expiryDate, new Date());
  if (daysLeft === 0) return 'Expires today';
  if (daysLeft === 1) return 'Expires tomorrow';
  if (daysLeft > 1) return `Expires in ${daysLeft} days`;
  return '';
});
</script>

<template>
  <div class="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-sm rounded-default border border-zinc-200">
    <div class="flex flex-col h-full p-3">
      <header>
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="`bg-${iconBgColor}-200`">
            <Icon class="w-5 h-5 shrink-0 text-zinc-800" name="hugeicons:permanent-job" />
          </div>
          <div class="flex space-x-1 items-center">
            <div class="flex shrink-0 -space-x-3 -ml-px">
              <VInputButton
                as="NuxtLink"
                variant="secondary"
                size="sm"
                :to="'/admin/applications?postings=' + posting.id"
              >
                {{ posting.totalApplicants }} Applicants
              </VInputButton>
            </div>
            <AdminPostingFormLauncher :posting :full-screen="true">
              <template #input="{ open }">
                <VInputButton variant="outline" size="icon-sm" @click.stop="open">
                  <Icon name="iconamoon:edit" class="w-4 h-4" />
                </VInputButton>
              </template>
            </AdminPostingFormLauncher>
          </div>
        </div>
      </header>
      <div class="grow mt-2">
        <NuxtLink class="inline-flex text-gray-800 hover:text-gray-900 mb-1" :to="`/postings/${posting.id}`">
          <VH3>{{ posting.title }}</VH3>
        </NuxtLink>
        <div class="flex flex-wrap items-center space-x-2" v-if="posting.tagsCSV">
          <span
            class="mt-2 inline-flex text-xs text-zinc-800 rounded-default text-center py-0.5 px-1 border bg-zinc-100"
            v-for="tag in tags"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <footer class="mt-5">
        <VSubtext size="xs" class="mt-10">Created {{ timeAgo(new Date(posting.createdAt)) }}</VSubtext>
        <div class="flex justify-between items-center">
          <div
            class="text-xs font-medium rounded-default text-center mt-2 px-2.5 py-1 bg-red-100 text-red-700"
            v-if="posting.isExpired"
          >
            Expired
          </div>
          <div
            class="text-xs font-medium rounded-default text-center mt-2 px-2.5 py-1 bg-green-100 text-green-700"
            v-else-if="posting.isPublished"
          >
            Published
          </div>
          <div class="text-xs font-medium rounded-default text-center px-2.5 py-1 bg-sky-100 text-sky-700" v-else>
            Draft
          </div>
          <div v-if="expiryMessage" class="text-xs text-red-600 mt-2">
            {{ expiryMessage }}
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
