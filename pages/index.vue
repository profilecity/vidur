<script setup lang="ts">
const postings = useFetch('/api/public/postings');
</script>

<template>
  <main class="grow">
    <div class="h-56 bg-slate-200 dark:bg-slate-900">
      <img class="object-cover h-full w-full" src="/company-bg.jpg" width="2560" height="440"
        alt="Company background" />
    </div>
    <!-- Header -->
    <header class="text-center bg-slate-50 dark:bg-slate-800/20 pb-6 border-b border-slate-200 dark:border-slate-700">
      <div class="px-4 sm:px-6 lg:px-8 w-full">
        <div class="max-w-3xl mx-auto">

          <!-- Avatar -->
          <div class="-mt-12 mb-2">
            <div class="inline-flex -ml-1 -mt-1 sm:mb-0">
              <img class="rounded-full border-4 border-white dark:border-slate-900" src="/company-logo.png" width="104"
                height="104" alt="Avatar" />
            </div>
          </div>

          <!-- Company name and info -->
          <div class="mb-4">
            <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-2">The Nirvana Labs</h2>
            <p>Join us in building next generation profiles infra for everyone 🚀</p>
          </div>
          <!-- Meta -->
          <div class="inline-flex flex-wrap justify-center sm:justify-start space-x-4">
            <div class="flex items-center">
              <Icon class="w-4 h-4 fill-current shrink-0 text-slate-400" name="grommet-icons:location" />
              <span class="text-sm font-medium whitespace-nowrap text-slate-500 dark:text-slate-400 ml-2">
                Boston, MA
              </span>
            </div>
            <div class="flex items-center">
              <Icon name="tdesign:link" class="w-4 h-4 fill-current shrink-0 text-slate-400" />
              <a class="text-sm font-medium whitespace-nowrap text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 ml-2"
                href="https://thenirvanalabs.com">thenirvanalabs.com</a>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div class="max-w-3xl mx-auto">
        <h3 class="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-6">
          Open Positions at The Nirvana Labs
        </h3>
        <div class="space-y-2" v-if="postings.data.value">
          <PostingCard v-for="posting in postings.data.value" :key="posting.id" :posting="posting" />
        </div>
      </div>
    </div>
  </main>
</template>