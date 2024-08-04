<script setup lang="ts">
import { generalSettingsSchema } from '~/schemas/setting';
import { z } from 'zod';

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

// Define form schema and use it in the form handling
const formSchema = toTypedSchema(generalSettingsSchema);
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: formSchema,
});

// Organization Fields
const organizationName = defineField('organization.name');
const organizationDescription = defineField('organization.description');
const organizationLocation = defineField('organization.location');
const organizationLinks = defineField('organization.links');

// SEO Fields
const seoTitle = defineField('seo.title');
const seoDescription = defineField('seo.description');
const seoTwitter = defineField('seo.twitter');

// Reactive array to store featured links
const featuredLinks = ref<{ name: string; url: string }[]>([{ name: '', url: '' }]);

// Function to add a new featured link
const addFeaturedLink = () => {
  featuredLinks.value = [...featuredLinks.value, { name: '', url: '' }];
};

// Initialize fields with data from settings
watchEffect(() => {
  if (generalSettings.data.value) {
    const gs = generalSettings.data.value;

    organizationName.value = gs.organization?.name || '';
    organizationDescription.value = gs.organization?.description || '';
    organizationLocation.value = gs.organization?.location || '';

    featuredLinks.value = (gs.organization.links || []).map(link => ({
      name: link.name || link.url,
      url: link.url
    }));

    seoTitle.value = gs.seo?.title || '';
    seoDescription.value = gs.seo?.description || '';
    seoTwitter.value = gs.seo?.twitter || '';
  }
});

const isSubmitting = ref(false);

const onSubmit = handleSubmit(async values => {
  try {
    isSubmitting.value = true;
    
    // The validation is handled by vee-validate, so just include valid links
    const validLinks = featuredLinks.value.map(link => ({
      name: link.name || link.url,
      url: link.url
    }));

    // Merge valid links with other values
    const body = {
      ...values,
      organization: {
        ...values.organization,
        links: validLinks,
      }
    };

    await $fetch('/api/settings/general', {
      method: 'PUT',
      body,
    });

    emits('saved');
  } catch (error) {
    console.error("Error saving settings", error);
  } finally {
    isSubmitting.value = false;
  }
});

// Utility function to validate URL
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
</script>

<template>
  <div class="">
    <!-- Organization Settings -->
    <div class="px-4 space-y-6 w-full items-center mt-4" v-if="forms === 'general' || forms === 'all'">
      <section class="w-full md:w-1/3" v-if="forms === 'all'">
        <h2 class="text-base font-bold text-zinc-900 font-noto">Organization Settings</h2>
        <h4 class="text-sm mb-5 text-zinc-400">Configure career site's home page.</h4>
      </section>
      <section class="w-full md:w-2/3">
        <div class="flex items-end">
          <div class="mr-4">
            <img class="w-16 h-16 md:w-20 md:h-20 rounded-xl" :src="url" width="80" height="80" alt="User upload" />
          </div>
          <AdminSettingsGeneralUpdateOrgLogo @update="tick" />
        </div>
        <div class="md:flex gap-4 items-center mt-5">
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="name">
              Organization Name <span class="text-xs ml-1 text-rose-500">{{ errors['organization.name'] }}</span>
            </label>
            <input class="input-custom" type="text" placeholder="Organization Name" v-model="organizationName.value">
          </div>
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="location">
              Location <span class="text-xs ml-1 text-rose-500">{{ errors['organization.location'] }}</span>
            </label>
            <input id="location" class="input-custom" type="text" placeholder="Boston, MA" v-model="organizationLocation.value" />
          </div>
        </div>
        <div class="w-full mt-5">
          <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="description">
            Bio <span class="text-xs ml-1 text-rose-500">{{ errors['organization.description'] }}</span>
          </label>
          <textarea class="input-custom" placeholder="Join us in building next generation space technology.." v-model="organizationDescription.value" />
        </div>
        <div class="w-full mt-5">
          <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="featured-links">
            Featured Links
          </label>
          <div v-for="(link, index) in featuredLinks" :key="index" class="flex space-x-2 mb-2">
            <input v-model="link.name" class="input-custom" type="text" placeholder="Mars Mission Docs" />
            <input v-model="link.url" class="input-custom" type="url" placeholder="https://big-space-tech.com/missions/mars" />
          </div>
          <button class="btn bg-zinc-900 hover:bg-zinc-800 text-white flex items-center space-x-2 mt-2" @click="addFeaturedLink">
            <Icon name="mdi:plus" class="w-5 h-5" />
            <span>Add Link</span>
          </button>
        </div>
        <!-- Panel footer -->
        <footer>
          <div class="flex w-full justify-start mb-10 mt-4">
            <button class="btn bg-zinc-900 hover:bg-zinc-800 text-white" @click="onSubmit" :disabled="isSubmitting">
              {{ saveLabel }}
            </button>
          </div>
        </footer>
      </section>
    </div>
    <div class="border-b my-8" v-if="forms == 'all'"></div>
    <!-- SEO Settings -->
    <div class="px-4 space-y-6 w-full items-center mt-4" v-if="forms == 'seo' || forms == 'all'">
      <section class="w-full md:w-1/3" v-if="forms == 'all'">
        <h2 class="text-base font-bold text-zinc-900 font-noto">SEO Settings</h2>
        <h4 class="text-sm mb-5 text-zinc-400">
          These settings help your website rank better and enable better device previews.
        </h4>
      </section>
      <section class="w-full md:w-2/3">
        <div class="md:flex gap-4 items-center mt-5">
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="name">Website Title</label>
            <input class="input-custom" type="text" placeholder="Organization Name" v-model="seoTitle">
            <div class="text-xs mt-1 text-rose-500">{{ errors['seo.title'] }}</div>
          </div>
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto">Website Description</label>
            <input class="input-custom" type="text" placeholder="We build space tech" v-model="seoDescription" />
            <div class="text-xs mt-1 text-rose-500">{{ errors['seo.description'] }}</div>
          </div>
        </div>
        <div class="md:flex gap-4 items-center mt-5">
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="name">Twitter Handle (without
              @)</label>
            <input class="input-custom" type="text" placeholder="the_nirvana_labs" v-model="seoTwitter">
            <div class="text-xs mt-1 text-rose-500">{{ errors['seo.twitter'] }}</div>
          </div>
        </div>
        <!-- Panel footer -->
        <footer>
          <div class="flex w-full justify-start mb-10 mt-4">
            <button class="btn bg-zinc-900 hover:bg-zinc-800 text-white" @click="onSubmit" :disabled="isSubmitting">
              {{ saveLabel }}
            </button>
          </div>
        </footer>
      </section>
    </div>
  </div>
</template>

<style scoped>
.input-custom {
  @apply w-full block py-2 px-4 border border-zinc-200 rounded-xl text-sm placeholder:text-zinc-400 focus:ring-1 focus:ring-inset focus:ring-zinc-300 sm:text-sm sm:leading-6 outline-0;
}
</style>