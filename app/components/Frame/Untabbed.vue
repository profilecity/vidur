<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <main>
    <section class="sticky top-0 bg-white w-full p-4 border-b">
      <div class="flex-col mb-2">
        <span class="flex text-xl font-bold text-zinc-900 font-noto">
          {{ title }}
        </span>
        <span class="flex text-sm text-zinc-600">
          {{ description }}
        </span>
      </div>
      <slot name="action" />
    </section>
    <slot name="content" />
  </main>
</template>
