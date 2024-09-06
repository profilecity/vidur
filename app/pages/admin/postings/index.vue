<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

useHead({
  title: 'Postings | Admin Panel',
});

const { data: postings } = await usePostingsRepository();
</script>

<template>
  <div class="w-full max-w-9xl mx-auto">
    <AdminPostingsHeader />
    <div class="mt-4">
      <div class="max-w-2xl mx-auto mt-12" v-if="!postings.length">
        <AdminPostingsEmptyState />
      </div>
      <div class="grid grid-cols-12 gap-6 p-4">
        <AdminPostingsCard
          v-for="posting in postings"
          :key="posting.id"
          :posting="posting"
        />
      </div>
    </div>
  </div>
</template>
