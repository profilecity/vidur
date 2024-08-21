<script setup lang="ts">
import { generalSettingsSchema } from '~/schemas/setting';

defineProps<{
  forms?: 'general' | 'seo' | 'all';
}>();

const emits = defineEmits<{
  saved: [];
}>();

const generalSettings = useGeneralSettings();
const { updateGeneralSettings } = usePublicGeneralSettings();

// Define form schema and use it in the form handling
const formSchema = toTypedSchema(generalSettingsSchema);
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: formSchema,
});

// Organization Fields
const [organizationName] = defineField('organization.name');
const [organizationBio] = defineField('organization.bio');
const [organizationDescription] = defineField('organization.description');
const [organizationLocation] = defineField('organization.location');
const [organizationLinks] = defineField('organization.links');
const [organizationLogo] = defineField('organization.logo');
const [organizationOverviewSocials] = defineField('organization.overview.socials');
const [organizationOverviewCompanySize] = defineField('organization.overview.companySize');
const [organizationOverviewTotalRaised] = defineField('organization.overview.totalRaised');
const [organizationOverviewMarkets] = defineField('organization.overview.markets');

// Initialise fields to prevent type-errors.
organizationLinks.value = [];
organizationDescription.value = "";
organizationOverviewSocials.value = [];
organizationOverviewCompanySize.value = 0;

// SEO Fields
const [seoTitle] = defineField('seo.title');
const [seoDescription] = defineField('seo.description');
const [seoTwitter] = defineField('seo.twitter');

const removeFeaturedLink = (index: number) => {
  organizationLinks.value = organizationLinks.value?.filter((_, originalIndex) => originalIndex != index);
}

const removeSocialHandle = (index: number) => {
  organizationOverviewSocials.value = organizationOverviewSocials.value?.filter((_, originalIndex) => originalIndex != index);
}

// Initialize fields with data from settings
let stopWatching: () => void;
stopWatching = watchEffect(() => {
  if (generalSettings.data.value) {
    const gs = generalSettings.data.value;

    organizationName.value = gs.organization.name;
    organizationBio.value = gs.organization.bio;
    organizationDescription.value = gs.organization.description;
    organizationLocation.value = gs.organization.location;
    organizationLinks.value = gs.organization.links;
    organizationLogo.value = gs.organization.logo;
    organizationOverviewSocials.value = gs.organization.overview.socials;
    organizationOverviewCompanySize.value = gs.organization.overview.companySize;
    organizationOverviewTotalRaised.value = gs.organization.overview.totalRaised;
    organizationOverviewMarkets.value = gs.organization.overview.markets;

    seoTitle.value = gs.seo.title;
    seoDescription.value = gs.seo.description;
    seoTwitter.value = gs.seo.twitter;

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
    updateGeneralSettings(values);
    emits('saved');
  } catch (error) {
    console.error("Error saving settings", error);
  } finally {
    isSubmitting.value = false;
  }
});

const logoURL = computed(() => {
  if (organizationLogo.value) {
    return useRemoteAsset(organizationLogo.value).url;
  }
  return undefined;
});
const logoUpdated = (id: string) => {
  organizationLogo.value = id;
}
</script>

<template>
  <section>
    <!-- Organization Settings -->
    <div class="px-4 space-y-6 w-full items-center mt-4" v-if="forms === 'general' || forms === 'all'">
      <section class="w-full md:w-1/3">
        <h2 class="text-base font-bold text-zinc-900 font-noto">Organization Settings</h2>
        <h4 class="text-sm mb-5 text-zinc-400">Configure career site's home page.</h4>
      </section>
      <section class="w-full md:w-2/3">
        <div class="flex items-end">
          <div class="mr-4">
            <img class="w-16 h-16 md:w-20 md:h-20 rounded-xl" :src="logoURL" width="80" height="80" alt="User upload" />
          </div>
          <AdminSettingsGeneralUpdateOrgLogo @update="logoUpdated" />
        </div>
        <div class="md:flex gap-4 items-center mt-5">
          <InputText class="w-full md:w-2/3" placeholder="Organization Name" v-model="organizationName"
            id="organization-name" :error="errors['organization.name']" label="Organization Name" />
          <InputText class="w-full md:w-2/3" placeholder="Location" v-model="organizationLocation"
            id="organization-location" :error="errors['organization.location']" label="Location" />
        </div>
        <InputText class="w-full mt-5" placeholder="Join us in building next generation space technology.."
          v-model="organizationBio" id="organization-bio" :error="errors['organization.bio']" label="Bio" />
        <div class="w-full mt-5">
          <InputLabel label="Description" id="organization-description" :error="errors['organization.description']" />
          <Editor id="organization-description"
            placeholder="We started as a group of mad scientists, curious about space..."
            v-model="organizationDescription" />
        </div>
        <div class="w-full mt-5">
          <InputLabel label="Featured Links" id="featued-links" />
          <div v-for="(link, index) in organizationLinks" :key="index" class="flex space-x-2 mb-2 w-full">
            <InputText v-model="link.title" :id="`link-title-${index}`" placeholder="Mars Mission Docs" />
            <InputText v-model="link.href" :id="`link-url-${index}`"
              placeholder="https://big-space-tech.com/mission/mars" type-override="url" />
            <button class="btn-sm flex items-center space-x-2 w-1/12 text-red-500" @click="removeFeaturedLink(index)">
              <Icon name="mdi:minus" class="w-4 h-4" />
              Remove
            </button>
          </div>
          <div class="flex space-x-2 items-center">
            <button class="btn-sm flex items-center space-x-2"
              @click="organizationLinks?.push({ title: '', href: '' })">
              <Icon name="mdi:plus" class="w-5 h-5" />
              Add Link
            </button>
            <span class="text-sm text-rose-500">{{ errors[`organization.links`] }}</span>
          </div>
        </div>
        <div class="w-full mt-5">
          <InputLabel label="Social Handles" id="social-handles" />
          <div v-for="(social, index) in organizationOverviewSocials" :key="index" class="flex space-x-2 mb-2 w-full">
            <AbstractSocialSelector v-model="social.handle" />
            <InputText class="w-2/3 md:w-1/3" v-model="social.href" :id="`social-url-${index}`"
              placeholder="https://social-handle.com/@big-space-tech" type-override="url" />
            <button class="btn-sm flex items-center space-x-2 w-1/12 text-red-500" @click="removeSocialHandle(index)">
              <Icon name="mdi:minus" class="w-4 h-4" />
              Remove
            </button>
          </div>
          <div class="flex space-x-2 items-center">
            <button class="btn-sm flex items-center space-x-2"
              @click="organizationOverviewSocials?.push({ handle: '', href: '' })">
              <Icon name="mdi:plus" class="w-5 h-5" />
              Add Handle
            </button>
            <span class="text-sm text-rose-500">{{ errors[`organization.overview.socials`] }}</span>
          </div>
        </div>
        <div class="md:flex gap-4 items-center mt-5">
          <div>
            <InputLabel label="Company Size" :error="errors['organization.overview.companySize']" id="company-size" />
            <AbstractCompanySizeSelector v-model="organizationOverviewCompanySize" />
          </div>
          <InputText v-model="organizationOverviewTotalRaised" id="organization-overview-total-raised"
            placeholder="$220k Pre Seed" label="Total Raised" :error="errors['organization.overview.totalRaised']" />
          <InputText v-model="organizationOverviewMarkets" id="organization-overview-markets"
            placeholder="Space Tech, Inter-galactic Wars" label="Markets(CSV)"
            :error="errors['organization.overview.markets']" />
        </div>
        <!-- Panel footer -->
        <footer>
          <div class="flex w-full justify-start mb-10 mt-4">
            <button class="btn btn-primary" @click="onSubmit" :disabled="isSubmitting">
              Save
            </button>
          </div>
        </footer>
      </section>
    </div>
    <div class="border-b my-8" v-if="forms == 'all'"></div>
    <!-- SEO Settings -->
    <div class="px-4 space-y-6 w-full items-center mt-4" v-if="forms == 'seo' || forms == 'all'">
      <section class="w-full md:w-1/3">
        <h2 class="text-base font-bold text-zinc-900 font-noto">SEO Settings</h2>
        <h4 class="text-sm mb-5 text-zinc-400">
          These settings help your website rank better and enable better device previews.
        </h4>
      </section>
      <section class="w-full md:w-2/3">
        <div class="md:flex gap-4 items-center mt-5">
          <InputText class="w-full md:w-1/2" placeholder="Big Space Career Site" v-model="seoTitle" id="seo-title"
            :error="errors['seo.title']" label="Website Title" />
          <InputText class="w-full md:w-1/2" placeholder="Big Space Career Site Decrition" v-model="seoDescription"
            id="seo-description" :error="errors['seo.description']" label="Website Description" />
        </div>
        <div class="md:flex gap-4 items-center mt-5">
          <InputText class="w-full md:w-1/2" placeholder="big_space_tech" v-model="seoTwitter" id="seo-twitter"
            :error="errors['seo.twitter']" label="Twitter Handle (without @)" />
        </div>
        <!-- Panel footer -->
        <footer>
          <div class="flex w-full justify-start mb-10 mt-4">
            <button class="btn btn-primary" @click="onSubmit" :disabled="isSubmitting">
              Save
            </button>
          </div>
        </footer>
      </section>
    </div>
  </section>
</template>