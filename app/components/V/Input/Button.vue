<script setup lang="ts">
import { NuxtLink } from '#components';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-default text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70',
  {
    variants: {
      variant: {
        default: 'bg-primary-dark text-white hover:bg-primary-dark/90',
        destructive: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-300',
        outline: 'border border-zinc-300 bg-transparent hover:bg-zinc-100 text-zinc-900',
        ghost: 'text-zinc-500 hover:text-zinc-900 bg-transparent',
        secondary: 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300',
        link: 'text-blue-600 hover:text-blue-800 bg-transparent underline underline-offset-4',
      },
      size: {
        default: 'h-8 px-4 py-2',
        sm: 'h-6 px-3 text-xs',
        lg: 'h-10 px-8',
        icon: 'h-8 w-8',
        'icon-sm': 'h-6 w-6 p-0.5',
        'icon-xs': 'h-5 w-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const props = withDefaults(
  defineProps<{
    variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant'];
    size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size'];
    as?: string;
    loading?: boolean;
    spinnerClass?: string;
    disabled?: boolean;
  }>(),
  {
    as: 'button',
    loading: false,
  }
);

const as = computed(() => {
  switch (props.as) {
    case 'NuxtLink':
      return NuxtLink;
    case 'button':
    default:
      return 'button';
  }
});
</script>

<template>
  <component
    :is="as"
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
    :disabled="disabled || loading"
  >
    <ElementsSpinner :class="spinnerClass" v-if="loading" />
    <slot v-else />
  </component>
</template>
