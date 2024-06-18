<script setup lang="ts">
const route = useRoute();
const auth = await useAuth();
const id = route.params.id;

if (!id) {
  throw createError({
    statusCode: 400,
    statusMessage: 'Posting ID required.'
  })
}

const posting = await useFetch('/api/public/posting', { query: { id } });

const tags = ref<string[]>([]);
if (posting.data.value && posting.data.value.tagsCSV) {
  tags.value = posting.data.value.tagsCSV.split(",").map(t => t.trim());
}

// @ts-ignore
let applicationStatus = null;
if (auth.user.value) {
  applicationStatus = await useFetch('/api/application-status', { query: { postingId: id } });
}

const isApplying = ref(false);
const apply = async () => {
  try {
    if (!auth.user.value) {
      await auth.signIn();
      return;
    }
    isApplying.value = true;
    await $fetch('/api/application', { method: 'POST', body: { postingId: id } });
    applicationStatus?.refresh();
  } catch (e) {
    console.error("Error occured while applying", e);
  } finally {
    isApplying.value = false;
  }
}
</script>

<template>
  <main class="grow" v-if="posting.data.value">
    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full">
      <!-- Page content -->
      <div class="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">
        <!-- Content -->
        <div class="w-full">
          <div class="mb-6">
            <NuxtLink class="btn-sm px-3 bg-white border-zinc-200 hover:border-zinc-300 text-slate-600 border" to="/">
              <Icon class="fill-current text-zinc-500 mr-2" name="mdi:arrow-left" />
              <span>Back To Jobs</span>
            </NuxtLink>
          </div>
          <div class="text-sm text-slate-500 italic mb-2">
            Posted {{ formatDate(new Date(posting.data.value.updatedAt)) }}
          </div>
          <header class="mb-4">
            <!-- Title -->
            <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">
              {{ posting.data.value.title }}
            </h1>
          </header>
          <!-- Company information (mobile) -->
          <div class="bg-white p-5 shadow-lg rounded-sm border border-slate-200 mb-6 lg:hidden">
            <div class="text-center mb-6">
              <div class="inline-flex mb-3">
                <img class="w-16 h-16 rounded-full" src="/company-logo.png" width="64" height="64"
                  alt="The Nirvana Labs" />
              </div>
              <div class="text-lg font-bold text-slate-800 mb-1">The Nirvana Labs</div>
            </div>
            <div class="space-y-4 sm:flex sm:space-y-0 sm:space-x-2">
              <div class="flex w-full items-center justify-center text-green-500 space-x-2" v-if="applicationStatus?.data.value?.userAlreadyApplied">
                <Icon name="teenyicons:tick-circle-solid" class="w-4 h-4"/>
                <span>Applied</span>
              </div>
              <button class="btn w-full bg-zinc-900 hover:bg-zinc-800 text-white" @click="apply"
                :disabled="isApplying" v-else>Apply Today
                <Icon class="fill-current ml-1" name="mdi:arrow-right" />
              </button>
              <div class="flex items-center w-full justify-center text-xs text-slate-500 italic mr-4">Powered by <img
                  src="/vidur-logo.svg" class="h-4 ml-2"></div>
            </div>
          </div>

          <!-- Tags -->
          <div class="mb-6" v-if="posting.data.value.tagsCSV">
            <div class="flex flex-wrap items-center -m-1">
              <div class="m-1">
                <span
                  class="text-xs inline-flex font-medium bg-indigo-100/30 text-indigo-600 rounded-full text-center px-2.5 py-1 border border-indigo-600 mr-2"
                  v-for="tag in tags">{{ tag }}</span>
              </div>
            </div>
          </div>

          <hr class="my-6 border-t border-slate-200" />

          <p class="w-full" style="white-space: pre-line;">{{ posting.data.value.contents }}</p>

        </div>

        <!-- Sidebar -->
        <div class="hidden lg:block space-y-4">

          <!-- Company information (desktop) -->
          <div class="bg-white p-5 shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80">
            <div class="text-center mb-6">
              <div class="inline-flex mb-3">
                <img class="w-16 h-16 rounded-full" src="/company-logo.png" width="64" height="64" alt="Company 01" />
              </div>
              <div class="text-lg font-bold text-slate-800 mb-1">The Nirvana Labs</div>
            </div>
            <div class="space-y-2">
              <div class="flex w-full items-center justify-center text-green-500 space-x-2" v-if="applicationStatus?.data.value?.userAlreadyApplied">
                <Icon name="teenyicons:tick-circle-solid" class="w-4 h-4"/>
                <span>Applied</span>
              </div>
              
              <button class="btn w-full bg-zinc-900 hover:bg-zinc-800 text-white" @click="apply" :disabled="isApplying"
                v-else>Apply Today
                <Icon class="fill-current ml-1" name="mdi:arrow-right" />
              </button>
              
              <div class="flex items-center w-full justify-center text-xs text-slate-500 italic mr-4 mt-2">Powered by <img
                  src="/vidur-logo.svg" class="h-4 ml-2"></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </main>
</template>