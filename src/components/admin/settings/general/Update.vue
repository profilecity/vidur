<script setup lang="ts">
import { generalSettingsSchema } from '~/schemas/setting';

const generalSettings = useGeneralSettings();

const formSchema = toTypedSchema(generalSettingsSchema);
const { handleSubmit, errors, defineField, errorBag } = useForm({
  validationSchema: formSchema,
});

// Organization Fields
const [organizationName] = defineField("organization.name");
const [organizationDescription] = defineField("organization.description");
const [organizationLocation] = defineField("organization.location");
const [organizationLinks] = defineField("organization.links");

// Seo Fields
const [seoTitle] = defineField("seo.title");
const [seoDescription] = defineField("seo.description");
const [seoKeywords] = defineField("seo.keywords");
const [seoTwitter] = defineField("seo.twitter");

watchEffect(() => {
  if (generalSettings.data.value) {
    // Setting defaults
    const gs = generalSettings.data.value;

    organizationName.value = gs.organization.name;
    organizationDescription.value = gs.organization.description;
    organizationLocation.value = gs.organization.location;
    organizationLinks.value = gs.organization.links;

    seoTitle.value = gs.seo.title;
    seoDescription.value = gs.seo.description;
    seoKeywords.value = gs.seo.keywords;
    seoTwitter.value = gs.seo.twitter;
  }
});

const isSubmitting = ref(false);

const onSubmit = handleSubmit(async values => {
  try {
    isSubmitting.value = true;
    await $fetch('/api/settings/general', {
      method: 'PUT',
      body: {
        ...values,
      }
    });
  } catch (error) {
    console.error("error saving settings", error);
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <div class="grow">
    <!-- Panel body -->
    <section class="pb-4 border-b">
      <div class="flex items-center">
        <div class="mr-4">
          <img class="w-16 h-16 md:w-20 md:h-20 rounded-full" src="/placeholder-avatar.png" width="80" height="80"
            alt="User upload" />
        </div>
        <button class="btn-sm bg-zinc-900 hover:bg-zinc-800 text-white">Change</button>
      </div>
    </section>
    <div class="space-y-6 md:flex w-full items-center">
      <section class="w-full md:w-1/3">
        <h2 class="text-lg md:text-2xl font-bold">Organization Settings</h2>
        <h4 class="text-sm md:text-md mb-5">Configure career site's home page.</h4>
      </section>
      <section class="w-full md:w-2/3">
        <div class="md:flex gap-2 items-center">
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1" for="name">Organization Name</label>
            <input class="form-input w-full" type="text" placeholder="Organization Name" v-model="organizationName">
            <div class="text-xs mt-1 text-rose-500">{{ errors['organization.name'] }}</div>
          </div>
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1" for="location">Location</label>
            <input id="location" class="form-input w-full" type="text" placeholder="Boston, MA" v-model="organizationLocation" />
            <div class="text-xs mt-1 text-rose-500">{{ errors['organization.location'] }}</div>
          </div>
        </div>
        <div class="w-full mt-5">
          <label class="block text-sm font-medium mb-1" for="name">Bio</label>
          <textarea class="form-input w-full"
            placeholder="Join us in building next generation space technology.." v-model="organizationDescription" />
          <div class="text-xs mt-1 text-rose-500">{{ errors['organization.description'] }}</div>
        </div>
        <div class="w-full mt-5">
          <label class="block text-sm font-medium mb-1" for="name">Featured Links</label>
          <div class="flex space-x-2">
            <input class="form-input w-full" type="text" placeholder="Mars Mission Docs" />
            <input class="form-input w-full" type="url" placeholder="https://big-space-tech.com/missions/mars" />
            <button class="btn btn-sm border">+</button>
          </div>
        </div>
      </section>
    </div>
    <div class="space-y-6 md:flex w-full items-center">
      <section class="w-full md:w-1/3">
        <h2 class="text-lg md:text-2xl font-bold">SEO Settings</h2>
        <h4 class="text-sm md:text-md mb-5">These settings help your website rank better and enable better device previews.</h4>
      </section>
      <section class="w-full md:w-2/3">
        <div class="md:flex gap-2 items-center mt-5">
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1" for="name">Website Title</label>
            <input class="form-input w-full" type="text" placeholder="Organization Name" v-model="seoTitle">
            <div class="text-xs mt-1 text-rose-500">{{ errors['seo.title'] }}</div>
          </div>
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1">Website Description</label>
            <input class="form-input w-full" type="text" placeholder="We build space tech" v-model="seoDescription" />
            <div class="text-xs mt-1 text-rose-500">{{ errors['seo.description'] }}</div>
          </div>
        </div>
        <div class="md:flex gap-2 items-center mt-5">
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1" for="name">Twitter Handle (without @)</label>
            <input class="form-input w-full" type="text" placeholder="the_nirvana_labs" v-model="seoTwitter">
            <div class="text-xs mt-1 text-rose-500">{{ errors['seo.twitter'] }}</div>
          </div>
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1">Keywords</label>
            <input class="form-input w-full" type="text" placeholder="careers, space, technology, jobs..." v-model="seoKeywords"/>
            <div class="text-xs mt-1 text-rose-500">{{ errors['seo.keywords'] }}</div>
          </div>
        </div>
        <!-- Panel footer -->
        <footer>
          <div class="flex w-full justify-start mb-3 mt-6">
            <button class="btn bg-zinc-900 hover:bg-zinc-800 text-white" @click="onSubmit" :disabled="isSubmitting">Save</button>
          </div>
        </footer>
      </section>
    </div>
  </div>
</template>