<template>
  <div class="flex flex-col px-4 py-6 border-b md:border-b-0 md:border-r border-zinc-200 min-w-60 h-screen">
    <div class="flex flex-col">
      <div class="flex items-center text-[0.5rem] items-center mb-10">
      <img src="/vidur-logo.svg" class="w-16"/>
    </div>
    
    <!-- Home -->
    <div class="text-xs text-zinc-500 mb-2">Home</div>
    <ul class="flex flex-nowrap md:block mr-3 md:mr-0">
      <NuxtLink to="/admin/dashboard" custom v-slot="{ href, navigate, isExactActive }">
        <li class="mr-0.5 md:mr-0 md:mb-0.5">
          <a class="flex items-center px-2.5 py-2 rounded-xl whitespace-nowrap text-zinc-600" :class="isExactActive ? 'bg-zinc-100 text-zinc-900 border' : 'hover:bg-zinc-50 hover:border hover:border-zinc-100'" :href="href" @click="navigate">
            <Icon class="w-5 h-5 shrink-0 fill-current mr-2 stroke-white" name="iconoir:home-simple"/>
            <span class="text-sm" :class="isExactActive ? 'font-semibold':''">Dashboard</span>
          </a>
        </li>
      </NuxtLink>
      <NuxtLink to="/admin/postings" custom v-slot="{ href, navigate, isExactActive }">
        <li class="mr-0.5 md:mr-0 md:mb-0.5">
          <a class="flex items-center px-2.5 py-2 rounded-xl whitespace-nowrap text-zinc-600" :class="isExactActive ? 'bg-zinc-100 text-zinc-900 border' : 'hover:bg-zinc-50 hover:border hover:border-zinc-100'" :href="href" @click="navigate">
            <Icon class="w-5 h-5 shrink-0 fill-current mr-2" name="iconoir:add-circle"/>
            <span class="text-sm" :class="isExactActive ? 'font-semibold':''">Postings</span>
          </a>
        </li>
      </NuxtLink>
      <NuxtLink to="/admin/applicants" custom v-slot="{ href, navigate, isExactActive }">
        <li class="mr-0.5 md:mr-0 md:mb-0.5">
          <a class="flex items-center px-2.5 py-2 rounded-xl whitespace-nowrap text-zinc-600" :class="isExactActive ? 'bg-zinc-100 text-zinc-900 border' : 'hover:bg-zinc-50 hover:border hover:border-zinc-100'" :href="href" @click="navigate">
            <Icon class="w-5 h-5 shrink-0 fill-current mr-2" name="iconoir:user-badge-check"/>
            <span class="text-sm" :class="isExactActive ? 'font-semibold':''">Applicants</span>
          </a>
        </li>
      </NuxtLink>
    </ul>

    <!-- Tools -->
    <div class="text-xs text-zinc-500 mb-2 mt-6">Tools</div>
    <ul class="flex flex-nowrap md:block mr-3 md:mr-0">
      <NuxtLink to="/admin/integrations" custom v-slot="{ href, navigate, isExactActive }">
        <li class="mr-0.5 md:mr-0 md:mb-0.5">
          <a class="flex items-center px-2.5 py-2 rounded-xl whitespace-nowrap text-zinc-600" :class="isExactActive ? 'bg-zinc-100 text-zinc-900 border' : 'hover:bg-zinc-50 hover:border hover:border-zinc-100'" @click="navigate">
            <Icon class="w-5 h-5 shrink-0 fill-current mr-2" name="iconoir:ev-plug-charging"/>
            <span class="text-sm" :class="isExactActive ? 'font-semibold':''">Integrations</span>
          </a>
        </li>
      </NuxtLink>
      <NuxtLink to="/admin/settings" custom v-slot="{ href, navigate, isExactActive }">
        <li class="mr-0.5 md:mr-0 md:mb-0.5">
          <a class="flex items-center px-2.5 py-2 rounded-xl whitespace-nowrap text-zinc-600" :class="isExactActive ? 'bg-zinc-100 text-zinc-900 border' : 'hover:bg-zinc-50 hover:border hover:border-zinc-100'" @click="navigate">
            <Icon class="w-5 h-5 shrink-0 fill-current mr-2" name="iconoir:settings"/>
            <span class="text-sm" :class="isExactActive ? 'font-semibold':''">Settings</span>
          </a>
        </li>
      </NuxtLink>
    </ul>
    </div>

    <!-- Discord -->
    <div class="mt-auto">
      <ul class="flex flex-nowrap md:block mr-3 md:mr-0">
        <NuxtLink to="/admin/integrations" custom v-slot="{ href, navigate, isExactActive }">
          <li class="mr-0.5 md:mr-0 md:mb-2">
            <a class="flex items-center px-2.5 py-2 rounded-xl whitespace-nowrap text-zinc-50 bg-zinc-900 hover:bg-zinc-700">
              <Icon class="w-6 h-6 shrink-0 fill-current mr-2" name="mdi:github"/>
              <span class="text-sm">Community Support</span>
            </a>
          </li>
        </NuxtLink>
        <NuxtLink to="/admin/settings" custom v-slot="{ href, navigate, isExactActive }">
          <li class="mr-0.5 md:mr-0 md:mb-0.5">
            <a class="flex items-center px-2 py-2 rounded-xl whitespace-nowrap text-zinc-600 border hover:bg-zinc-50 hover:border-zinc-200">
              <img class="rounded-xl w-10 border border-zinc-200" src="https://wallpapers-clan.com/wp-content/uploads/2024/03/mario-pfp-03.jpg" alt="avatar"/>
              <div class="flex flex-col">
                <span class="text-md ml-2">Dev Shah</span>
                <span class="text-xs ml-2">Admin</span>
              </div>
            </a>
          </li>
        </NuxtLink>
      </ul>
    </div>
  </div>
</template> 
