<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue';

defineProps<{
  title?: string;
  description?: string;
  classOverride?: string;
  fullScreen?: boolean;
}>();

const isModalOpen = ref(false);

const open = () => {
  isModalOpen.value = true;
};

const close = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <DialogRoot v-model:open="isModalOpen">
    <DialogTrigger as-child>
      <slot name="input" :open="open" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="bg-zinc-900 bg-opacity-60 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0 z-50"
        v-if="!fullScreen"
      />
      <DialogContent
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white focus:outline-none"
        :class="{
          '!h-screen w-full': fullScreen,
          'modal-small': !fullScreen,
          [classOverride || '']: !!classOverride,
        }"
      >
        <DialogTitle class="font-bold text-zinc-900 font-noto">
          <slot name="title-bar">
            {{ title }}
          </slot>
        </DialogTitle>
        <DialogDescription class="text-sm text-zinc-500" v-if="description">{{ description }}</DialogDescription>
        <slot name="content" :close="close" />
        <DialogClose class="absolute top-[10px] right-[10px] inline-flex items-center justify-center">
          <InputButton variant="ghost" size="icon" @click.stop="close">
            <div class="sr-only">Close</div>
            <Icon class="w-5 h-5" name="mdi:close" />
          </InputButton>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
.modal-small {
  @apply z-[100] p-[25px] rounded-[6px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] max-h-[85vh] w-[90vw] max-w-[450px];
}
</style>
