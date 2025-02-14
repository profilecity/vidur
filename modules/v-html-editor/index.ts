import { addImportsSources, createResolver, defineNuxtModule } from 'nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'v-html-editor',
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    const composables = resolver.resolve('./runtime/composables.ts');
    addImportsSources({
      from: composables,
      imports: ['useHtmlEditor'],
    });

    const consts = resolver.resolve('./runtime/consts.ts');
    addImportsSources({
      from: consts,
      imports: ['DEFAULT_HTML'],
    });
  },
});
