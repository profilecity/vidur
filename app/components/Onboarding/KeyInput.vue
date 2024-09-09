<script setup lang="ts">
const emits = defineEmits<{
  done: [string];
}>();

const key = ref('');
const error = ref('');

const isVerifying = ref(false);
const verify = async () => {
  if (!key.value) return;
  try {
    isVerifying.value = true;
    const response = await $fetch<{ result: boolean }>('/api/onboarding/validate-key', {
      method: 'POST',
      body: { key: key.value },
    });
    if (response.result) {
      emits('done', key.value);
    } else {
      error.value = 'Invalid Key. Try again.';
    }
  } catch (e) {
    console.error('Error checking key status', e);
    error.value = 'Some error occured. Try again later.';
  } finally {
    isVerifying.value = false;
  }
};
</script>
<template>
  <section class="flex items-center justify-center min-h-screen">
    <div class="max-w-sm mx-auto w-full text-center">
      <div class="justify-center flex">
        <img src="/vidur-logo.svg" class="h-5" />
      </div>
      <h4 class="text-md text-zinc-600 mt-2 mb-6">The only recruiting software you will ever need.</h4>
      <!-- Form -->
      <form class="justify-center mt-10">
        <InputText
          id="input-key"
          label="To get started, enter the one-time setup code."
          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
          v-model="key"
        />
        <InputLabel
          label="You can find the key in standard logs of the server."
          label-class="text-xs text-zinc-400"
          id="random"
        />
        <span class="text-sm font-bold text-rose-500">{{ error }}</span>
        <div class="flex justify-center mt-6">
          <InputButton @click.prevent="verify" :loading="isVerifying" spinner-class="h-6">Verify</InputButton>
        </div>
      </form>
    </div>
  </section>
</template>
