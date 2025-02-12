<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});

useHead({
  title: 'Dashboard | Admin Panel',
});

const { data: postings } = await usePostingsRepository();
const { user: profile } = useUserSession();
</script>

<template>
  <div class="w-full max-w-9xl mx-auto">
    <section class="sticky top-0 bg-white p-4 border-b border-zinc-200">
      <VFrameHWithSubText>
        <template #heading>
          <span class="flex items-center space-x-2">
            <ElementsVidurSmall /><span>Welcome back, {{ profile ? profile.firstName : '' }}!</span>
          </span>
        </template>
        <template #subtext>Track your hiring activities. You are almost there.</template>
      </VFrameHWithSubText>
      <div class="flex items-center mt-4">
        <AdminPostingFormLauncher>
          <template #input="{ open }">
            <VInputButton variant="secondary" @click.stop="open">
              <span class="mr-2">Create Posting</span>
              <Icon name="ic:baseline-plus" class="w-4 h-4" />
            </VInputButton>
          </template>
        </AdminPostingFormLauncher>
      </div>
    </section>
    <div class="mt-4">
      <div class="max-w-2xl mx-auto mt-12" v-if="!postings.length">
        <div class="text-center px-4">
          <ElementsCube />
          <VH1>Create a job posting in just a few clicks!</VH1>
          <div class="flex w-full justify-center">
            <ul class="p-4 text-center mx-auto">
              <!-- List item -->
              <li class="relative py-2">
                <div class="flex items-center mb-1">
                  <div
                    class="absolute left-0 h-full w-0.5 bg-zinc-200 self-start ml-2.5 -tranzinc-x-1/2 tranzinc-y-3"
                    aria-hidden="true"
                  ></div>
                  <div class="absolute left-0 rounded-full bg-zinc-800" aria-hidden="true">
                    <Icon name="mdi:number-1" class="w-5 h-5 fill-current text-white" />
                  </div>
                  <VSubtext class="pl-9">Draft your first posting.</VSubtext>
                </div>
              </li>
              <!-- List item -->
              <li class="relative py-2">
                <div class="flex items-center mb-1">
                  <div
                    class="absolute left-0 h-full w-0.5 bg-zinc-200 self-start ml-2.5 -tranzinc-x-1/2 tranzinc-y-3"
                    aria-hidden="true"
                  ></div>
                  <div class="absolute left-0 rounded-full bg-zinc-800" aria-hidden="true">
                    <Icon name="mdi:number-2" class="w-5 h-5 fill-current text-white" />
                  </div>
                  <VSubtext class="pl-9">Finalise and publish.</VSubtext>
                </div>
              </li>
              <!-- List item -->
              <li class="relative py-2">
                <div class="flex items-center mb-1">
                  <div class="absolute left-0 rounded-full bg-zinc-800" aria-hidden="true">
                    <Icon name="mdi:number-3" class="w-5 h-5 fill-current text-white" />
                  </div>
                  <VSubtext class="pl-9">Start vetting applicants!</VSubtext>
                </div>
              </li>
            </ul>
          </div>
          <AdminPostingFormLauncher>
            <template #input="{ open }">
              <VInputButton @click="open">
                <Icon name="ic:baseline-plus" class="w-5 h-5" />
                <span class="ml-1">Create First Posting</span>
              </VInputButton>
            </template>
          </AdminPostingFormLauncher>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-6 p-4">
        <AdminPostingCard v-for="posting in postings" :key="posting.id" :posting="posting" />
      </div>
    </div>
  </div>
</template>
