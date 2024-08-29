<template>
  <div id="snow-wrapper">
    <div id="snow-container">
      <div class="toolbar bg-white rounded-t-xl mt-2" v-if="!readOnly">
        <span class="ql-formats">
          <select class="ql-header" defaultValue="3">
            <option value="1">Heading</option>
            <option value="2">Subheading</option>
            <option value="3">Normal</option>
          </select>
        </span>
        <span class="ql-formats">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
          <select class="ql-align" defaultValue="false">
            <option label="left"></option>
            <option label="center" value="center"></option>
            <option label="right" value="right"></option>
            <option label="justify" value="justify"></option>
          </select>
        </span>
        <span class="ql-formats">
          <button class="ql-link"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-clean"></button>
        </span>
      </div>
      <div class="bg-white rounded-b-xl border p-4" :class="readOnly ? 'ql-e-blank' : ''" :id="editorId"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import type Quill from 'quill';

const props = withDefaults(defineProps<{
  modelValue?: string | null;
  placeholder?: string;
  id?: string;
  readOnly?: boolean;
}>(), {
  id: 'vidur-editor',
  readOnly: false,
});
const emit = defineEmits<{
  'update:modelValue': [],
}>();

const editorContent = useVModel(props, 'modelValue', emit);
const editorId = props.id;
let editorInstance: Quill | null;

onMounted(async () => {
  const QuillEditor = (await import('quill')).default;

  editorInstance = new QuillEditor(`#${editorId}`, {
    bounds: '#snow-container .ql-container',
    modules: {
      // syntax: true, TODO: ref: https://quilljs.com/docs/modules/syntax
      toolbar: props.readOnly ? false : '#snow-container .toolbar',
    },
    placeholder: props.placeholder,
    theme: 'snow',
    readOnly: props.readOnly,
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

<style>
@import 'quill/dist/quill.snow.css';

.ql-editor {
  padding: 0% !important;
  border: 0px !important;
}

.ql-editor {
  @apply !text-base
}

.ql-editor > h1, h2 {
  @apply text-zinc-600 font-noto
}

.ql-editor > h3, h4, h5, h6, ol, p, ul {
  @apply text-zinc-700 font-lato
}

.ql-editor > h1 {
  @apply text-2xl
}

.ql-editor > h2 {
  @apply !text-xl
}

.ql-editor > h3 {
  @apply !text-base
}

.ql-e-blank {
  padding: 0% !important;
  border: 0px !important;
}
</style>