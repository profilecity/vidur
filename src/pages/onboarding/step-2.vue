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
              <div class="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-zinc-200" aria-hidden="true"></div>
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
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-white  text-zinc-500"
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
      <div class="px-4 -mt-56">
        <div class="max-w-md mx-auto">

          <h1 class="text-xl text-zinc-800 font-bold mb-6 font-noto">Tell us about your requirements</h1>
          <!-- Form -->
          <form>
            <div class="sm:flex space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
              <label class="flex-1 relative block cursor-pointer">
                <input type="radio" name="radio-buttons" class="peer sr-only" checked />
                <div
                  class="h-full text-center bg-white px-4 py-6 rounded-lg border border-zinc-200 hover:border-zinc-300 shadow-sm transition">
                  <svg class="inline-flex fill-current text-zinc-800 mt-2 mb-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24">
                    <path
                      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10a9.955 9.955 0 0 1-2.003 6.005 2 2 0 0 0-1.382-1.115l-3.293-.732-.295-1.178A4.992 4.992 0 0 0 17 11v-1a5 5 0 0 0-10 0v1c0 1.626.776 3.07 1.977 3.983l-.294 1.175-3.293.732a1.999 1.999 0 0 0-1.384 1.119A9.956 9.956 0 0 1 2 12Zm3.61 7.693A9.96 9.96 0 0 0 12 22c2.431 0 4.66-.868 6.393-2.31l-.212-.847-4.5-1-.496-1.984a5.016 5.016 0 0 1-2.365 0l-.496 1.983-4.5 1-.213.85ZM12 7a3 3 0 0 0-3 3v1a3 3 0 1 0 6 0v-1a3 3 0 0 0-3-3Z"
                      fill-rule="evenodd" />
                  </svg>
                  <div class="font-semibold text-zinc-800 mb-1 font-noto">Freelancer / Individual</div>
                  <div class="text-sm text-zinc-600">Hiring for personal requirements.</div>
                </div>
                <div
                  class="absolute inset-0 border border-transparent peer-checked:border-blue-500 rounded-lg pointer-events-none"
                  aria-hidden="true"></div>
              </label>
              <label class="flex-1 relative block cursor-pointer">
                <input type="radio" name="radio-buttons" class="peer sr-only" />
                <div
                  class="h-full text-center px-4 py-6 rounded-lg border border-zinc-200 hover:border-zinc-300 shadow-sm transition">
                  <svg class="inline-flex fill-current text-zinc-800 mt-2 mb-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24">
                    <path
                      d="M13 22V11a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v13H0V14a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v8h2Zm6-15h-2V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7H5V3a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4ZM9 22v-8a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v8h7Zm13 0V11a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v11h7Zm-5-8v-2h3v2h-3Zm0 3v-2h3v2h-3Zm0 3v-2h3v2h-3ZM4 20v-2h3v2H4Zm0-3v-2h3v2H4Z" />
                  </svg>
                  <div class="font-semibold text-zinc-800 mb-1 font-noto">Recruiter</div>
                  <div class="text-sm text-zinc-600">Hiring as a recruiter for an Organization.</div>
                </div>
                <div
                  class="absolute inset-0 border border-transparent peer-checked:border-blue-500 rounded-lg pointer-events-none"
                  aria-hidden="true"></div>
              </label>
            </div>
            <div class="flex items-center justify-between space-x-6 mb-8">
              <div>
                <div class="font-bold text-zinc-800 text-base mb-1">💸 Would you like to join our mailing list?</div>
                <div class="text-sm text-zinc-600">By agreeing, you consent to receiving marketing / product updates via emails. You can unsubscribe anytime.</div>
              </div>
              <div class="flex items-center">
                <div class="form-switch">
                  <input type="checkbox" id="switch" class="sr-only" checked />
                  <label class="bg-zinc-400" for="switch">
                    <span class="bg-white shadow-sm" aria-hidden="true"></span>
                    <span class="sr-only">Switch label</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <NuxtLink class="text-sm underline hover:no-underline" to="/onboarding/step-1"><Icon name="solar:undo-left-linear" class="w-4 h-4 mr-1" /> Back</NuxtLink>
              <NuxtLink
                class="btn bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                to="/onboarding/step-3">Next Step <Icon name="ep:right" class="w-4 h-4 ml-1" /></NuxtLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>