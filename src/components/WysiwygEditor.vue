<template>
  <div>
    <div :id="editorId"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useWysiwygEditor } from '../composables/useWysiwygEditor';

export default defineComponent({
  name: 'WysiwygEditor',
  props: {
    initialContent: {
      type: String,
      default: '',
    },
  },
  emits: ['update:content'],
  setup(props, { emit }) {
    const { editorContent, editorId } = useWysiwygEditor();

    watch(editorContent, (newContent) => {
      emit('update:content', newContent);
    });

    return {
      editorContent,
      editorId,
    };
  },
});
</script>

<style>
@import 'quill/dist/quill.snow.css';
.quill-container .ql-container {
  @apply border-2 border-blue-500 bg-gray-100;
}
.quill-container .ql-editor {
  @apply bg-white p-4 min-h-screen;
}
</style>