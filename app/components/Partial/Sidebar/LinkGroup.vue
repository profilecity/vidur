<script setup lang="ts">
import Link from './Link.vue';
import { type NavigationLink } from '~~/shared/types/general';

defineProps<{
  title: string;
  links: NavigationLink[];
}>();
</script>

<template>
  <ul class="flex flex-col space-y-1 my-3">
    <li class="text-xs font-bold text-zinc-400">
      {{ title }}
    </li>
    <Link v-for="link in links" :key="link.to" :to="link.to" :label="link.label" :icon="link.icon" />
  </ul>
</template>
