<script setup lang="ts">
import type { NuxtError } from '#app';

const route = useRoute();
const props = defineProps<{
  error: NuxtError;
  clientSide: boolean;
}>();

const error = props.error;
if (!error) {
  // This will render this same component, but now with the error object
  throw createError({
    statusCode: 500,
    message: 'Something went wrong',
  });
}

const clear = async (redirect: string = '/') => {
  if (props.clientSide) {
    // Issue: remove external: true and see that navigation hangs. This is a temporary workaround.
    await navigateTo(redirect, { external: true });
  } else {
    await clearError({ redirect });
  }
};
</script>

<template>
  <main class="flex flex-col w-full h-screen items-center justify-between">
    <ErrorPostingNotFound
      :error
      @clear="clear"
      v-if="route.path.startsWith('/postings/') && error.statusCode === 404"
    />
    <ErrorFallback :error @clear="clear" v-else />
    <VidurLogo class="h-6 my-8" />
  </main>
</template>
