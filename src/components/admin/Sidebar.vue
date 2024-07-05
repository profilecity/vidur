<template>
  <div class="flex fixed top-0 left-0 flex-col px-4 py-6 border-b md:border-b-0 md:border-r border-zinc-200 max-w-60 h-screen">
     <div class="flex flex-col">
        
        <!-- Company Profile -->
        <div class="flex px-2 py-2 justify-between rounded-xl text-zinc-600 border hover:bg-zinc-50 hover:border-zinc-200 space-x-2">
          <div class="flex items-center">
            <img class="rounded-lg w-6 border border-zinc-200" src="https://careers.thenirvanalabs.com/company-logo.png" alt="avatar"/>
            <span class="text-xs ml-2 truncate">The Nirvana Labs</span>
          </div>
          <div class="flex items-center text-zinc-600">
            <Icon class="w-5 h-5 fill-current" name="icon-park-outline:down"/>
          </div>
        </div>

        <!-- Home -->
        <div class="text-xs text-zinc-500 mb-2 mt-6">Home</div>
        <ul class="flex flex-nowrap md:block mr-3 md:mr-0">
           <NuxtLink to="/admin/dashboard" custom v-slot="{ href, navigate, isExactActive }">
              <li class="mr-0.5 md:mr-0 md:mb-0.5">
                 <a class="flex items-center px-2.5 py-2 rounded-xl whitespace-nowrap text-zinc-600" :class="isExactActive ? 'bg-zinc-100 text-zinc-900 border' : 'hover:bg-zinc-50 hover:border hover:border-zinc-100'" :href="href" @click="navigate">
                    <Icon class="w-5 h-5 shrink-0 fill-current mr-2" name="iconoir:home-simple"/>
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
        <div class="text-xs text-zinc-500 mb-2 mt-4">Tools</div>
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
      <div class="p-2 border border-zinc-200 rounded-xl">
        <div class="flex items-center space-x-2">
          <img src="/vidur-logo.svg" class="w-14"/>
          <div class="py-1 px-2 text-xs border border-amber-300 rounded-lg bg-amber-50 text-amber-500 font-medium">premium</div>
        </div>
        <div class="text-xs mt-2 text-zinc-500">Get access to AI powered profiles and People's Search.</div>
        <button class="text-xs py-2 px-4 rounded-xl bg-zinc-900 mt-2 text-zinc-50">Upgrade Now</button>
      </div>
      <div class="flex justify-between mt-4">
        <div class="text-zinc-900 text-sm">v.0.0.1</div>
        <div class="flex space-x-2 items-center text-zinc-900">
          <a href="https://github.com/profilecity/vidur"><Icon class="w-5 h-5 shrink-0 fill-current" name="mdi:github"/></a>
          <a href=""><Icon class="w-5 h-5 shrink-0 fill-current" name="ic:sharp-discord"/></a>
          <a href="https://x.com/thenirvanalabs"><Icon class="w-4 h-4 shrink-0 fill-current" name="pajamas:twitter"/></a>
        </div>
      </div>
     </div>
  </div>
</template>