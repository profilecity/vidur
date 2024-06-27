<script setup lang="ts">
// TODO: Add CSS styling for box type (danger | warning | default).
const props = withDefaults(defineProps<{
  title?: string;
  content?: string;
  type?: 'danger' | 'warning' | 'default';
  closeIsCancel?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
}>(), {
  type: 'default',
  closeIsCancel: true,
  confirmLabel: 'Agree',
  cancelLabel: 'Cancel'
});

const emit = defineEmits<{
  confirm: [],
  cancel: [],
  close: [],
}>()

const close = () => {
  emit('close');
  if (props.closeIsCancel) {
    emit('cancel');
  }
}

const confirm = (closeModalFn: () => void) => {
  closeModalFn();
  emit('confirm');
}

const cancel = (closeModalFn: () => void) => {
  closeModalFn();
  emit('cancel');
}
</script>
<template>
  <Modal :title="title" @close="close">
    <template #input="{ open }">
      <slot name="input" :open="open" />
    </template>
    <template #content="{ close }">
      <div class="text-sm mb-5">
        <div class="space-y-2">
          <p v-if="content">{{ content }}</p>
        </div>
      </div>
      <!-- Modal footer -->
      <div class="flex flex-wrap justify-end space-x-2">
        <button class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" @click.stop="cancel(close)">
          {{ cancelLabel }}
        </button>
        <button class="btn-sm bg-zinc-900 hover:bg-zinc-800 text-white" @click.stop="confirm(close)">
          {{ confirmLabel }}
        </button>
      </div>
    </template>
  </Modal>
</template>