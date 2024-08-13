<script setup lang="ts">
const emits = defineEmits<{
  update: [string];
}>();

const saveImage = async (croppedBlob: Blob, closeFn: () => void) => {
  try {
    const formData = new FormData();
    formData.append("asset", croppedBlob);
    const response = await $fetch('/api/asset', {
      method: 'PUT',
      body: formData,  
    })
    closeFn();
    emits("update", response.id);
  } catch (error) {
    console.error("Error uploading logo", error);
  }
}
</script>

<template>
  <Modal title="Update Organisation Logo">
    <template #input="{ open }">
      <button class="px-2 py-1 bg-zinc-200 text-xs rounded hover:bg-zinc-300" @click="open">Edit</button>
    </template>
    <template #content="{ close }">
      <ImageCropperWrapper @on-crop="(blob: Blob) => saveImage(blob, close)"/>
    </template>
  </Modal>
</template>