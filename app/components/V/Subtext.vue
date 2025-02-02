<script setup lang="ts">
import { cva } from 'class-variance-authority';

const variants = cva(undefined, {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    style: {
      normal: 'font-normal',
      italic: 'font-italic',
      bold: 'font-bold',
    },
    color: {
      default: 'text-zinc-700',
      primary: 'text-primary',
      muted: 'text-zinc-500',
      disabled: 'text-zinc-400',
    },
  },
  defaultVariants: {
    size: 'md',
    style: 'normal',
    color: 'default',
  },
});

defineProps<{
  size?: NonNullable<Parameters<typeof variants>[0]>['size'];
  style?: NonNullable<Parameters<typeof variants>[0]>['style'];
  color?: NonNullable<Parameters<typeof variants>[0]>['color'];
}>();
</script>

<template>
  <span :class="cn(variants({ size, style, color }))">
    <slot />
  </span>
</template>
