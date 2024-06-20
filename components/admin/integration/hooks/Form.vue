<script setup lang="ts">
import type { Hook } from "~/server/db/schema";

import { createHookSchema, updateHookSchema } from '~/schemas/hook';

const props = defineProps<{
  hook?: Hook;
}>();

const emits = defineEmits<{
  created: [hook: Hook];
  updated: [hook: Hook];
  deleted: [id: string];
}>();

const isUpdating = !!props.hook;

const formSchema = toTypedSchema(isUpdating ? updateHookSchema : createHookSchema);

const { handleSubmit, errors, defineField, handleReset } = useForm({
  validationSchema: formSchema,
});

// @ts-expect-error
const [id] = defineField("id");

const [title] = defineField("title");
const [url] = defineField("url");

if (isUpdating) {
  id.value = props.hook.id;
  title.value = props.hook.title;
  url.value = props.hook.url;
}

const isSubmitting = ref(false);

const onSubmit = handleSubmit(async values => {
  try {
    isSubmitting.value = true;
    const savedOrUpdatedHook = await $fetch<Hook>('/api/hook', {
      method: isUpdating ? 'PUT' : 'POST',
      body: {
        ...values,
      }
    })
    if (isUpdating) {
      emits("updated", savedOrUpdatedHook);
    } else {
      emits("created", savedOrUpdatedHook);
    }
  } catch (e) {
    console.error(e);
  } finally {
    isSubmitting.value = false;
  }
})

const onDelete = async () => {
  if (!isUpdating) {
    throw new Error("cannot delete when updating");
  }
  try {
    isSubmitting.value = true;
    await $fetch<Hook>('/api/hook', {
      method: 'DELETE',
      query: {
        id: id.value,
      }
    })
    emits("deleted", id.value as string);
  } catch (e) {
    console.error(e);
  } finally {
    isSubmitting.value = false;
  }
}

const clear = () => {
  if (isUpdating) {
    throw new Error("Cannot call clear when updating");
  }
  title.value = undefined;
  url.value = undefined;
  handleReset();
}

defineExpose({
  clear,
});
</script>

<template>
  <div>
    <div v-if="!isUpdating">
      <div class="font-bold">Create New Hook</div>
      <div class="text-sm mb-4">Create a hook to start receiving events immediatly. Use <a
          class="underline text-blue-500" href="https://atlas.thenirvanalabs.com/oauth2/jwks" target="_blank"
          rel="noopener noreferrer">this</a> JWKs RSA key to authorise requests.</div>
    </div>
    <form class="flex flex-col md:flex-row w-full space-x-3 items-center" @submit="onSubmit">
      <div class="flex flex-col md:flex-row items-center space-x-3">
        <label class="block text-sm font-medium mb-1" for="title">Title <span class="text-rose-500">*</span></label>
        <div>
          <input id="title" class="form-input" placeholder="My External ATS Provider" type="text" v-model="title"
            :disabled="isSubmitting" />
          <div class="text-xs mt-1 text-rose-500">{{ errors.title }}</div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row items-center space-x-3">
        <label class="block text-sm font-medium mb-1" for="url">URL <span class="text-rose-500">*</span></label>
        <div>
          <input id="url" class="form-input" placeholder="https://ats-provider.com/api/register-event" type="url"
            v-model="url" :disabled="isSubmitting" />
          <div class="text-xs mt-1 text-rose-500">{{ errors.url }}</div>
        </div>
      </div>
      <div class="flex space-x-2">
        <button class="btn btn-sm bg-red-500 hover:bg-red-800 text-white" :disabled="isSubmitting" @click="onDelete"
          v-if="isUpdating">Delete</button>
        <button class="btn btn-sm bg-zinc-900 hover:bg-zinc-800 text-white" :disabled="isSubmitting" type="submit">{{
      isUpdating ? "Save" :
          "Create" }}</button>
      </div>
    </form>
  </div>
</template>