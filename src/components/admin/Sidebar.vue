<script setup lang="ts">
const careerSiteSettings = usePublicCareerSiteSettings();
const logoURL = computed(() => useRemoteAsset(careerSiteSettings.value.logo).url);
</script>

<template>
  <div
    class="flex fixed top-0 left-0 flex-col px-4 py-6 border-b md:border-b-0 md:border-r border-zinc-200 max-w-60 h-screen">
    <div class="flex flex-col">
      <!-- Company Profile -->
      <div class="flex items-center">
        <img class="rounded-lg w-8 border border-zinc-200" :src="logoURL" alt="avatar" />
        <span class="font-bold ml-2 truncate font-noto">{{ careerSiteSettings.name }}</span>
      </div>
      <!-- Home -->
      <div class="text-xs text-zinc-500 mb-2 mt-6">Home</div>
      <ul class="flex flex-nowrap md:block mr-3 md:mr-0">
        <AdminSidebarLink to="/admin/dashboard" icon="iconoir:home-simple" label="Dashboard" />
        <AdminSidebarLink to="/admin/postings" icon="iconoir:add-circle" label="Postings" />
        <AdminSidebarLink to="/admin/applications" icon="iconoir:user-badge-check" label="Applications" />
      </ul>

      <!-- Tools -->
      <div class="text-xs text-zinc-500 mb-2 mt-4">Tools</div>
      <ul class="flex flex-nowrap md:block mr-3 md:mr-0">
        <AdminSidebarLink to="/admin/integrations" icon="hugeicons:connect" label="Integrations" />
        <AdminSidebarLink to="/admin/settings" icon="iconoir:settings" label="Settings" />
      </ul>
    </div>

    <!-- Discord -->
    <div class="mt-auto">
      <div class="p-2 border border-zinc-200 rounded-xl">
        <div class="flex items-center space-x-2">
          <img src="/vidur-logo.svg" class="w-14" />
          <div class="py-1 px-2 text-xs border border-amber-300 rounded-lg bg-amber-50 text-amber-500 font-medium">
            premium
          </div>
        </div>
        <div class="text-xs my-2 text-zinc-500">Get access to AI powered profiles and People's Search.</div>
        <InputButton size="sm">Upgrade Now</InputButton>
      </div>
      <div class="flex justify-between mt-4">
        <div class="text-zinc-900 text-sm">v.0.0.1</div>
        <div class="flex space-x-2 items-center text-zinc-900">
          <a href="https://github.com/profilecity/vidur">
            <Icon class="w-5 h-5 shrink-0 fill-current" name="mdi:github" />
          </a>
          <a href="">
            <Icon class="w-5 h-5 shrink-0 fill-current" name="ic:sharp-discord" />
          </a>
          <a href="https://x.com/thenirvanalabs">
            <Icon class="w-4 h-4 shrink-0 fill-current" name="pajamas:twitter" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>