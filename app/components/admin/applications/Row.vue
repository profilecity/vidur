<script setup lang="ts">
const props = defineProps<{
  applicant: Applicant;
  application: Application;
}>();

const user = props.applicant.user;
</script>

<template>
  <div
    class="flex bg-white border border-zinc-200 rounded-xl items-center justify-between py-2 px-4"
    v-if="props.applicant && user"
  >
    <div class="flex">
      <div class="flex items-center">
        <div class="w-10 h-10 mr-2">
          <img
            class="rounded-xl"
            :src="user.picture || undefined"
            width="36"
            height="36"
            :alt="`${user.firstName}'s Profile Picture'`"
          />
        </div>
        <div class="font-medium text-zinc-800">
          <span class="font-bold">{{
            user.firstName + ' ' + user.lastName
          }}</span
          ><br />
          <span class="text-zinc-700">{{ user.email }}</span>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between space-x-20">
      <div class="whitespace-nowrap">
        <HandleFlexStrip :handles="applicant.handles" />
      </div>
      <div class="whitespace-nowrap">
        <div class="text-left">
          {{ timeAgo(new Date(application.createdAt)) }}
        </div>
      </div>
      <InputButton
        variant="secondary"
        as="a"
        target="_blank"
        :href="props.applicant.handles.find((h) => h.key == 'resume')?.value"
      >
        View Resume
      </InputButton>
    </div>
  </div>
</template>
