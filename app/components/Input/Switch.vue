<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'radix-vue';
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  id?: string;
  modelValue?: boolean;
  disabled?: boolean;
}>();

const switchState = useVModel(props, 'modelValue');
</script>

<template>
  <SwitchRoot
    :id
    v-model:checked="switchState"
    class="w-10 h-[22px] flex bg-zinc-900/50 shadow-sm rounded-full relative data-[state=checked]:bg-zinc-700"
    :disabled="disabled"
  >
    <SwitchThumb
      class="block w-4 h-4 my-auto bg-white shadow-sm rounded-full transition-transform duration-100 translate-x-1 will-change-transform data-[state=checked]:translate-x-[21px]"
    />
  </SwitchRoot>
</template>
