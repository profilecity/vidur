<script setup lang="ts">
import {
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperRoot,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from 'radix-vue';
import type { Step } from '~/types/general';

const props = withDefaults(
  defineProps<{
    steps: Step[];
    allowManualTrigger?: boolean;
    step: number;
  }>(),
  {
    allowManualTrigger: false,
  },
);

if (props.allowManualTrigger) {
  // TODO: implement allow manual trigger.
  console.warn("<InputStep/>: allowManualTrigger is not implemented yet, and won't take effect.");
}
</script>

<template>
  <StepperRoot class="flex gap-2 w-full max-w-[32rem]" :model-value="step">
    <StepperItem
      v-for="item in steps"
      :key="item.step"
      class="w-full flex justify-center gap-2 cursor-pointer group data-[disabled]:pointer-events-none relative px-4"
      :step="item.step"
    >
      <StepperTrigger
        class="inline-flex items-center group-data-[disabled]:text-gray-400 group-data-[state=active]:bg-zinc-900 group-data-[state=active]:text-white justify-center rounded-full text-gray-400 w-10 h-10 shrink-0 bg-gray-300 group-data-[state=completed]:bg-green-200 group-data-[state=completed]:text-zinc-900 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
        :disabled="true"
      >
        <StepperIndicator class="flex items-center">
          <Icon :name="item.icon" class="w-5 h-5" />
        </StepperIndicator>
      </StepperTrigger>

      <StepperSeparator
        v-if="item.step !== steps[steps.length - 1].step"
        class="absolute block top-5 left-[calc(50%+30px)] right-[calc(-50%+20px)] h-0.5 rounded-full group-data-[disabled]:bg-gray-300 group-data-[state=completed]:bg-zinc-500 bg-zinc-400 shrink-0"
      />

      <div
        class="absolute text-center top-full left-0 w-full mt-2 text-zinc-900 group-data-[state=inactive]:text-gray-300"
      >
        <StepperTitle class="font-medium font-noto text-xs" v-if="item.title">
          {{ item.title }}
        </StepperTitle>
        <StepperDescription class="hidden sm:block text-xs" v-if="item.description">
          {{ item.description }}
        </StepperDescription>
      </div>
    </StepperItem>
  </StepperRoot>
</template>
