<script setup lang="ts">
const { data: postings } = await usePublicPostingsRepository();
const { data: careerSiteConfig } = useCareerSiteConfigObjectState();
const { data: seoConfig } = useSeoConfigObjectState();
const totalActivePostings = useTotalActivePostingsState();
const publicConfig = useRuntimeConfig().public;

let title: string = 'Careers'; // TODO: need better defaults (this will hardly be the case);
let description: string = 'Career Site'; // TODO: need better defaults (this will hardly be the case);
if (seoConfig.value.title) {
  title = seoConfig.value.title;
} else if (careerSiteConfig.value.name) {
  title = `Careers @ ${careerSiteConfig.value.name}`;
}
if (seoConfig.value.description) {
  description = seoConfig.value.description;
} else if (careerSiteConfig.value.bio) {
  description = careerSiteConfig.value.bio;
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
  twitterCreator: seoConfig.value.twitter,
});
</script>

<template>
  <main class="grow w-full lg:w-2/3 mx-auto mt-20 p-2">
    <SiteHeader />
    <h3 class="text-lg leading-snug text-zinc-600 font-bold mt-8 mb-2">
      Open Positions
      <VTag>{{ totalActivePostings }}</VTag>
    </h3>
    <div class="space-y-2" v-if="postings">
      <PostingCard v-for="posting in postings" :key="posting.id" :posting="posting" />
    </div>
  </main>
</template>
