import { defineNuxtPlugin } from '#app'
import { useWysiwygEditor } from '../../../composables/useWysiwygEditor'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('wysiwygEditor', useWysiwygEditor)
})
