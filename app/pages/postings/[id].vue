<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

const { data: posting } = await usePublicPostingRepository({ id });

if (!posting.value) {
  throw createError({
    statusCode: 404,
    message: 'No such posting found. Maybe the posting has expired.',
  });
}

const { data: careerSiteConfig } = useCareerSiteConfigObjectState();
const companyLogo = useRemoteAsset(careerSiteConfig.value.logo).url;

useHead({
  title: () => `${posting.value?.title + ' | ' || ''}${careerSiteConfig.value.name}`,
});

const tags = computed<string[]>(() => {
  if (posting.value && posting.value.tagsCSV) {
    return posting.value.tagsCSV.split(',').map((t) => t.trim());
  }
  return [];
});

const isApplying = ref(false);
const appliedSuccessfully = ref(false);
const apply = async () => {
  try {
    isApplying.value = true;
    await $fetch('/api/application', {
      method: 'POST',
      body: { postingId: id },
    });
  } catch (e) {
    console.error('Error occured while applying', e);
  } finally {
    isApplying.value = false;
  }
};

// Google Jobs JSON-LD injection
useJsonld(() => {
  if (!posting.value || !careerSiteConfig.value) return null;
  const job = posting.value;
  const company = careerSiteConfig.value;
  const locations = Array.isArray(job.jobLocations) ? job.jobLocations : [];
  const baseSalary = job.baseSalary;

  // Only include jobLocation if there are locations or remote
  let jobLocation;
  if (locations.length > 0) {
    jobLocation = locations.map((loc) => ({
      '@type': 'Place' as const,
      address: {
        '@type': 'PostalAddress' as const,
        ...(loc.streetAddress && { streetAddress: loc.streetAddress }),
        ...(loc.addressLocality && { addressLocality: loc.addressLocality }),
        ...(loc.addressRegion && { addressRegion: loc.addressRegion }),
        ...(loc.postalCode && { postalCode: loc.postalCode }),
        addressCountry: loc.addressCountry,
      },
    }));
  } else if (job.isRemote) {
    jobLocation = [
      {
        '@type': 'Place' as const,
        address: {
          '@type': 'PostalAddress' as const,
          addressCountry: 'Remote',
        },
      },
    ];
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.contents ?? '',
    identifier: {
      '@type': 'PropertyValue',
      name: company.name,
      value: job.id,
    },
    datePosted: job.createdAt ? new Date(job.createdAt).toISOString() : undefined,
    validThrough: job.validTill ? new Date(job.validTill).toISOString() : undefined,
    employmentType: job.employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: company.name,
      logo: companyLogo,
      description: company.bio || company.description || undefined,
      sameAs: company.links?.length ? company.links[0]?.href : undefined,
    },
    ...(jobLocation ? { jobLocation } : {}),
    ...(baseSalary
      ? {
          baseSalary: {
            '@type': 'MonetaryAmount',
            currency: baseSalary.currency,
            value: {
              '@type': 'QuantitativeValue',
              minValue: baseSalary.minValue,
              maxValue: baseSalary.maxValue,
              unitText: baseSalary.unitText,
            },
          },
        }
      : {}),
    applicantLocationRequirements: job.isRemote ? 'Remote' : undefined,
  };
});
</script>

<template>
  <main class="grow" v-if="posting">
    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full">
      <!-- Page content -->
      <div class="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">
        <!-- Content -->
        <div class="w-full">
          <div class="mb-6">
            <VInputButton as="NuxtLink" variant="outline" to="/">
              <Icon class="fill-current text-zinc-500 mr-2" name="mdi:arrow-left" />
              <span>Back To Jobs</span>
            </VInputButton>
          </div>
          <div class="text-sm text-zinc-500 italic mb-2">Posted {{ timeAgo(new Date(posting.updatedAt)) }}</div>
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
                <img
                  class="w-16 h-16 rounded-full"
                  :src="companyLogo"
                  width="64"
                  height="64"
                  :alt="`${careerSiteConfig.name}'s logo'`"
                />
              </div>
              <div class="text-lg font-bold text-zinc-800 mb-1">
                {{ careerSiteConfig.name }}
              </div>
            </div>
            <div class="space-y-4 sm:flex sm:space-y-0 sm:space-x-2">
              <div class="flex w-full items-center justify-center text-green-500 space-x-2" v-if="appliedSuccessfully">
                <Icon name="teenyicons:tick-circle-solid" class="w-4 h-4" />
                <span>Applied</span>
              </div>
              <VInputButton class="w-full" @click="apply" :disabled="isApplying" v-else>
                Apply Today
                <Icon class="fill-current ml-1" name="mdi:arrow-right" />
              </VInputButton>
            </div>
          </div>

          <!-- Tags -->
          <div class="mb-6" v-if="posting.tagsCSV">
            <div class="flex flex-wrap items-center -m-1">
              <div class="m-1">
                <span
                  class="text-xs inline-flex font-medium bg-zinc-100/30 text-zinc-800 rounded-xl text-center px-2.5 py-1 border border-zinc-500 mr-2"
                  v-for="tag in tags"
                  >{{ tag }}</span
                >
              </div>
            </div>
          </div>
          <hr class="my-6 border-t border-zinc-100" />
          <!-- <Editor :read-only="true" v-model="posting.contents" /> -->
          <div v-html="posting.contents" class="prose" />
        </div>

        <!-- Sidebar -->
        <div class="hidden lg:block space-y-4">
          <!-- Company information (desktop) -->
          <div class="bg-white p-5 rounded-2xl border border-zinc-200 lg:w-72 xl:w-80">
            <div class="text-center mb-6">
              <div class="inline-flex mb-3">
                <img
                  class="w-16 h-16 rounded-full"
                  :src="companyLogo"
                  width="64"
                  height="64"
                  :alt="`${careerSiteConfig.name}'s logo'`"
                />
              </div>
              <div class="text-lg font-bold text-zinc-800 mb-1">
                {{ careerSiteConfig.name }}
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex w-full items-center justify-center text-green-500 space-x-2" v-if="appliedSuccessfully">
                <Icon name="teenyicons:tick-circle-solid" class="w-4 h-4" />
                <span>Applied</span>
              </div>
              <VInputButton class="w-full" @click="apply" :disabled="isApplying" v-else>
                Apply Today
                <Icon class="fill-current ml-1" name="mdi:arrow-right" />
              </VInputButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
