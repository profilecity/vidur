<template>
  <div class="w-full md:w-1/2 mx-auto">
    <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">
      <div class="flex-1">
        <!-- Header -->
        <img src="/vidur-logo.svg" class="h-6 px-4 sm:px-6 lg:px-8 mt-8" />
        <!-- Progress bar -->
        <div class="px-4 mt-8">
          <div class="max-w-md mx-auto w-full">
            <div class="relative">
              <div class="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-gray-200" aria-hidden="true"></div>
              <ul class="relative flex justify-between w-full">
                <li>
                  <router-link
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-zinc-900 text-white"
                    to="/onboarding-01">1</router-link>
                </li>
                <li>
                  <router-link
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-white  text-gray-500"
                    to="/onboarding-02">2</router-link>
                </li>
                <li>
                  <router-link
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-white  text-gray-500"
                    to="/onboarding-03">3</router-link>
                </li>
                <li>
                  <router-link
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-white  text-gray-500"
                    to="/onboarding-04">4</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 -mt-56">
        <div class="max-w-md mx-auto">
          <h1 class="text-2xl text-gray-800 font-bold mb-6 font-noto">👋 Tell us about yourself </h1>
          <!-- Form -->
          <form>
            <div class="space-y-3 mb-8">
              <label class="relative block cursor-pointer">
                <input type="radio" name="radio-buttons" class="peer sr-only" checked />
                <div
                  class="flex items-center bg-white text-sm font-medium text-gray-800 p-4 rounded-lg  border border-gray-200 hover:border-gray-300 shadow-sm transition">
                  <svg class="w-6 h-6 shrink-0 fill-current mr-4" viewBox="0 0 24 24">
                    <path class="text-zinc-500" d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z" />
                    <path class="text-zinc-300" d="m11 12.588-9-5V18a1 1 0 0 0 .514.874L11 23.588v-11Z" />
                    <path class="text-zinc-200" d="M13 12.588v11l8.486-4.714A1 1 0 0 0 22 18V7.589l-9 4.999Z" />
                  </svg>
                  <span>I am an experienced ATS user.</span>
                </div>
                <div
                  class="absolute inset-0 border-2 border-transparent peer-checked:border-zinc-600 rounded-lg pointer-events-none"
                  aria-hidden="true"></div>
              </label>
              <label class="relative block cursor-pointer">
                <input type="radio" name="radio-buttons" class="peer sr-only" />
                <div
                  class="flex items-center bg-white text-sm font-medium text-gray-800 p-4 rounded-lg border border-gray-200 hover:border-gray-300 shadow-sm transition">
                  <svg class="w-6 h-6 shrink-0 fill-current mr-4" viewBox="0 0 24 24">
                    <path class="text-zinc-500" d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z" />
                    <path class="text-zinc-300" d="m11 12.588-9-5V18a1 1 0 0 0 .514.874L11 23.588v-11Z" />
                  </svg>
                  <span>I have used ATS before.</span>
                </div>
                <div
                  class="absolute inset-0 border-2 border-transparent peer-checked:border-zinc-600 rounded-lg pointer-events-none"
                  aria-hidden="true"></div>
              </label>
              <label class="relative block cursor-pointer">
                <input type="radio" name="radio-buttons" class="peer sr-only" />
                <div
                  class="flex items-center bg-white text-sm font-medium text-gray-800 p-4 rounded-lg border border-gray-200 hover:border-gray-300 shadow-sm transition">
                  <svg class="w-6 h-6 shrink-0 fill-current mr-4" viewBox="0 0 24 24">
                    <path class="text-zinc-500" d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z" />
                  </svg>
                  <span>I’m just getting started</span>
                </div>
                <div
                  class="absolute inset-0 border-2 border-transparent peer-checked:border-zinc-900 rounded-lg pointer-events-none"
                  aria-hidden="true"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <router-link class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 ml-auto" to="/onboarding/step-2">Next
                Step
                <Icon name="ep:right" class="w-4 h-4 ml-1" />
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>