<script setup lang="ts">
definePageMeta({
  middleware: 'admin-auth',
})
await navigateTo('/admin/dashboard');
</script>

<template>
  <div></div>
</template>