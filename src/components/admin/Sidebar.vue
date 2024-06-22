<template>
  <div class="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-zinc-300 min-w-60 md:space-y-3">
    <!-- Group 1 -->
    <div>
      <ul class="flex flex-nowrap md:block mr-3 md:mr-0">
        <NuxtLink to="/admin/dashboard" custom v-slot="{ href, navigate, isExactActive }">
          <li class="mr-0.5 md:mr-0 md:mb-0.5">
            <a class="flex items-center px-2.5 py-2 rounded-xl whitespace-nowrap" :class="isExactActive ? 'bg-zinc-950 text-white border' : 'hover:bg-zinc-200'" :href="href" @click="navigate">
              <Icon class="w-4 h-4 shrink-0 fill-current mr-2" name="mage:dashboard"/>
              <span class="text-sm font-medium">Dashboard</span>
            </a>
          </li>
        </NuxtLink>
        <NuxtLink to="/admin/postings" custom v-slot="{ href, navigate, isExactActive }">
          <li class="mr-0.5 md:mr-0 md:mb-0.5">
            <a class="flex items-center px-2.5 py-2 rounded-xl whitespace-nowrap" :class="isExactActive ? 'bg-zinc-950 text-white border' : 'hover:bg-zinc-200'" :href="href" @click="navigate">
              <Icon class="w-4 h-4 shrink-0 fill-current mr-2" name="hugeicons:permanent-job"/>
              <span class="text-sm font-medium">Postings</span>
            </a>
          </li>
        </NuxtLink>
        <NuxtLink to="/admin/applicants" custom v-slot="{ href, navigate, isExactActive }">
          <li class="mr-0.5 md:mr-0 md:mb-0.5">
            <a class="flex items-center px-2.5 py-2 rounded-xl whitespace-nowrap" :class="isExactActive ? 'bg-zinc-950 text-white border' : 'hover:bg-zinc-200'" :href="href" @click="navigate">
              <Icon class="w-4 h-4 shrink-0 fill-current mr-2" name="ph:users"/>
              <span class="text-sm font-medium">Applicants</span>
            </a>
          </li>
        </NuxtLink>
        <NuxtLink to="/admin/integrations" custom v-slot="{ href, navigate, isExactActive }">
          <li class="mr-0.5 md:mr-0 md:mb-0.5">
            <a class="flex items-center px-2.5 py-2 rounded-xl whitespace-nowrap" :class="isExactActive ? 'bg-zinc-950 text-white border' : 'hover:bg-zinc-200'" :href="href" @click="navigate">
              <Icon class="w-4 h-4 shrink-0 fill-current mr-2" name="hugeicons:connect"/>
              <span class="text-sm font-medium">Integrations</span>
            </a>
          </li>
        </NuxtLink>
        <NuxtLink to="/admin/settings" custom v-slot="{ href, navigate, isExactActive }">
          <li class="mr-0.5 md:mr-0 md:mb-0.5">
            <a class="flex items-center px-2.5 py-2 rounded-xl whitespace-nowrap" :class="isExactActive ? 'bg-zinc-950 text-white border' : 'hover:bg-zinc-200'" :href="href" @click="navigate">
              <Icon class="w-4 h-4 shrink-0 fill-current mr-2" name="mage:settings"/>
              <span class="text-sm font-medium">Settings</span>
            </a>
          </li>
        </NuxtLink>
      </ul>
    </div>
  </div>
</template>