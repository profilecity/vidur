<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import '~/assets/codeflask.css';

const props = defineProps<{
  code: string;
  showPreview?: boolean;
}>();

const code = useVModel(props, 'code');

const { container: inputContainer } = useHtmlEditor({ code });
const { container: outputContainer } = useHtmlPreview({ code });
</script>

<template>
  <div class="flex w-full h-full border rounded-default" v-if="props.showPreview">
    <VFormInput label="HTML Code">
      <template #input>
        <div class="form-input !p-0" ref="inputContainer"></div>
      </template>
    </VFormInput>
    <VFormInput label="Preview">
      <template #input>
        <div class="bg-white border" ref="outputContainer"></div>
      </template>
    </VFormInput>
  </div>
  <div class="form-input !p-0" ref="inputContainer" v-else></div>
</template>
