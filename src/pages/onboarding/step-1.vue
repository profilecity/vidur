<template>
  <div class="w-full md:w-1/2 mx-auto justify-center min-h-screen">
    <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">
      <div class="flex-1">
        <!-- Header -->
        <div class="justify-center flex"><img src="/vidur-logo.svg" class="h-5 px-4 sm:px-6 lg:px-8 mt-8" /></div>

        <!-- Progress bar -->
        <div class="px-4 mt-8">
          <div class="max-w-md mx-auto w-full">
            <div class="relative">
              <div class="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-zinc-200" aria-hidden="true"></div>
              <ul class="relative flex justify-between w-full">
                <li>
                  <router-link
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-zinc-900 text-white"
                    to="/onboarding-01">1</router-link>
                </li>
                <li>
                  <router-link
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-white  text-zinc-500"
                    to="/onboarding-02">2</router-link>
                </li>
                <li>
                  <router-link
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-white  text-zinc-500"
                    to="/onboarding-03">3</router-link>
                </li>
                <li>
                  <router-link
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-white  text-zinc-500"
                    to="/onboarding-04">4</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 -mt-56">
        <div class="max-w-md mx-auto">
          <h1 class="text-xl text-zinc-800 font-bold mb-6 font-noto">👋 Tell us about yourself </h1>
          <!-- Form -->
          <form>
            <div class="space-y-3 mb-8">
              <label for="radio-experienced" class="relative block cursor-pointer">
                <input type="radio" id="radio-experienced" name="radio-experienced" class="peer sr-only" checked />
                <div
                  class="flex items-center bg-white text-md text-zinc-800 p-4 rounded-lg border border-zinc-200 hover:border-zinc-300 shadow-sm transition">
                  <Icon class="w-6 h-6 mr-2" name="game-icons:rank-3" />
                  <span>I am an experienced ATS user.</span>
                </div>
                <div
                  class="absolute inset-0 border border-transparent peer-checked:border-blue-500 rounded-lg pointer-events-none"
                  aria-hidden="true"></div>
              </label>
              <label for="radio-used-before" class="relative block cursor-pointer">
                <input type="radio" id="radio-used-before" name="radio-used-before" class="peer sr-only" />
                <div
                  class="flex items-center bg-white text-md text-zinc-800 p-4 rounded-lg border border-zinc-200 hover:border-zinc-300 shadow-sm transition">
                  <Icon class="w-6 h-6 mr-2" name="game-icons:rank-2" />
                  <span>I have used ATS before.</span>
                </div>
                <div
                  class="absolute inset-0 border border-transparent peer-checked:border-blue-500 rounded-lg pointer-events-none"
                  aria-hidden="true"></div>
              </label>
              <label for="radio-beginner" class="relative block cursor-pointer">
                <input type="radio" id="radio-beginner" name="radio-beginner" class="peer sr-only" />
                <div
                  class="flex items-center bg-white text-md text-zinc-800 p-4 rounded-lg border border-zinc-200 hover:border-zinc-300 shadow-sm transition">
                  <Icon class="w-6 h-6 mr-2" name="game-icons:rank-1" />
                  <span>I’m just getting started</span>
                </div>
                <div
                  class="absolute inset-0 border border-transparent peer-checked:border-blue-500 rounded-lg pointer-events-none"
                  aria-hidden="true"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <InputButton as="NuxtLink" to="/onboarding/step-2">Next
                Step
                <Icon name="ep:right" class="w-4 h-4 ml-1" />
              </InputButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>