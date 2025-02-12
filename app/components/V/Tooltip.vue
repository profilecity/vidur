<script setup lang="ts">
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'radix-vue';

withDefaults(
  defineProps<{
    message?: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
  }>(),
  { side: 'bottom' }
);
</script>

<template>
  <TooltipProvider :delay-duration="400">
    <TooltipRoot>
      <TooltipTrigger class="flex items-center">
        <slot></slot>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          class="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-white select-none rounded-default bg-zinc-950 p-2 text-xs leading-none will-change-[transform,opacity]"
          :side-offset="5"
          :side
        >
          <slot name="content">{{ message }}</slot>
          <TooltipArrow class="fill-zinc-950" :width="8" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
