import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'markdown-editor',
    configKey: 'markdownEditor'
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve('./runtime/plugin'))

    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: resolver.resolve('./components'),
        prefix: 'Markdown'
      })
    })

    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolver.resolve('./composables'))
    })
  }
})