<script setup lang="ts">
import { seoConfigSchema } from '~/schemas/setting';

const emits = defineEmits<{
  saved: [];
}>();

const generalSettings = useGeneralSettings();
const { updateGeneralSettings, generalSettings: generalSettingsPublic } = usePublicGeneralSettings();

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
let stopWatching: () => void;
stopWatching = watchEffect(() => {
  if (generalSettings.data.value) {
    const gs = generalSettings.data.value;

    title.value = gs.seo.title;
    description.value = gs.seo.description;
    twitter.value = gs.seo.twitter;

    stopWatching && stopWatching();
  }
});

const isSubmitting = ref(false);
const onSubmit = handleSubmit(async values => {
  try {
    isSubmitting.value = true;
    await $fetch('/api/settings/general', {
      method: 'PUT',
      body: { ...values },
    });
    updateGeneralSettings({ seo: values, organization: generalSettingsPublic.value.organization });
    emits('saved');
  } catch (error) {
    console.error("Error saving settings", error);
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <FrameTabbed tab-group="settings">
    <template #action>
      <InputButton @click="onSubmit" :disabled="isSubmitting">
        Save
      </InputButton>
    </template>
    <template #content>
      <form class="px-4 space-y-6 w-full md:w-2/3 items-center mt-4" @submit="onSubmit">
        <div class="md:flex gap-4 items-center mt-5">
          <InputText class="w-full md:w-1/2" placeholder="Big Space Career Site" v-model="title" id="seo-title"
            :error="errors['title']" label="Website Title" />
          <InputText class="w-full md:w-1/2" placeholder="Big Space Career Site Decrition" v-model="description"
            id="seo-description" :error="errors['description']" label="Website Description" />
        </div>
        <div class="md:flex gap-4 items-center mt-5">
          <InputText class="w-full md:w-1/2" placeholder="big_space_tech" v-model="twitter" id="seo-twitter"
            :error="errors['twitter']" label="Twitter Handle (without @)" />
        </div>
      </form>
    </template>
  </FrameTabbed>
</template>