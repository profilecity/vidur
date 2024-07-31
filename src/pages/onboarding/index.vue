<template>
  <main class="min-h-[50dvh] h-full flex items-center">
    <div class="max-w-sm mx-auto w-full">
      <h1 class="text-3xl text-gray-800 font-bold font-noto mt-12 flex items-center">Welcome to <img src="/vidur-logo.svg" class="h-6 ml-3" /></h1>
      <h4 class="text-sm text-zinc-500 font-bold mb-6">The only ATS you will ever need.</h4>
      <!-- Form -->
      <form>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1" for="one-time-key">To get started, enter the One-Time setup
              code.</label>
            <input id="one-time-key" class="form-input w-full" type="text"
              placeholder="vidur-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <NuxtLink to="/onboarding/step-1" class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 whitespace-nowrap">Verify</NuxtLink>
        </div>
      </form>
    </div>
  </main>
</template>