<script setup lang="ts">
import { seoConfigSchema } from '~~/shared/schemas/setting';

const { data, setData } = useSeoConfigObjectState();

// Define form schema and use it in the form handling
const formSchema = toTypedSchema(seoConfigSchema);
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: formSchema,
});

// SEO Fields
const [title] = defineField('title');
const [description] = defineField('description');
const [twitter] = defineField('twitter');

// Initialize fields with data from settings
title.value = data.value.title;
description.value = data.value.description;
twitter.value = data.value.twitter;

const isSubmitting = ref(false);
const onSubmit = handleSubmit(async (values) => {
  try {
    isSubmitting.value = true;
    await $fetch('/api/settings/seo', {
      method: 'PUT',
      body: values,
    });
    setData(values);
  } catch (error) {
    console.error('Error saving settings', error);
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <VFrameTabbed tab-group="settings">
    <template #action>
      <VInputButton @click="onSubmit" :disabled="isSubmitting"> Save </VInputButton>
    </template>
    <template #content>
      <form class="px-4 space-y-6 w-full md:w-2/3 items-center mt-4" @submit="onSubmit">
        <div class="md:flex gap-4 items-center mt-5">
          <VInputText
            class="w-full md:w-1/2"
            placeholder="Big Space Career Site"
            v-model="title"
            id="seo-title"
            :error="errors['title']"
            label="Website Title"
          />
          <VInputText
            class="w-full md:w-1/2"
            placeholder="Big Space Career Site Description"
            v-model="description"
            id="seo-description"
            :error="errors['description']"
            label="Website Description"
          />
        </div>
        <div class="md:flex gap-4 items-center mt-5">
          <VInputText
            class="w-full md:w-1/2"
            placeholder="big_space_tech"
            v-model="twitter"
            id="seo-twitter"
            :error="errors['twitter']"
            label="Twitter Handle (without @)"
          />
        </div>
      </form>
    </template>
  </VFrameTabbed>
</template>
