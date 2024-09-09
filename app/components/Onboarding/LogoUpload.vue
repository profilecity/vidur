<script setup lang="ts">
const emits = defineEmits<{
  done: [string];
}>();

const saveImage = async (croppedBlob: Blob) => {
  try {
    const formData = new FormData();
    formData.append('asset', croppedBlob);
    const response = await $fetch('/api/asset', {
      method: 'PUT',
      body: formData,
    });
    emits('done', response.id);
  } catch (error) {
    console.error('Error uploading logo', error);
  }
};
</script>
<template>
  <div>
    <div class="text-xl text-center font-bold font-noto">Upload Logo</div>
    <div class="text-center text-zinc-600">Choose a preferred logo for your career site.</div>
    <ImageCropperWrapper class="mx-auto mt-8" @on-crop="saveImage" />
  </div>
</template>
