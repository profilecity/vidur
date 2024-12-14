<script setup lang="ts">
import type { NuxtError } from '#app';
import Button from './components/Input/Button.vue';

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="w-full bg-gradient-to-b from-white from-65% via-zinc-100 via-80% to-zinc-800 to-100%">
    <div class="w-full md:w-1/2 mx-auto">
      <div class="min-h-[100vh] h-full flex flex-col items-center">
        <div class="max-w-md mx-auto w-full flex flex-col justify-center items-center">
          <div><img src="/vidur-logo.svg" class="h-6 px-4 sm:px-6 lg:px-8 my-8" /></div>
          <div class="flex flex-col items-center justify-center text-center text-xl space-y-4">
            <Icon name="mingcute:terror-fill" class="text-7xl text-zinc-800" />
            <div class="text-9xl text-zinc-800 font-noto text-center font-medium">{{ error?.statusCode }}</div>
          </div>
          <div class="my-3 font-semibold text-lg text-zinc-800 mb-1 font-noto">Error: {{ error?.message }} :(</div>
          <Button
            class="btn bg-zinc-900 text-zinc-100 hover:bg-zinc-800 my-3 p-2 rounded-lg"
            to="/"
            @click="handleError"
          >
            Go To Home
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
