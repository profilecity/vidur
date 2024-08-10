<script setup lang="ts">
const { data: postings } = await usePublicPostings();
const { data: generalSettings } = await usePublicGeneralSettings();

let title: string = "Careers"; // TODO: need better defaults (this will hardly be the case);
let description: string = "Career Site"; // TODO: need better defaults (this will hardly be the case);
if (generalSettings.value) {
  const seoTitle = generalSettings.value.seo.title;
  const generalName = generalSettings.value.organization.name;

  const seoDescription = generalSettings.value.seo.description;
  const generalDescription = generalSettings.value.organization.description;

  if (seoTitle) {
    title = seoTitle;
  } else if (generalName) {
    title = `Careers @ ${generalName}`
  }
  if (seoDescription) {
    description = seoDescription;
  } else if (generalDescription) {
    description = generalDescription;
  }
}

useHead({
  title: title,
})

useSeoMeta({
  title: title,
  description: description,

  ogType: 'website',
  ogUrl: useRuntimeConfig().public.origin,
  ogTitle: title,
  ogDescription: description,

  twitterCard: 'summary',
  twitterTitle: title,
  twitterDescription: description,
  twitterCreator: generalSettings.value?.seo.twitter,
})

const logoURL = useRemoteAsset(generalSettings.value?.organization.logo as string).url;
</script>

<template>
  <main class="grow">
    <div class="h-56 bg-zinc-200">
      <img class="object-cover h-full w-full" src="/company-bg.png" width="2560" height="440"
        alt="Company background" />
    </div>
    <!-- Header -->
    <header class="text-center bg-white pb-6 border-b border-zinc-100">
      <div class="px-4 sm:px-6 lg:px-8 w-full">
        <div class="max-w-3xl mx-auto">

          <!-- Avatar -->
          <div class="-mt-12 mb-6">
            <div class="inline-flex -ml-1 -mt-1 sm:mb-0 p-2 bg-zinc-600/30 rounded-2xl backdrop-blur-sm">
              <img class="w-24 rounded-2xl border border-zinc-600" :src="logoURL" alt="Avatar" />
            </div>
          </div>

          <!-- Company name and info -->
          <div class="mb-4">
            <h2 class="text-2xl text-zinc-800 font-bold mb-2">{{ generalSettings?.organization.name }}</h2>
            <p>{{ generalSettings?.organization.description }}</p>
          </div>
          <!-- Meta -->
          <div class="inline-flex flex-wrap justify-center sm:justify-start space-x-4">
            <div class="flex items-center" v-if="generalSettings?.organization.location">
              <Icon class="w-4 h-4 fill-current shrink-0 text-zinc-400" name="grommet-icons:location" />
              <span class="text-sm font-medium whitespace-nowrap text-zinc-400 ml-1">
                {{ generalSettings?.organization.location }}
              </span>
            </div>
            <div v-for="link in (generalSettings.organization.links.slice(0, 3))" :key="link.href"
              class="flex items-center" v-if="generalSettings?.organization.links">
              <Icon name="tdesign:link" class="w-4 h-4 fill-current shrink-0 text-zinc-400" />
              <a class="text-sm font-medium whitespace-nowrap text-blue-500 hover:text-blue-600 ml-1"
                :href="link.href">{{ link.title }}</a>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div class="max-w-3xl mx-auto">
        <h3 class="text-xl leading-snug text-zinc-800 font-bold mb-6">
          Open Positions at Nirvana Labs
        </h3>
        <div class="space-y-2" v-if="postings">
          <PostingCard v-for="posting in postings" :key="posting.id" :posting="posting" />
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