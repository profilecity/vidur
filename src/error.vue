<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
});

console.log(props.error);

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="w-full md:w-1/2 mx-auto">
    <div class="min-h-[100vh] h-full flex flex-col items-center">
      <div class="max-w-md mx-auto w-full flex flex-col justify-center items-center">
        <div><img src="/vidur-logo.svg" class="h-5 px-4 sm:px-6 lg:px-8 my-8" /></div>
        <div class="text-center bg-white">
          <svg 
            class="inline-flex fill-current text-zinc-800 mt-2 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            version="1.1"
            id="Capa_1"
            width="75"
            height="75"
            viewBox="0 0 106.06 106.06"
            xml:space="preserve"
          >
            <g>
              <path
                d="M15.515,15.512C-5.172,36.199-5.17,69.857,15.517,90.547c20.682,20.685,54.34,20.685,75.028-0.005   c20.686-20.685,20.684-54.341,0.002-75.023C69.857-5.172,36.199-5.172,15.515,15.512z M84.759,84.758   c-17.494,17.493-45.963,17.495-63.456,0.003c-17.498-17.498-17.496-45.967,0-63.461C38.795,3.807,67.263,3.805,84.761,21.302   C102.255,38.795,102.253,67.264,84.759,84.758z M77.018,74.001c0.656,1.521-0.043,3.286-1.563,3.944   c-1.521,0.659-3.286-0.042-3.944-1.562c-2.894-6.689-9.73-11.013-17.42-11.013c-7.869,0-14.748,4.32-17.523,11.006   c-0.48,1.152-1.596,1.85-2.771,1.851c-0.385,0-0.773-0.074-1.15-0.23c-1.531-0.637-2.256-2.393-1.619-3.922   c3.709-8.932,12.764-14.703,23.064-14.703C64.175,59.371,73.175,65.113,77.018,74.001z M37.55,43.885   c-1.688-1.688-1.688-4.426,0-6.113c1.689-1.689,4.428-1.689,6.117,0c1.688,1.689,1.688,4.429,0,6.115   C41.98,45.576,39.242,45.576,37.55,43.885z M53.047,19.403c0.541-1.596,2.271-2.452,3.87-1.911l4.116,1.394l2.248-3.72   c0.873-1.44,2.748-1.903,4.189-1.031c1.44,0.871,1.904,2.748,1.031,4.188l-1.552,2.566l2.246,0.761   c1.597,0.542,2.451,2.272,1.91,3.869c-0.539,1.596-2.271,2.452-3.869,1.91l-3.521-1.192l-1.924,3.181   c-0.871,1.443-2.746,1.906-4.189,1.033c-1.441-0.871-1.904-2.747-1.031-4.189l1.228-2.028l-2.842-0.962   C53.361,22.73,52.506,20.998,53.047,19.403z M69.462,37.701c1.688,1.688,1.688,4.426,0,6.113c-1.691,1.69-4.431,1.69-6.117,0.002   c-1.688-1.687-1.688-4.426,0-6.115C65.033,36.011,67.771,36.011,69.462,37.701z"
              />
            </g>
          </svg>
          <div class="text-9xl text-zinc-800 font-noto text-center font-medium">{{ error?.statusCode }}</div>
        </div>
        <div class="my-3 font-semibold text-xl text-zinc-800 mb-1 font-noto">{{ error?.message }}</div>
        <NuxtLink class="btn bg-zinc-900 text-zinc-100 hover:bg-zinc-800 my-3" to="/"> Go To Home</NuxtLink>
      </div>
    </div>
  </div>
</template>
