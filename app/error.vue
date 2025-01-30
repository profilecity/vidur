<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <!-- This is masked into a component, since same thing needs to be called from default layout to handle errors generated during client side -->
  <!-- This page only works when error is server side -->
  <Error :error :client-side="false" />
</template>
