<script setup lang="ts">
import type { JobPosting } from '~~/server/db/schema';

defineProps<{
  posting: JobPosting;
}>();
</script>

<template>
  <div class="rounded-default border px-5 py-4 bg-white border-zinc-200 w-full">
    <NuxtLink class="flex justify-between items-center w-full" :to="'/postings/' + posting.id">
      <!-- Left side -->
      <div class="w-1/2">
        <div class="inline-flex font-semibold text-zinc-900">
          {{ posting.title }}
        </div>
        <div class="text-sm text-zinc-500">
          {{
            posting.tagsCSV
              ?.split(',')
              .map((s) => s.trim())
              .join(' / ') || ' '
          }}
        </div>
      </div>
      <!-- Right side -->
      <div class="flex items-center space-x-4 w-1/2 justify-end">
        <div class="text-sm text-zinc-500 italic whitespace-nowrap">
          {{ timeAgo(new Date(posting.createdAt)) }}
        </div>
        <Icon name="mingcute:right-fill" class="w-4 h-4" />
      </div>
    </NuxtLink>
  </div>
</template>
