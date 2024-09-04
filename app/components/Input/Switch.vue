<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'radix-vue';
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  id?: string;
  modelValue?: boolean;
  label?: string;
}>();

const switchState = useVModel(props, 'modelValue');
</script>

<template>
  <div
    class="flex gap-2 items-center bg-zinc-100 p-1 rounded-md border border-zinc-200"
  >
    <label
      class="font-noto text-sm leading-none select-none"
      :for="id"
      v-if="label"
    >
      {{ label }}
    </label>
    <SwitchRoot
      :id
      v-model:checked="switchState"
      class="w-[42px] h-[25px] focus-within:outline focus-within:outline-black flex bg-zinc-900/50 shadow-sm rounded-full relative data-[state=checked]:bg-zinc-900"
    >
      <SwitchThumb
        class="block w-[21px] h-[21px] my-auto bg-white shadow-sm rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]"
      />
    </SwitchRoot>
  </div>
</template>
