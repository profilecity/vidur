<script setup lang="ts">
const props = defineProps<{
  applicant: Applicant;
  application: Application;
}>();

const user = props.applicant.user;
</script>

<template>
  <div class="flex bg-white border border-zinc-200 rounded-xl items-center justify-between py-2 px-4">
    <div class="flex">
      <div class="flex items-center">
        <div class="w-10 h-10 mr-2">
          <img class="rounded-xl" :src="user.picture || undefined" width="36" height="36" :alt="`${user.firstName}'s Profile Picture'`" />
        </div>
        <div class="font-medium text-zinc-800">
          <span class="font-bold">{{ user.firstName + " " + user.lastName }}</span><br>
          <span class="text-zinc-700">{{ user.email }}</span>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between space-x-20">
      <div class="whitespace-nowrap">
        <HandleFlexStrip :handles="applicant.handles"/>
      </div>
      <div class="whitespace-nowrap">
        <div class="text-left">{{ timeAgo(new Date(application.createdAt)) }}</div>
      </div>
      <button class="btn whitespace-nowrap hover:border-zinc-300 hover:bg-zinc-100">
        <a target="_blank" :href="applicant.handles.find(h => h.key == 'resume')?.value">View Resume</a>
      </button>
    </div>
  </div>
</template>