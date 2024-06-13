<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-white dark:bg-zinc-900',
  }
})
</script>
<template>
  <main class="min-h-screen">
    <AdminHeader />
    <div class="flex flex-col md:flex-row md:-mr-px h-full">
      <AdminSidebar class="h-[calc(100vh-4rem)]" />
      <slot />
    </div>
  </main>
</template>