<script setup lang="ts">
import type { JobPosting } from '~/server/db/schema';

const route = useRoute();
const auth = await useAuth();

const { checkIfOnboardPending } = useLazyOnboarder();

const id = route.params.id;

if (!id) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Posting ID required.'
  })
}

const postingRequest = useFetch('/api/public/posting', { query: { id } });

const posting: Ref<JobPosting | null> = ref(null);

watchEffect(() => {
  if (postingRequest.pending.value) {
    return;
  }
  if (postingRequest.data.value) {
    // @ts-expect-error
    posting.value = postingRequest.data.value;
  }
  if (postingRequest.error.value) {
    if (postingRequest.error.value.statusCode == 404) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Job posting not found. Make sure URL is correct.'
      })
    }
    console.error(postingRequest.error.value);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching job posting. Please check back later.'
    })
  }
})

useSeoMeta({
  title: () => posting.value?.title + " | The Nirvana Labs",
  description: () => 'Apply for ' + posting.value?.title + ' at The Nirvana Labs!',
})

const tags = ref<string[]>([]);
if (posting.value && posting.value.tagsCSV) {
  tags.value = posting.value.tagsCSV.split(",").map(t => t.trim());
}

// @ts-ignore
let applicationStatus = null;
if (auth.isSignedIn) {
  applicationStatus = useFetch('/api/application-status', { query: { postingId: id } });
}

const isApplying = ref(false);
const apply = async () => {
  try {
    isApplying.value = true;

    const isPending = await checkIfOnboardPending();
    if (isPending) return;

    await $fetch('/api/application', { method: 'POST', body: { postingId: id } });
    applicationStatus?.refresh();
  } catch (e) {
    console.error("Error occured while applying", e);
  } finally {
    isApplying.value = false;
  }
}

if (route.query.fromOnboard) {
  if (!(applicationStatus?.data.value?.userAlreadyApplied)) {
    apply();
  }
}
</script>

<template>
  <main class="grow" v-if="posting">
    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full">
      <!-- Page content -->
      <div class="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">
        <!-- Content -->
        <div class="w-full">
          <div class="mb-6">
            <NuxtLink class="btn-sm px-3 bg-white border-zinc-200 hover:border-zinc-300 text-zinc-600 border" to="/">
              <Icon class="fill-current text-zinc-500 mr-2" name="mdi:arrow-left" />
              <span>Back To Jobs</span>
            </NuxtLink>
          </div>
          <div class="text-sm text-zinc-500 italic mb-2">
            Posted {{ formatDate(new Date(posting.updatedAt)) }}
          </div>
          <header class="mb-4">
            <!-- Title -->
            <h1 class="text-2xl md:text-3xl text-zinc-800 font-bold">
              {{ posting.title }}
            </h1>
          </header>
          <!-- Company information (mobile) -->
          <div class="bg-white p-5 rounded-2xl border border-zinc-200 mb-6 lg:hidden">
            <div class="text-center mb-6">
              <div class="inline-flex mb-3">
                <img class="w-16 h-16 rounded-full" src="/company-logo.png" width="64" height="64" alt="Nirvana Labs" />
              </div>
              <div class="text-lg font-bold text-zinc-800 mb-1">Nirvana Labs</div>
            </div>
            <div class="space-y-4 sm:flex sm:space-y-0 sm:space-x-2">
              <div class="flex w-full items-center justify-center text-green-500 space-x-2"
                v-if="applicationStatus?.data.value?.userAlreadyApplied">
                <Icon name="teenyicons:tick-circle-solid" class="w-4 h-4" />
                <span>Applied</span>
              </div>
              <button class="btn w-full bg-zinc-900 hover:bg-zinc-800 text-white" @click="apply" :disabled="isApplying"
                v-else>Apply Today
                <Icon class="fill-current ml-1" name="mdi:arrow-right" />
              </button>
            </div>
          </div>

          <!-- Tags -->
          <div class="mb-6" v-if="posting.tagsCSV">
            <div class="flex flex-wrap items-center -m-1">
              <div class="m-1">
                <span
                  class="text-xs inline-flex font-medium bg-zinc-100/30 text-zinc-800 rounded-xl text-center px-2.5 py-1 border border-zinc-500 mr-2"
                  v-for="tag in tags">{{ tag }}</span>
              </div>
            </div>
          </div>

          <hr class="my-6 border-t border-zinc-100" />

          <p class="w-full" style="white-space: pre-line;">{{ posting.contents }}</p>

        </div>

        <!-- Sidebar -->
        <div class="hidden lg:block space-y-4">

          <!-- Company information (desktop) -->
          <div class="bg-white p-5 rounded-2xl border border-zinc-200 lg:w-72 xl:w-80">
            <div class="text-center mb-6">
              <div class="inline-flex mb-3">
                <img class="w-16 h-16 rounded-full" src="/company-logo.png" width="64" height="64" alt="Company 01" />
              </div>
              <div class="text-lg font-bold text-zinc-800 mb-1">Nirvana Labs</div>
            </div>
            <div class="space-y-2">
              <div class="flex w-full items-center justify-center text-green-500 space-x-2"
                v-if="applicationStatus?.data.value?.userAlreadyApplied">
                <Icon name="teenyicons:tick-circle-solid" class="w-4 h-4" />
                <span>Applied</span>
              </div>

              <button class="btn w-full bg-zinc-900 hover:bg-zinc-800 text-white" @click="apply" :disabled="isApplying"
                v-else>Apply Today
                <Icon class="fill-current ml-1" name="mdi:arrow-right" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  </main>
  <div class="flex fixed bottom-5 right-5 lg:bottom-10 lg:right-10">
    <div class="relative z-50">
      <a href="https://www.vidurjobs.xyz">
        <div class="flex items-center px-4 py-2 rounded-lg backdrop-blur-md text-sm border border-zinc-200 shadow-md">
          <p class="mr-2">Powered By</p>
          <img class="w-16" src="/vidur-logo.svg" alt="Avatar" />
        </div>
      </a>
    </div>
  </div>
</template>