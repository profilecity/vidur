<script setup lang="ts">
import type { JobPosting } from "~/server/db/schema";

const props = defineProps<{
  posting: JobPosting;
}>();

const statusColor = (props.posting.isPublished) ? "bg-emerald-100 text-emerald-600" : "bg-zinc-100 text-zinc-500";
</script>

<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap md:w-1/2">
      <NuxtLink :to="'/admin/postings/edit?id=' + posting.id" class="font-medium text-zinc-800">{{ posting.title }}</NuxtLink>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">{{ timeAgo(new Date(posting.createdAt)) }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">
        <div class="text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1"
          :class="statusColor">{{ posting.isPublished ? "Published" : "Draft" }}</div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="text-right font-medium">{{ posting.totalApplicants }}</div>
    </td>
  </tr>
</template>