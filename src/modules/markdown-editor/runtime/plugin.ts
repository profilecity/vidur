import { defineNuxtPlugin } from '#app'
import { useMarkdownEditor } from '../../../composables/useMarkdownEditor'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('markdownEditor', useMarkdownEditor)
})