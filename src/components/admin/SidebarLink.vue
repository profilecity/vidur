<script setup lang="ts">
defineProps<{
  to: string;
  label: string;
  icon: string;
}>();
</script>

<template>
  <NuxtLink :to="to" custom v-slot="{ href, navigate, isExactActive }">
    <li class="mr-0.5 md:mr-0 md:mb-0.5">
      <a class="flex items-center px-2.5 py-2 rounded-xl whitespace-nowrap text-zinc-600"
        :class="isExactActive ? 'bg-zinc-100 text-zinc-900 border font-noto' : 'hover:bg-zinc-50 hover:border hover:border-zinc-100'"
        :href="href" @click="navigate">
        <Icon class="w-5 h-5 shrink-0 fill-current mr-2" :name="icon" />
        <span class="text-sm" :class="isExactActive ? 'font-semibold' : ''">{{ label }}</span>
      </a>
    </li>
  </NuxtLink>
</template>