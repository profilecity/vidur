<script setup lang="ts">
const emits = defineEmits<{
  update: [string];
}>();

const saveImage = async (croppedBlob: Blob, closeFn: () => void) => {
  try {
    const formData = new FormData();
    formData.append('asset', croppedBlob);
    const response = await $fetch('/api/asset', {
      method: 'PUT',
      body: formData,
    });
    closeFn();
    emits('update', response.id);
  } catch (error) {
    console.error('Error uploading logo', error);
  }
};
</script>

<template>
  <Modal title="Update Organisation Logo">
    <template #input="{ open }">
      <InputButton @click="open" variant="secondary" size="sm">
        Edit
      </InputButton>
    </template>
    <template #content="{ close }">
      <ImageCropperWrapper @on-crop="(blob: Blob) => saveImage(blob, close)" />
    </template>
  </Modal>
</template>
