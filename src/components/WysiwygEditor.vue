<template>
  <div>
    <div :id="editorId"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue';
import { useWysiwygEditor } from '../composables/useWysiwygEditor';

export default defineComponent({
  name: 'WysiwygEditor',
  props: {
    initialContent: {
      type: String,
      required: true,
    },
  },
  emits: ['update:content'],
  setup(props, { emit }) {
    const { editorContent, editorId, setEditorContent } = useWysiwygEditor();

    onMounted(() => {
      if (!editorContent.value) {
        setEditorContent(props.initialContent);
      }
    });

    // watch(() => props.initialContent, (newContent) => {
    //   console.log("sss",newContent)
    //   setEditorContent(newContent);
    // });

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
</style>