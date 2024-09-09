<script setup lang="ts">
const { data: careerSiteConfig } = useCareerSiteConfigObjectState();

const logoURL = useRemoteAsset(careerSiteConfig.value.logo).url;
</script>

<template>
  <header class="flex flex-col lg:flex-row space-x-3 items-center text-center lg:text-left">
    <div class="p-1 bg-zinc-400/30 rounded-2xl backdrop-blur-sm">
      <img class="w-20 rounded-2xl border border-zinc-600" :src="logoURL" :alt="`${careerSiteConfig.name}'s Avatar`" />
    </div>
    <div class="p-1 flex flex-col">
      <span class="font-bold font-noto text-2xl">
        {{ careerSiteConfig.name }}
      </span>
      <span class="text-lg font-zinc-600 font-lato text-zinc-600">
        {{ careerSiteConfig.bio }}
      </span>
      <div class="inline-flex flex-wrap justify-center sm:justify-start space-x-4 mt-2 text-zinc-600">
        <div class="flex items-center" v-if="careerSiteConfig.location">
          <Icon class="w-4 h-4 fill-current shrink-0" name="grommet-icons:location" />
          <span class="text-sm font-medium whitespace-nowrap ml-1">
            {{ careerSiteConfig.location }}
          </span>
        </div>
        <div
          v-for="link in careerSiteConfig.links.slice(0, 3)"
          :key="link.href"
          class="flex items-center"
          v-if="careerSiteConfig.links"
        >
          <Icon name="tdesign:link" class="w-4 h-4 fill-current shrink-0" />
          <a class="text-sm font-medium whitespace-nowrap text-blue-500 hover:text-blue-600 ml-1" :href="link.href">
            {{ link.title }}
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
