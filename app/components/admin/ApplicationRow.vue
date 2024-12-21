<script setup lang="ts">
const props = defineProps<{
  applicant: Applicant;
  application: Application;
}>();

const candidate = props.applicant.candidate;
</script>

<template>
  <div
    class="flex bg-white border border-zinc-200 rounded-xl items-center justify-between py-2 px-4"
    v-if="props.applicant && candidate"
  >
    <div class="flex">
      <div class="font-medium text-zinc-800">
        <span class="font-bold">
          {{ candidate.firstName + ' ' + candidate.lastName }}
        </span>
        <br />
        <span class="text-zinc-700">{{ candidate.email }}</span>
      </div>
    </div>
    <div class="flex items-center justify-between space-x-20">
      <div class="whitespace-nowrap">
        <div class="text-left">
          {{ timeAgo(new Date(application.createdAt)) }}
        </div>
      </div>
    </div>
  </div>
</template>
