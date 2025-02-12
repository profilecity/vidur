<template>
  <NuxtErrorBoundary>
    <slot />
    <template #error="error">
      <Error :error :client-side="true" />
    </template>
  </NuxtErrorBoundary>
</template>
