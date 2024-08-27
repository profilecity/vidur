<script setup lang="ts">
import type { Hook } from '~/server/db/schema';

import { createHookSchema, updateHookSchema } from '~/schemas/hook';

const { saveHook, updateHook, isSubmitting } = await useHooks();

const props = defineProps<{
  hook?: Hook;
}>();

const emits = defineEmits<{
  created: [];
  updated: [];
}>();

const isUpdating = !!props.hook;

const formSchema = toTypedSchema(isUpdating ? updateHookSchema : createHookSchema);

const { handleSubmit, errors, defineField, handleReset } = useForm({
  validationSchema: formSchema,
});

// @ts-expect-error
const [id] = defineField('id');

const [title] = defineField('title');
const [url] = defineField('url');

if (isUpdating) {
  id.value = props.hook.id;
  title.value = props.hook.title;
  url.value = props.hook.url;
}

const onSubmit = handleSubmit(async (values) => {
  let success;

  if (isUpdating) {
    success = await updateHook(values);
  } else {
    success = await saveHook(values);
  }

  if (!success) return;

  if (isUpdating) {
    emits('updated');
  } else {
    emits('created');
  }
});

const clear = () => {
  if (isUpdating) {
    throw new Error('Can not call clear when updating');
  }
  title.value = undefined;
  url.value = undefined;
  handleReset();
};

defineExpose({
  clear,
});
</script>

<template>
  <form class="flex flex-col items-start space-y-2 mt-4" @submit="onSubmit">
    <InputText
      class="w-full"
      label="Title"
      :error="errors.title"
      placeholder="My External ATS Provider"
      v-model="title"
    />
    <InputText
      class="w-full"
      label="URL"
      :error="errors.url"
      placeholder="https://ats-provider.com/api/register-event"
      type-override="url"
      v-model="url"
    />
    <InputButton :disabled="isSubmitting" type="submit">
      {{ isUpdating ? 'Save' : 'Create' }}
    </InputButton>
  </form>
</template>
