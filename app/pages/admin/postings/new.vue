<script setup lang="ts">
import { createJobPostingSchema } from '~~/shared/schemas/posting';

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

useHead({
  title: 'New Posting',
});

const { refresh } = await usePostingsRepository();

const formSchema = toTypedSchema(createJobPostingSchema);
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: formSchema,
});

const [title] = defineField('title');
const [contents] = defineField('contents');
const [tagsCSV] = defineField('tagsCSV');
const [isPublished] = defineField('isPublished');

const isSubmitting = ref(false);

const onSubmit = handleSubmit(async (values) => {
  try {
    isSubmitting.value = true;
    await $fetch('/api/posting', {
      method: 'POST',
      body: {
        ...values,
      },
    });
    refresh();
    await navigateTo('/admin/postings');
  } catch (e) {
    console.error(e);
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <div class="w-full max-w-9xl mx-auto">
    <!-- Page header -->
    <div
      class="flex flex-col md:flex-row justify-between items-center mb-4 border-b border-zinc-200 p-4 bg-white"
    >
      <!-- Left: Title -->
      <div class="mb-4 sm:mb-0">
        <h2
          class="text-md md:text-lg text-zinc-800 font-bold flex items-center"
        >
          <Icon
            class="w-5 h-5 shrink-0 fill-current mr-2"
            name="iconamoon:edit"
          />New Posting
        </h2>
      </div>
      <!-- Right: Actions -->
      <div class="flex items-center space-x-3">
        <InputSwitch label="Publish?" v-model="isPublished" />
        <AbstractConfirmationBox
          title="Save Posting?"
          content="Are you sure you want to save the changes?"
          @confirm="onSubmit"
        >
          <template #input="{ open }">
            <InputButton :disabled="isSubmitting" @click="open">
              <div class="flex spece-x-2 items-center">
                <Icon name="lets-icons:save" class="w-3 h-3 mr-1" />
                <span>Save</span>
              </div>
            </InputButton>
          </template>
        </AbstractConfirmationBox>
      </div>
    </div>
    <!-- Input Section -->
    <form @submit="onSubmit">
      <div class="px-4">
        <div class="mx-auto mt-4">
          <InputText
            placeholder="Senior Software Engineer"
            label="Title"
            :disabled="isSubmitting"
            :error="errors.title"
            v-model="title"
          />
          <InputText
            class="mt-4"
            placeholder="Remote, Full Time, San Fransisco"
            label="Tags (CSV)"
            :disabled="isSubmitting"
            v-model="tagsCSV"
          />
          <div class="mt-4">
            <label class="block text-sm font-medium mb-1" for="jobdescription"
              >Job Description</label
            >
            <Editor
              placeholder="We are looking for someone who can..."
              v-model="contents"
            />
            <div class="text-xs mt-1 text-rose-500">{{ errors.contents }}</div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
