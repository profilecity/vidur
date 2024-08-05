<template>
  <div class="markdown-editor">
    <div class="flex space-x-4">
      <div class="w-1/2">
        <textarea
          v-model="localMarkdownContent"
          class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :style="{ height: editorHeight }"
          :placeholder="placeholder"
          :disabled="disabled"
          @input="updateContent"
        ></textarea>
      </div>
      <div class="w-1/2">
        <div
          class="w-full p-2 border rounded-md overflow-y-auto prose prose-sm"
          :style="{ height: editorHeight }"
          v-html="htmlPreview"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMarkdownEditor } from '../composables/useMarkdownEditor.ts'

const props = defineProps<{
  modelValue?: string
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'htmlUpdate', value: string): void
}>()

const { markdownContent, htmlPreview } = useMarkdownEditor()

const localMarkdownContent = ref(props.modelValue || '')

watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined && newValue !== localMarkdownContent.value) {
    localMarkdownContent.value = newValue
    markdownContent.value = newValue
  }
})

watch(localMarkdownContent, (newValue) => {
  emit('update:modelValue', newValue)
  markdownContent.value = newValue
})

watch(htmlPreview, (newValue) => {
  emit('htmlUpdate', newValue)
})

const editorHeight = ref('300px')

const updateContent = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement
  localMarkdownContent.value = textarea.value
  adjustEditorHeight(textarea)
}

const adjustEditorHeight = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight}px`
  editorHeight.value = `${textarea.scrollHeight}px`
}
</script>

<style scoped>
.markdown-editor textarea {
  min-height: 300px;
  resize: vertical;
}
</style>