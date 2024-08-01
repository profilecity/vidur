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
                  <div
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-zinc-900 text-white">
                    1</div>
                </li>
                <li>
                  <div
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-zinc-900  text-white">
                    2</div>
                </li>
                <li>
                  <div
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-zinc-900  text-white">
                    3</div>
                </li>
                <li>
                  <div
                    class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-zinc-900  text-white">
                    4</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 -mt-36 w-full">
        <div class="text-center">
          <svg class="inline-flex w-16 h-16 fill-current mb-6" viewBox="0 0 64 64">
            <circle class="text-green-500/20" cx="32" cy="32" r="32" />
            <path class="text-green-700"
              d="M37.22 26.375a1 1 0 1 1 1.56 1.25l-8 10a1 1 0 0 1-1.487.082l-4-4a1 1 0 0 1 1.414-1.414l3.21 3.21 7.302-9.128Z" />
          </svg>
          <h1 class="text-2xl font-noto text-zinc-800 font-bold mb-8">Nice to have you, Acme Inc. 🙌</h1>
          <router-link
            class="btn bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
            to="/admin">Go To Dashboard <Icon name="ep:right" class="w-4 h-4 ml-1"/></router-link>
        </div>
      </div>
    </div>
  </div>
</template>