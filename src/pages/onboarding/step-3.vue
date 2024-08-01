<template>
  <div class="w-full md:w-1/2 mx-auto">
    <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">
      <div class="flex-1">
        <!-- Header -->
        <div class="justify-center flex"><img src="/vidur-logo.svg" class="h-5 px-4 sm:px-6 lg:px-8 mt-8" /></div>
        <!-- Progress bar -->
        <div class="px-4 mt-8">
          <div class="max-w-md mx-auto w-full">
            <div class="relative">
              <div class="absolute left-0 top-1/2 w-full h-0.5 bg-zinc-200" aria-hidden="true"></div>
              <ul class="relative flex justify-between w-full">
                <li>
                  <NuxtLink
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-zinc-900 text-white"
                    to="/onboarding/step-1">1</NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-zinc-900  text-white"
                    to="/onboarding/step-2">2</NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-zinc-900  text-white"
                    to="/onboarding-03">3</NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-white  text-zinc-500"
                    to="/onboarding-04">4</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 w-full">
        <h1 class="text-xl text-zinc-800 font-bold mb-6 font-noto text-center">Let's setup your company profile</h1>
        <!-- Form -->
        <AdminSettingsGeneralUpdate class="mx-auto border rounded-2xl bg-zinc-50" forms="general" />
        <div class="flex items-center justify-between mt-3">
          <NuxtLink class="text-sm underline hover:no-underline" to="/onboarding/step-2">
            <Icon name="solar:undo-left-linear" class="w-4 h-4 mr-1" /> Back
          </NuxtLink>
          <NuxtLink class="btn bg-zinc-900 text-zinc-100 hover:bg-zinc-800" to="/onboarding/step-4">Next Step
            <Icon name="ep:right" class="w-4 h-4 ml-1" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>