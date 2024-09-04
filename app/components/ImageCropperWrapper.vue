<script setup lang="ts">
import { useDropZone } from '@vueuse/core';

const cropperRef = ref();
const { crop, reset, croppedBlob, croppedBlobURL, loadImageFromFile, blobURL } =
  useImageCropper(cropperRef);

const emits = defineEmits<{
  onCrop: [Blob]; // croppedBlob
}>();

withDefaults(
  defineProps<{
    aspectRatio?: number;
  }>(),
  {
    aspectRatio: 1,
  }
);

const dropZoneRef = ref<HTMLDivElement>();
const selectedFile = ref<File | null | undefined>(null);

function onDrop(_files: File[] | FileList | null) {
  if (_files == null) return;
  const files = Array.from(_files) as File[];
  if (files && files.length > 0) {
    if (files[0] === undefined) return;
    selectedFile.value = files[0];
    loadImageFromFile(files[0]);
  }
}

function onSelect(event: Event) {
  onDrop((event.target as HTMLInputElement)?.files);
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ['image/jpeg', 'image/png', 'image/gif'],
});

const save = () => {
  emits('onCrop', croppedBlob.value);
};
</script>

<template>
  <div class="max-w-xl" v-if="selectedFile && !croppedBlob">
    <image-cropper
      ref="cropperRef"
      :src="blobURL"
      :stencil-props="{ aspectRatio }"
    />
    <div class="flex w-full justify-end items-center space-x-1 mt-2">
      <InputButton variant="secondary" @click="selectedFile = null"
        >Reset</InputButton
      >
      <InputButton @click="crop">Crop</InputButton>
    </div>
  </div>
  <div class="max-w-xl" v-else-if="selectedFile && croppedBlob">
    <div class="flex w-full items-center justify-center">
      <img
        :src="croppedBlobURL"
        class="w-64 h-64 border border-zinc-700 rounded-xl"
      />
    </div>
    <div class="flex w-full justify-end items-center space-x-1 mt-2">
      <InputButton variant="secondary" @click="reset">Reset</InputButton>
      <InputButton @click="save">Save</InputButton>
    </div>
  </div>
  <div class="max-w-xl" ref="dropZoneRef" v-else>
    <label
      class="flex justify-center w-full h-32 px-4 transition bg-white border border-dashed rounded-md appearance-none cursor-pointer focus:outline-none"
      :class="isOverDropZone ? 'border-gray-600' : 'border-gray-300'"
    >
      <span class="flex items-center justify-center space-x-2">
        <span class="text-sm text-gray-600 text-center">
          <Icon name="mage:image-upload" class="w-6 h-6 text-gray-600" /><br />
          Drop image to Attach, or
          <span class="text-blue-600 underline">browse</span><br />
          <span class="text-xs text-gray-400"
            >Supported Formats: png, jpeg or gif</span
          >
        </span>
      </span>
      <input
        type="file"
        name="file_upload"
        class="hidden"
        accept="image/png, image/gif, image/jpeg"
        @change="onSelect"
      />
    </label>
  </div>
</template>
