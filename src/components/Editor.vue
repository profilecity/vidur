<script setup lang="ts">
if (!import.meta.client) {
  throw new Error("Cannot mount <Editor/> in SSR. Wrap with <ClientOnly/>");
}

import { useVModel } from "@vueuse/core";
import { randomUUID } from "uncrypto";
import type Quill from 'quill';

const props = defineProps<{
  'modelValue': string;
  'placeholder': string;
}>();
const emit = defineEmits<{
  'update:modelValue': [],
}>();

const editorContent = useVModel(props, 'modelValue', emit);
const editorId = "randomUUID";
let editorInstance: Quill | null;

onMounted(async () => {
  await nextTick();
  const QuillEditor = (await import('quill')).default;

  editorInstance = new QuillEditor(`#${editorId}`, {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['link']
      ],
    },
    placeholder: props.placeholder,
    theme: 'snow'
  });

  if (editorContent.value) {
    editorInstance.root.innerHTML = editorContent.value;
  }

  editorInstance.on('text-change', () => {
    if (!editorInstance) return;
    editorContent.value = editorInstance.root.innerHTML;
  });
});

onUnmounted(() => {
  editorInstance = null;
});
</script>

<template>
  <div :id="editorId"></div>
</template>

<style>
@import 'quill/dist/quill.snow.css';
</style>