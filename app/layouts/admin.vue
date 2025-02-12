<script setup lang="ts">
import { useDisplayMedia } from '@vueuse/core';

useDisplayMedia();
</script>

<template>
  <main class="min-h-screen w-full flex">
    <PartialSidebar class="w-[200px]" />
    <section class="w-[calc(100%-200px)] bg-zinc-50 min-h-screen">
      <slot />
    </section>
  </main>
</template>
