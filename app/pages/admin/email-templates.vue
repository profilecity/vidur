<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});

useHead({
  title: 'Email Templates | Admin Panel',
});

const code = ref<string>(DEFAULT_HTML);
</script>

<template>
  <div class="flex p-8">
    <VEditorHtml v-model:code="code" class="w-1/2" show-preview />
  </div>
</template>
