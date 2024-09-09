<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

useHead({
  title: 'Dashboard | Admin Panel',
});

const { data: postings } = await usePostingsRepository();
const { profile } = useAuth();
</script>

<template>
  <div class="w-full max-w-9xl mx-auto">
    <section class="sticky top-0 bg-white p-4 border-b border-zinc-200">
      <div class="text-xl font-bold text-zinc-900 font-noto">👋🏽 Hello, {{ profile.firstName }}</div>
      <div class="text-sm text-zinc-500">Track your hiring activities. You are almost there!</div>
      <div class="flex items-center mt-4">
        <InputButton as="NuxtLink" variant="secondary" to="/admin/postings/new">
          <span class="mr-2">Create Posting</span>
          <Icon name="ic:baseline-plus" class="w-4 h-4" />
        </InputButton>
      </div>
    </section>
    <div class="mt-4">
      <div class="max-w-2xl mx-auto mt-12" v-if="!postings.length">
        <div class="text-center px-4">
          <ElementsCube />
          <h2 class="text-2xl text-zinc-800 font-bold mb-2">Create a job posting in just a few clicks!</h2>
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
                  <h3 class="text-lg font-bold text-zinc-800 pl-9">Draft your first posting.</h3>
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
                  <h3 class="text-lg font-bold text-zinc-800 pl-9">Finalise and publish.</h3>
                </div>
              </li>
              <!-- List item -->
              <li class="relative py-2">
                <div class="flex items-center mb-1">
                  <div class="absolute left-0 rounded-full bg-zinc-800" aria-hidden="true">
                    <Icon name="mdi:number-3" class="w-5 h-5 fill-current text-white" />
                  </div>
                  <h3 class="text-lg font-bold text-zinc-800 pl-9">Start vetting applicants!</h3>
                </div>
              </li>
            </ul>
          </div>
          <InputButton as="NuxtLink" to="/admin/postings/edit">
            <Icon name="ic:baseline-plus" class="w-5 h-5" />
            <span class="ml-1">Create First Posting</span>
          </InputButton>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-6 p-4">
        <AdminPostingCard v-for="posting in postings" :key="posting.id" :posting="posting" />
      </div>
    </div>
  </div>
</template>
