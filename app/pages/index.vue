<script setup lang="ts">
const { data: postings } = await usePublicPostings();
const { generalSettings } = usePublicGeneralSettings();

let title: string = 'Careers'; // TODO: need better defaults (this will hardly be the case);
let description: string = 'Career Site'; // TODO: need better defaults (this will hardly be the case);
if (generalSettings.value) {
  const seoTitle = generalSettings.value.seo.title;
  const generalName = generalSettings.value.careerSite.name;

  const seoDescription = generalSettings.value.seo.description;
  const generalBio = generalSettings.value.careerSite.bio;

  if (seoTitle) {
    title = seoTitle;
  } else if (generalName) {
    title = `Careers @ ${generalName}`;
  }
  if (seoDescription) {
    description = seoDescription;
  } else if (generalBio) {
    description = generalBio;
  }
}

useHead({
  title: title,
});

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
});
</script>

<template>
  <main class="grow w-full lg:w-2/3 mx-auto mt-20 p-2">
    <SiteHeader />
    <h3 class="text-lg leading-snug text-zinc-600 font-bold mt-8 mb-2">
      Open Positions
    </h3>
    <div class="space-y-2" v-if="postings">
      <PostingCard
        v-for="posting in postings"
        :key="posting.id"
        :posting="posting"
      />
    </div>
  </main>
  <div class="flex fixed bottom-5 right-5 lg:bottom-10 lg:right-10">
    <div class="relative z-50">
      <a href="https://www.vidurjobs.xyz">
        <div
          class="flex items-center px-4 py-2 rounded-lg backdrop-blur-md text-sm border border-zinc-200 shadow-md"
        >
          <p class="mr-2">Powered By</p>
          <img class="w-16" src="/vidur-logo.svg" alt="Avatar" />
        </div>
      </a>
    </div>
  </div>
</template>
