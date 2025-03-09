<script setup lang="ts">
import type { NavigationLink } from '~~/shared/types/general';
import LinkGroup from './LinkGroup.vue';
import Link from './Link.vue';

const { data: careerSiteConfig } = useCareerSiteConfigObjectState();
const logoURL = computed(() => useRemoteAsset(careerSiteConfig.value.logo).url);

const publicConfig = useRuntimeConfig().public;

const linkGroups = [
  {
    title: 'Recruiting',
    links: [
      {
        icon: 'ic:round-home',
        to: '/admin/dashboard',
        label: 'Home',
      },
      {
        icon: 'jam:mug-f',
        to: '/admin/settings',
        label: 'Jobs',
      },
      {
        icon: 'mdi:inbox',
        to: '/admin/applications',
        label: 'Applications',
      },
    ],
  },
  {
    title: 'Settings',
    links: [
      {
        icon: 'iconoir:settings',
        to: '/admin/settings',
        label: 'Settings',
      },
      {
        icon: 'fa6-solid:plug-circle-bolt',
        to: '/admin/integrations',
        label: 'Plugins',
      },
      {
        icon: 'dashicons:email',
        to: '/admin/email-templates',
        label: 'Email Templates',
      },
    ],
  },
] satisfies { title: string; links: NavigationLink[] }[];

const route = useRoute();
const activeLinkState = useState<string>('nav__active-link', () => linkGroups[0]!.links[0]!.to);

watch(
  () => route.path,
  () => {
    const _activeLink = linkGroups.flatMap((group) => group.links).find((link) => link.to.startsWith(route.path));
    if (_activeLink) {
      activeLinkState.value = _activeLink.to;
    }
  },
  { immediate: true }
);
</script>
<template>
  <div class="flex flex-col justify-between h-screen overflow-y-auto bg-white border-r">
    <div class="flex flex-col px-[8px]">
      <div class="flex w-full items-center justify-between h-11 py-2 mb-2">
        <div class="flex space-x-2 items-center">
          <img class="w-6 h-6 bg-primary rounded-default" :src="logoURL" alt="avatar" />
          <h4 class="truncate !font-nunito !font-bold !text-zinc-900 text-sm">{{ careerSiteConfig.name }}</h4>
        </div>
        <NuxtLink class="flex items-center" to="/" target="_blank" external>
          <VTooltip message="Launch Career Site">
            <Icon name="fluent:open-20-filled" class="w-4 h-4 text-zinc-500 hover:text-zinc-700" />
          </VTooltip>
        </NuxtLink>
      </div>
      <LinkGroup
        v-for="linkGroup in linkGroups"
        :key="linkGroup.title"
        :title="linkGroup.title"
        :links="linkGroup.links"
      />
    </div>
    <div class="flex flex-col p-[8px] mb-3">
      <Link to="https://profilecity.xyz" label="ProfileCity" external>
        <template #icon>
          <ElementsProfilecityIcon />
        </template>
      </Link>
      <Link to="https://profilecity.xyz" label="Help and Support" icon="material-symbols:help-outline" external />
      <Link to="https://profilecity.xyz" label="Security and Privacy" icon="solar:key-outline" external />
      <div class="flex w-full items-center justify-between px-2 mt-6">
        <span class="text-sm text-zinc-500 font-semibold">{{ publicConfig.version }}</span>
        <a :href="publicConfig.github" target="_blank">
          <Icon name="mdi:github" class="w-5 h-5 text-zinc-500 -mt-1" />
        </a>
      </div>
    </div>
  </div>
</template>
