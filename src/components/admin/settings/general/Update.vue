<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { z } from 'zod';
import { generalSettingsSchema } from '~/schemas/setting';
import { useGeneralSettings } from '~/composables/useGeneralSettings';
import { useForm, toTypedSchema } from '@vee-validate/zod';
import { useRemoteAsset } from '~/composables/useRemoteAsset';

const featuredLinks = ref([{ url: '', title: '' }]);

const LinkSchema = z.object({
  url: z.string().url(),
  title: z.string().optional(),
});

const addLink = () => {
  featuredLinks.value.push({ url: '', title: '' });
};

withDefaults(defineProps<{
  forms?: 'general' | 'seo' | 'all';
  saveLabel?: string;
}>(), {
  forms: 'all',
  saveLabel: 'Save',
});

const emits = defineEmits<{
  saved: [];
}>();

const { url, tick } = useRemoteAsset('orgImage');

const generalSettings = useGeneralSettings();

const formSchema = toTypedSchema(generalSettingsSchema);
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: formSchema,
});

// Organization Fields
const [organizationName] = defineField('organization.name');
const [organizationDescription] = defineField('organization.description');
const [organizationLocation] = defineField('organization.location');
const [organizationLinks] = defineField('organization.links');

// Seo Fields
const [seoTitle] = defineField('seo.title');
const [seoDescription] = defineField('seo.description');
const [seoTwitter] = defineField('seo.twitter');

watchEffect(() => {
  if (generalSettings.data.value) {
    // Setting defaults
    const gs = generalSettings.data.value;

    organizationName.value = gs.organization.name;
    organizationDescription.value = gs.organization.description;
    organizationLocation.value = gs.organization.location;
    featuredLinks.value = gs.organization.links || [{ url: '', title: '' }];

    seoTitle.value = gs.seo.title;
    seoDescription.value = gs.seo.description;
    seoTwitter.value = gs.seo.twitter;
  }
});

const isSubmitting = ref(false);

const onSubmit = handleSubmit(async values => {
  try {
    // Validate and prepare featured links
    const links = featuredLinks.value.map(link => ({
      ...link,
      title: link.title || link.url,
    }));
    const result = z.array(LinkSchema).safeParse(links);
    if (!result.success) {
      alert('Invalid links!');
      return;
    }

    isSubmitting.value = true;
    await $fetch('/api/settings/general', {
      method: 'PUT',
      body: {
        ...values,
        organization: {
          ...values.organization,
          links: result.data,
        },
      },
    });
    emits('saved');
  } catch (error) {
    console.error('error saving settings', error);
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <div class="">
    <!-- Organization Settings -->
    <div class="px-4 space-y-6 w-full">
      <section>
        <h4 class="text-lg font-medium text-gray-900">Organization</h4>
        <div class="md:flex gap-4 items-center">
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="name">Organization Name</label>
            <input class="input-custom" type="text" v-model="organizationName" />
            <div class="text-xs mt-1 text-rose-500">{{ errors['organization.name'] }}</div>
          </div>
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto">Description</label>
            <input class="input-custom" type="text" v-model="organizationDescription" />
            <div class="text-xs mt-1 text-rose-500">{{ errors['organization.description'] }}</div>
          </div>
        </div>
        <div class="md:flex gap-4 items-center mt-5">
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="location">Location</label>
            <input class="input-custom" type="text" v-model="organizationLocation" />
            <div class="text-xs mt-1 text-rose-500">{{ errors['organization.location'] }}</div>
          </div>
        </div>
      </section>

      <!-- Featured Links -->
      <section>
        <h4 class="text-lg font-medium text-gray-900">Featured Links</h4>
        <div v-for="(link, index) in featuredLinks" :key="index" class="flex gap-2 mb-2">
          <input v-model="link.url" placeholder="URL" class="input-custom" />
          <input v-model="link.title" placeholder="Title" class="input-custom" />
        </div>
        <button @click="addLink" class="btn bg-zinc-900 hover:bg-zinc-800 text-white">+</button>
      </section>

      <!-- Seo Fields -->
      <section>
        <h4 class="text-lg font-medium text-gray-900">SEO Settings</h4>
        <div class="md:flex gap-4 items-center mt-5">
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="seoTitle">Website Title</label>
            <input class="input-custom" type="text" v-model="seoTitle" />
            <div class="text-xs mt-1 text-rose-500">{{ errors['seo.title'] }}</div>
          </div>
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto">Website Description</label>
            <input class="input-custom" type="text" v-model="seoDescription" />
            <div class="text-xs mt-1 text-rose-500">{{ errors['seo.description'] }}</div>
          </div>
        </div>
        <div class="md:flex gap-4 items-center mt-5">
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto">Twitter Handle (without @)</label>
            <input class="input-custom" type="text" v-model="seoTwitter" />
            <div class="text-xs mt-1 text-rose-500">{{ errors['seo.twitter'] }}</div>
          </div>
        </div>
      </section>

      <!-- Panel footer -->
      <footer>
        <div class="flex w-full justify-start mb-10 mt-4">
          <button class="btn bg-zinc-900 hover:bg-zinc-800 text-white" @click="onSubmit" :disabled="isSubmitting">
            {{ saveLabel }}
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.input-custom {
  @apply w-full block py-2 px-4 border border-zinc-200 rounded-xl text-sm placeholder:text-zinc-400 focus:ring-1 focus:ring-inset focus:ring-zinc-300 sm:text-sm sm:leading-6 outline-0;
}
.btn {
  @apply mt-3;
}
</style>
