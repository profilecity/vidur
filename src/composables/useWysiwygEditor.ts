import { ref, onMounted, onUnmounted, type Ref } from 'vue';
import type Quill from 'quill';

export function useWysiwygEditor(): {
  editorContent: Ref<string>;
  editorId: string;
  initEditor: () => void;
} {
  const editorContent = ref<string>('');
  const editorId = 'quill-editor';
  let editorInstance: Quill | null = null;

  const initEditor = () => {
    if (typeof window !== 'undefined' && !editorInstance) {
      import('quill').then((QuillModule) => {
        const Quill = QuillModule.default;
        editorInstance = new Quill(`#${editorId}`, {
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
              ['link', 'image', 'video']
            ]
          },
          placeholder: 'enter your JD...',
          theme: 'snow'
        });

        editorInstance.on('text-change', () => {
          if (editorInstance) {
            editorContent.value = editorInstance.root.innerHTML;
          }
        });
      });
    }
  };

  const destroyEditor = () => {
    editorInstance = null;
  };

  if (typeof window !== 'undefined') {
    onMounted(initEditor);
    onUnmounted(destroyEditor);
  }

  return {
    editorContent,
    editorId,
    initEditor,
  };
}