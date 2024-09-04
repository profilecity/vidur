<script setup lang="ts">
defineProps<{
  executing: boolean;
  spinnerClass?: string;
}>();
</script>

<template>
  <ElementsSpinner :class="spinnerClass" v-if="executing" />
  <slot v-else />
</template>
