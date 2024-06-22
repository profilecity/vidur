<script setup lang="ts">
defineEmits<{
  createNew: [],
}>();
</script>

<template>
  <div class="text-center px-4">
    <div
      class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-t from-zinc-200 to-zinc-100 mb-4">
      <svg class="w-5 h-6 fill-current" viewBox="0 0 20 24">
        <path class="text-zinc-500" d="M10 10.562l9-5-8.514-4.73a1 1 0 00-.972 0L1 5.562l9 5z" />
        <path class="text-zinc-300" d="M9 12.294l-9-5v10.412a1 1 0 00.514.874L9 23.294v-11z" />
        <path class="text-zinc-400"
          d="M11 12.294v11l8.486-4.714a1 1 0 00.514-.874V7.295l-9 4.999z" />
      </svg>
    </div>
    <h2 class="text-2xl text-zinc-800 font-bold mb-2">
      Create your first hook in minutes!
    </h2>
    <h4 class="text-lg text-zinc-700 mb-2">
      Hooks are a way to send events to external systems via an API request.<br>
      Primary aim for this is to facilitate creation of custom plugins.
    </h4>
    <div class="flex w-full justify-center">
      <ul class="p-4 text-center mx-auto">
      <!-- List item -->
      <li class="relative py-2">
        <div class="flex items-center mb-1">
          <div
            class="absolute left-0 h-full w-0.5 bg-zinc-200 self-start ml-2.5 -tranzinc-x-1/2 tranzinc-y-3"
            aria-hidden="true"></div>
          <div class="absolute left-0 rounded-full bg-zinc-600" aria-hidden="true">
            <Icon name="mdi:number-1" class="w-5 h-5 fill-current text-white"/>
          </div>
          <h3 class="text-lg font-bold text-zinc-600 pl-9">Receive events via POST request.</h3>
        </div>
      </li>
      <!-- List item -->
      <li class="relative py-2">
        <div class="flex items-center mb-1">
          <div
            class="absolute left-0 h-full w-0.5 bg-zinc-200 self-start ml-2.5 -tranzinc-x-1/2 tranzinc-y-3"
            aria-hidden="true"></div>
          <div class="absolute left-0 rounded-full bg-zinc-600" aria-hidden="true">
            <Icon name="mdi:number-2" class="w-5 h-5 fill-current text-white"/>
          </div>
          <h3 class="text-lg font-bold text-zinc-600 pl-9">Validate authority using <a class="underline text-blue-500"href="http://https://atlas.thenirvanalabs.com/oauth2/jwks" target="_blank" rel="noopener noreferrer">this</a> JWKS-RSA key.</h3>
        </div>
      </li>
      <!-- List item -->
      <li class="relative py-2">
        <div class="flex items-center mb-1">
          <div class="absolute left-0 rounded-full bg-zinc-600" aria-hidden="true">
            <Icon name="mdi:number-3" class="w-5 h-5 fill-current text-white"/>
          </div>
          <h3 class="text-lg font-bold text-zinc-600 pl-9">Create custom actions!</h3>
        </div>
      </li>
    </ul>
    </div>
    <button class="btn bg-zinc-900 hover:bg-zinc-800 text-white" @click="$emit('createNew')">
      <Icon name="ic:baseline-plus" class="w-5 h-5"/>
      <span class="ml-1">Create First Hook</span>
    </button>
  </div>
</template>