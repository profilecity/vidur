<script setup lang="ts">
useSeoMeta({
  title: 'Careers @ TheNirvanaLabs',
  description: 'Apply for job openings at The Nirvana Labs!',
})
const postings = useFetch('/api/public/postings');
</script>

<template>
  <main class="grow">
    <div class="h-56 bg-zinc-200 dark:bg-zinc-900">
      <img class="object-cover h-full w-full" src="/company-bg.png" width="2560" height="440"
        alt="Company background" />
    </div>
    <!-- Header -->
    <header class="text-center bg-white dark:bg-zinc-800/20 pb-6 border-b border-zinc-100">
      <div class="px-4 sm:px-6 lg:px-8 w-full">
        <div class="max-w-3xl mx-auto">

          <!-- Avatar -->
          <div class="-mt-12 mb-6">
            <div class="inline-flex -ml-1 -mt-1 sm:mb-0 p-2 bg-zinc-600/30 rounded-2xl backdrop-blur-sm">
              <img class="w-24 rounded-2xl border border-zinc-600" src="/company-logo.png" alt="Avatar" />
            </div>
          </div>

          <!-- Company name and info -->
          <div class="mb-4">
            <h2 class="text-2xl text-zinc-800 dark:text-zinc-100 font-bold mb-2">Nirvana Labs</h2>
            <p>Join us. Make the People's Search. Better.</p>
          </div>
          <!-- Meta --> 
          <div class="inline-flex flex-wrap justify-center sm:justify-start space-x-4">
            <div class="flex items-center">
              <Icon class="w-4 h-4 fill-current shrink-0 text-zinc-400" name="grommet-icons:location" />
              <span class="text-sm font-medium whitespace-nowrap text-zinc-400 dark:text-zinc-400 ml-1">
                San Francisco, CA
              </span>
            </div>
            <div class="flex items-center">
              <Icon name="tdesign:link" class="w-4 h-4 fill-current shrink-0 text-zinc-400" />
              <a class="text-sm font-medium whitespace-nowrap text-blue-500 hover:text-blue-600 ml-1"
                href="https://thenirvanalabs.com">thenirvanalabs.com</a>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div class="max-w-3xl mx-auto">
        <h3 class="text-xl leading-snug text-zinc-800 dark:text-zinc-100 font-bold mb-6">
          Open Positions at Nirvana Labs
        </h3>
        <div class="space-y-2" v-if="postings.data.value">
          <PostingCard v-for="posting in postings.data.value" :key="posting.id" :posting="posting" />
        </div>
      </div>
    </div>
  </main>
  <div class="flex fixed bottom-5 right-5 lg:bottom-10 lg:right-10">
    <div class="relative z-50">
      <a href="https://vidurjobs.xyz">
      <div class="flex items-center px-4 py-2 rounded-lg backdrop-blur-md text-sm border border-zinc-200 shadow-md">
        <p class="mr-2">Powered By</p>
        <img class="w-16" src="/vidur-logo.svg" alt="Avatar" />
      </div>
    </a>
    </div>
  </div>
</template>