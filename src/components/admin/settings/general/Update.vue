<script setup lang="ts">
import { generalSettingsSchema } from '~/schemas/setting';
import type { z } from "zod";

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
const [organizationName] = defineField('organization.name');
const [organizationDescription] = defineField('organization.description');
const [organizationLocation] = defineField('organization.location');
const [organizationLinks] = defineField('organization.links');

// SEO Fields
const [seoTitle] = defineField('seo.title');
const [seoDescription] = defineField('seo.description');
const [seoTwitter] = defineField('seo.twitter');

const {
  remove: removeFeaturedLink,
  push: addFeaturedLink,
  fields: featuredLinks,
} = useFieldArray<z.infer<typeof generalSettingsSchema>['organization']['links'][0]>('organization.links');

// Initialize fields with data from settings
watchEffect(() => {
  if (generalSettings.data.value) {
    const gs = generalSettings.data.value;

    organizationName.value = gs.organization.name;
    organizationDescription.value = gs.organization.description;
    organizationLocation.value = gs.organization.location;
    organizationLinks.value = gs.organization.links;

    seoTitle.value = gs.seo.title;
    seoDescription.value = gs.seo.description;
    seoTwitter.value = gs.seo.twitter;
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

    emits('saved');
  } catch (error) {
    console.error("Error saving settings", error);
  } finally {
    isSubmitting.value = false;
  }
});
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
            <input class="input-custom" type="text" placeholder="Organization Name" v-model="organizationName">
          </div>
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="location">
              Location <span class="text-xs ml-1 text-rose-500">{{ errors['organization.location'] }}</span>
            </label>
            <input id="location" class="input-custom" type="text" placeholder="Boston, MA"
              v-model="organizationLocation" />
          </div>
        </div>
        <div class="w-full mt-5">
          <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="description">
            Bio <span class="text-xs ml-1 text-rose-500">{{ errors['organization.description'] }}</span>
          </label>
          <textarea class="input-custom" placeholder="Join us in building next generation space technology.."
            v-model="organizationDescription" />
        </div>
        <div class="w-full mt-5">
          <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="featured-links">
            Featured Links
          </label>
          <div v-for="(link, index) in featuredLinks" :key="link.key" class="flex space-x-2 mb-2 w-full">
            <input v-model="link.value.title" class="input-custom-vlen w-5/12" type="text"
              placeholder="Mars Mission Docs" />
            <input v-model="link.value.href" class="input-custom-vlen w-5/12" type="url"
              placeholder="https://big-space-tech.com/missions/mars" />
            <button class="btn-sm flex items-center space-x-2 w-1/12 text-red-500" @click="removeFeaturedLink(index)">
              <Icon name="mdi:minus" class="w-4 h-4" />
              Remove
            </button>
          </div>
          <div class="flex space-x-2 items-center">
            <button class="btn-sm flex items-center space-x-2" @click="addFeaturedLink({ title: '', href: '' })">
              <Icon name="mdi:plus" class="w-5 h-5" />
              Add Link
            </button>
            <span class="text-sm text-rose-500">{{ errors[`organization.links`] }}</span>
          </div>
        </div>
        <!-- Panel footer -->
        <footer>
          <div class="flex w-full justify-start mb-10 mt-4">
            <button class="btn btn-primary" @click="onSubmit" :disabled="isSubmitting">
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
            <button class="btn btn-primary" @click="onSubmit" :disabled="isSubmitting">
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

.input-custom-vlen {
  @apply block py-2 px-4 border border-zinc-200 rounded-xl text-sm placeholder:text-zinc-400 focus:ring-1 focus:ring-inset focus:ring-zinc-300 sm:text-sm sm:leading-6 outline-0;
}
</style>