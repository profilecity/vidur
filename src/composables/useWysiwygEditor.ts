import type Quill from 'quill';

export function useWysiwygEditor(): {
  editorContent: Ref<string>;
  editorId: string;
  initEditor: () => void;
  setEditorContent: (htmlContent: string) => void;
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
              ['link']
            ],
          },
          placeholder: 'Enter your JD...',
          theme: 'snow'
        });

        if (editorContent.value) {
          editorInstance.root.innerHTML = editorContent.value;
        }

        editorInstance.on('text-change', () => {
          if (editorInstance) {
            editorContent.value = editorInstance.root.innerHTML;
          }
        });
       
      });
    }
  };

  const setEditorContent = (htmlContent: string) => {
    if (editorInstance) {
      editorInstance.root.innerHTML = htmlContent;
      editorContent.value = htmlContent;
    } else {
      editorContent.value = htmlContent;
    }
  };

  const destroyEditor = () => {
    if (editorInstance) {
      editorInstance = null;
    }
  };

  if (typeof window !== 'undefined') {
    onUnmounted(destroyEditor);
  }


  return {
    editorContent,
    editorId,
    initEditor,
    setEditorContent,
  };
}