<script setup lang="ts">
// TODO: Add CSS styling for box type (danger | warning | default).
const props = withDefaults(
  defineProps<{
    title?: string;
    content?: string;
    type?: 'destructive' | 'default';
    closeIsCancel?: boolean;
    confirmLabel?: string;
    cancelLabel?: string;
  }>(),
  {
    type: 'default',
    closeIsCancel: true,
    confirmLabel: 'Agree',
    cancelLabel: 'Cancel',
  }
);

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

const confirm = (closeModalFn: () => void) => {
  closeModalFn();
  emit('confirm');
};

const cancel = (closeModalFn: () => void) => {
  closeModalFn();
  emit('cancel');
};
</script>
<template>
  <Modal :title="title" :description="content">
    <template #input="{ open }">
      <slot name="input" :open="open" />
    </template>
    <template #content="{ close }">
      <!-- Modal footer -->
      <div class="flex flex-wrap justify-end space-x-2 p-2">
        <VInputButton variant="secondary" @click="cancel(close)">
          {{ cancelLabel }}
        </VInputButton>
        <VInputButton :variant="props.type" @click="confirm(close)">
          {{ confirmLabel }}
        </VInputButton>
      </div>
    </template>
  </Modal>
</template>
