<script setup lang="ts">
defineProps<{
  to: string;
  label: string;
  icon: string;
}>();
</script>

<template>
  <li class="mr-0.5 md:mr-0 md:mb-0.5">
    <NuxtLink :to="to" class="link" activeClass="link-active">
      <Icon class="w-5 h-5 shrink-0 fill-current mr-2" :name="icon" />
      <span class="text-sm">{{ label }}</span>
    </NuxtLink>
  </li>
</template>

<style scoped>
.link {
  @apply flex items-center px-2.5 py-2 rounded-xl whitespace-nowrap text-zinc-600 hover:bg-zinc-50 hover:border hover:border-zinc-100
}

.link-active {
  @apply bg-zinc-100 text-zinc-900 border font-noto font-semibold
}
</style>