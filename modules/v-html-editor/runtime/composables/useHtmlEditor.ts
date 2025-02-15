import type CodeFlask from 'codeflask';

export interface HTMLEditorOptions {
  code: Ref<string | undefined>;
}

/**
 * Manage state of HTMLEditor.
 */
export default function useHtmlEditor({ code }: HTMLEditorOptions) {
  const flask = shallowRef<CodeFlask>();
  const container = ref<HTMLElement>();

  const registerCode = (input: string) => {
    console.log('Code updates', input);
    code.value = input;
  };

  onMounted(() =>
    nextTick(async () => {
      if (!container.value) throw new Error("Container element for VHtmlEditor wasn't found. Maybe it is not mounted.");

      container.value.classList.add('codeflask-editor');

      // Imports (lazily imported once we are sure we need to mount codeflask)
      await import('../assets/codeflask.css');
      const CodeFlask = (await import('codeflask')).default;

      flask.value = new CodeFlask(container.value, {
        language: 'html',
        enableAutocorrect: false,
        lineNumbers: false,
      });

      if (code.value) {
        flask.value.updateCode(code.value);
      }

      flask.value.onUpdate(registerCode);
    })
  );

  onBeforeUnmount(() => {
    // Destroy the editor instance when the component is unmounted.
    flask.value = undefined;
  });

  return { container, flask };
}
