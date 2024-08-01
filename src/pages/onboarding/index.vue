<template>
  <section class="flex items-center justify-center min-h-screen">
    <div class="max-w-sm mx-auto w-full text-center">
      <div class="justify-center flex"><img src="/vidur-logo.svg" class="h-5" /></div>
      <h4 class="text-md text-zinc-400 mt-2 mb-6">The only Recruiting Software you will ever need.</h4>
      <!-- Form -->
      <form class="justify-center mt-10">
        <div class="space-y-2 text-center">
          <label class="text-sm text-zinc-800" for="one-time-key">To get started, enter the One-Time setup
              code.</label>
            <input id="one-time-key" class="form-input w-full" type="text"
              placeholder="vidur-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
        </div>
        <div class="flex justify-center mt-6">
          <NuxtLink to="/onboarding/step-1" class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 whitespace-nowrap">Verify</NuxtLink>
        </div>
      </form>
    </div>
  </section>
</template>