<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';

const emit = defineEmits<{
  'close': [];
}>();

const props = withDefaults(defineProps<{
  title?: string;
  align?: 'right' | 'left';
  closeOnEsc?: boolean;
}>(), {
  align: "left",
  closeOnEsc: false,
});

const isDropdownOpen = ref(false);

// TODO: close on click outside
// const clickHandler = ({ target }: Event) => {
//   if (!isDropdownOpen.value || dropdownRef.value?.contains(target) || triggerRef.value?.contains(target)) return
//   isDropdownOpen.value = false
// }

const open = () => {
  isDropdownOpen.value = true
};

const close = () => {
  if (isDropdownOpen.value) {
    isDropdownOpen.value = false;
    emit('close');
  }
};

if (props.closeOnEsc) {
  onKeyStroke('Escape', close);
}
</script>

<template>
  <div class="relative inline-flex">
    <slot name="input" :open="open" :close="close" />
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="isDropdownOpen" class="origin-top-right z-10 absolute top-full left-0 right-auto min-w-56 bg-white border border-slate-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1" :class="align === 'right' ? 'md:left-auto md:right-0' : 'md:left-0 md:right-auto'">
        <div ref="dropdownRef">
          <div class="flex w-full justify-between text-slate-400 pb-2 px-3 items-center">
            <div class="text-xs font-semibold uppercase">{{ title }}</div>
            <button class="hover:text-zinc-600" @click="close"><Icon name="ion:close" class="text"/></button>
          </div>
          <slot name="content" :close="close" />        
        </div>
      </div>
    </transition>
  </div>
</template>