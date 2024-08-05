import { ref, watch, computed } from 'vue'
import MarkdownIt from 'markdown-it'

export function useMarkdownEditor() {
  const markdownContent = ref('')
  const htmlPreview = ref('')

  const md = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  })

  const updatePreview = async () => {
    console.log('Updating preview. Markdown content:', markdownContent.value)
    const rawHtml = md.render(markdownContent.value)
    console.log('Rendered HTML:', rawHtml)
    
    try {
      const DOMPurify = await import('dompurify')
      htmlPreview.value = DOMPurify.default.sanitize(rawHtml, {
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
      })
      console.log('Sanitized HTML:', htmlPreview.value)
    } catch (error) {
      console.error('Error importing or using DOMPurify:', error)
      htmlPreview.value = rawHtml 
    }
  }

  watch(markdownContent, updatePreview, { immediate: true })

  const previewStyle = computed(() => ({
    overflowY: 'auto',
    maxHeight: '500px',
    padding: '10px'
  }))

  return {
    markdownContent,
    htmlPreview,
    previewStyle
  }
}