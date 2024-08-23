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
} from 'radix-vue'

defineProps<{
  title?: string;
  description?: string;
}>()

const isModalOpen = ref(false);

const open = () => {
  isModalOpen.value = true
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
      <DialogOverlay class="bg-zinc-900 bg-opacity-60 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0 z-30"/>
      <DialogContent class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]">
        <DialogTitle v-if="title">{{ title }}</DialogTitle>
        <DialogDescription v-if="description">{{ description }}</DialogDescription>
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