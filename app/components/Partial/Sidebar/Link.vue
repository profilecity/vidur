<script setup lang="ts">
withDefaults(
  defineProps<{
    to: string;
    label: string;
    icon?: string;
    active?: boolean;
    external?: boolean;
  }>(),
  {
    active: false,
    external: false,
  }
);

const activeLink = useState<string>('nav__active-link');
</script>

<template>
  <NuxtLink
    :to
    :external
    :target="external ? '_blank' : '_self'"
    class="flex w-full h-full items-center space-x-[10px] text-zinc-700 w-[180px] h-[34px] flex items-center p-[10px] rounded-default transition-colors duration-200 hover:bg-zinc-100"
    :class="{ 'bg-zinc-100': !!activeLink && activeLink === to }"
  >
    <Icon class="w-5 h-5 text-zinc-500" :name="icon" v-if="icon" />
    <slot name="icon" v-else></slot>
    <span class="text-[14px] font-semibold">{{ label }}</span>
  </NuxtLink>
</template>
