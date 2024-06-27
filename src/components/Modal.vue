<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';

const emit = defineEmits<{
  'close': [];
}>();

defineProps<{
  title?: string;
}>()

const isModalOpen = ref(false);

const open = () => {
  isModalOpen.value = true
};

const close = () => {
  if (isModalOpen.value) {
    isModalOpen.value = false;
    emit('close');
  }
};

onKeyStroke('Escape', close);
</script>

<template>
  <slot name="input" :open="open" :close="close" />
  <!-- Modal backdrop -->
  <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0"
    enter-to-class="opacity-100" leave-active-class="transition ease-out duration-100" leave-from-class="opacity-100"
    leave-to-class="opacity-0">
    <div v-show="isModalOpen" class="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
      aria-hidden="true"></div>
  </transition>
  <!-- Modal dialog -->
  <transition enter-active-class="transition ease-in-out duration-200" enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in-out duration-200"
    leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4">
    <div v-show="isModalOpen"
      class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6" role="dialog"
      aria-modal="true">
      <div ref="modalContent" class="bg-white rounded shadow-lg overflow-auto max-w-lg w-full max-h-full">
        <div class="p-5">
          <!-- Modal header -->
          <div class="mb-2">
            <div class="flex justify-between items-center">
              <div class="text-lg font-semibold text-slate-800" v-if="title">{{ title }}</div>
              <button class="text-slate-400 hover:text-slate-500" @click.stop="close">
                <div class="sr-only">Close</div>
                <Icon class="w-5 h-5" name="mdi:close" />
              </button>
            </div>
          </div>
          <slot name="content" :close="close" />
        </div>
      </div>
    </div>
  </transition>
</template>