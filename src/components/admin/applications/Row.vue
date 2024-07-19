<script setup lang="ts">
const props = defineProps<{
  applicant: Applicant;
  application: Application;
}>();

const user = props.applicant.user;
</script>

<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap md:w-1/2">
      <div class="flex items-center">
        <div class="w-9 h-9 shrink-0 mr-2 sm:mr-3">
          <img class="rounded-full" :src="user.picture || undefined" width="36" height="36" :alt="`${user.firstName}'s Profile Picture'`" />
        </div>
        <div class="font-medium text-gray-800">
          <span class="font-bold">{{ user.firstName + " " + user.lastName }}</span><br>
          <span class="text-zinc-700">{{ user.email }}</span>
        </div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <HandleFlexStrip :handles="applicant.handles"/>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">{{ timeAgo(new Date(application.createdAt)) }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <a target="_blank" :href="applicant.handles.find(h => h.key == 'resume')?.value" class="btn-xs">View Resume</a>
    </td>
  </tr>
</template>