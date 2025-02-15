import { watchDebounced } from '@vueuse/core';
import { DEFAULT_HTML } from '../consts';

export interface HTMLPreviewOptions {
  code: Ref<string | undefined>;
}

export default function useHtmlPreview({ code }: HTMLEditorOptions) {
  const container = ref<HTMLElement>();

  onMounted(async () => {
    await nextTick();
    if (!container.value) throw new Error("Container element for VHtmlPreview wasn't found. Maybe it is not mounted.");

    container.value.classList.add('codeflask-editor');

    const el = document.createElement('v-html-preview');
    el.attachShadow({ mode: 'open' });

    if (!el.shadowRoot) throw new Error('Shadow root was not created');

    el.shadowRoot.innerHTML = code.value || DEFAULT_HTML;
    container.value.appendChild(el);

    watchDebounced(
      code,
      (newCode) => {
        el.shadowRoot!.innerHTML = newCode || DEFAULT_HTML;
      },
      { debounce: 500, maxWait: 1000 }
    );
  });

  return { container };
}
