<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <main>
    <section class="sticky top-0 bg-white w-full p-4 border-b">
      <VFrameHWithSubText>
        <template #heading>
          {{ title }}
        </template>
        <template #subtext v-if="description">
          {{ description }}
        </template>
      </VFrameHWithSubText>
      <slot name="action" />
    </section>
    <slot name="content" />
  </main>
</template>
