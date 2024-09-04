<script setup lang="ts">
import { careerSiteConfigSchema } from '~~/shared/schemas/setting';

const emits = defineEmits<{
  saved: [];
}>();

const generalSettings = useGeneralSettings();
const { updateGeneralSettings, generalSettings: generalSettingsPublic } =
  usePublicGeneralSettings();

// Define form schema and use it in the form handling
const formSchema = toTypedSchema(careerSiteConfigSchema);
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: formSchema,
});

// Career Site Fields
const [name] = defineField('name');
const [bio] = defineField('bio');
const [description] = defineField('description');
const [location] = defineField('location');
const [links] = defineField('links');
const [logo] = defineField('logo');
const [overviewSocials] = defineField('overview.socials');
const [overviewCompanySize] = defineField('overview.companySize');
const [overviewTotalRaised] = defineField('overview.totalRaised');
const [overviewMarkets] = defineField('overview.markets');

// Initialise fields to prevent type-errors.
links.value = [];
description.value = '';
overviewSocials.value = [];
overviewCompanySize.value = 0;

const removeFeaturedLink = (index: number) => {
  links.value = links.value?.filter(
    (_, originalIndex) => originalIndex != index
  );
};

const removeSocialHandle = (index: number) => {
  overviewSocials.value = overviewSocials.value?.filter(
    (_, originalIndex) => originalIndex != index
  );
};

// Initialize fields with data from settings
let stopWatching: () => void;
stopWatching = watchEffect(() => {
  if (generalSettings.data.value) {
    const gs = generalSettings.data.value;

    name.value = gs.careerSite.name;
    bio.value = gs.careerSite.bio;
    description.value = gs.careerSite.description;
    location.value = gs.careerSite.location;
    links.value = gs.careerSite.links;
    logo.value = gs.careerSite.logo;
    overviewSocials.value = gs.careerSite.overview.socials;
    overviewCompanySize.value = gs.careerSite.overview.companySize;
    overviewTotalRaised.value = gs.careerSite.overview.totalRaised;
    overviewMarkets.value = gs.careerSite.overview.markets;

    stopWatching && stopWatching();
  }
});

const isSubmitting = ref(false);
const onSubmit = handleSubmit(async (values) => {
  try {
    isSubmitting.value = true;
    const updatedSettings = {
      careerSite: values,
      seo: generalSettingsPublic.value.seo,
    };
    await $fetch('/api/settings/general', {
      method: 'PUT',
      body: updatedSettings,
    });
    updateGeneralSettings(updatedSettings);
    emits('saved');
  } catch (error) {
    console.error('Error saving settings', error);
  } finally {
    isSubmitting.value = false;
  }
});

const logoURL = computed(() => {
  if (logo.value) {
    return useRemoteAsset(logo.value).url;
  }
  return undefined;
});
const logoUpdated = (id: string) => {
  logo.value = id;
};
</script>

<template>
  <FrameTabbed tab-group="settings">
    <template #action>
      <InputButton @click="onSubmit" :disabled="isSubmitting">
        Save
      </InputButton>
    </template>
    <template #content>
      <form
        class="px-4 space-y-6 w-full md:w-2/3 items-center mt-4"
        @submit="onSubmit"
      >
        <div class="flex items-end">
          <div class="mr-4">
            <img
              class="w-16 h-16 md:w-20 md:h-20 rounded-xl"
              :src="logoURL"
              width="80"
              height="80"
              alt="User upload"
            />
          </div>
          <AdminSettingsGeneralUpdateOrgLogo @update="logoUpdated" />
        </div>
        <div class="md:flex gap-4 items-center mt-5">
          <InputText
            class="w-full md:w-2/3"
            placeholder="Organization Name"
            v-model="name"
            id="organization-name"
            :error="errors['name']"
            label="Organization Name"
          />
          <InputText
            class="w-full md:w-2/3"
            placeholder="Location"
            v-model="location"
            id="organization-location"
            :error="errors['location']"
            label="Location"
          />
        </div>
        <InputText
          class="w-full mt-5"
          placeholder="Join us in building next generation space technology.."
          v-model="bio"
          id="organization-bio"
          :error="errors['bio']"
          label="Bio"
        />
        <div class="w-full mt-5">
          <InputLabel
            label="Description"
            id="organization-description"
            :error="errors['description']"
          />
          <Editor
            id="organization-description"
            placeholder="We started as a group of mad scientists, curious about space..."
            v-model="description"
          />
        </div>
        <div class="w-full mt-8">
          <InputLabel
            label="Featured Links"
            id="featued-links"
            :error="errors['links']"
          />
          <div
            v-for="(link, index) in links"
            :key="index"
            class="flex space-x-2 mb-2 w-full items-center"
          >
            <InputText
              v-model="link.title"
              :id="`link-title-${index}`"
              placeholder="Mars Mission Docs"
            />
            <InputText
              v-model="link.href"
              :id="`link-url-${index}`"
              placeholder="https://big-space-tech.com/mission/mars"
              type-override="url"
            />
            <InputButton
              variant="destructive"
              size="icon"
              @click="removeFeaturedLink(index)"
            >
              <Icon name="fluent:delete-28-regular" class="w-5 h-5" />
            </InputButton>
          </div>
          <InputButton
            variant="secondary"
            @click="links?.push({ title: '', href: '' })"
          >
            <Icon name="mdi:plus" class="w-5 h-5" />
            Add Link
          </InputButton>
        </div>
        <div class="w-full mt-8">
          <InputLabel
            label="Social Handles"
            id="social-handles"
            :error="errors[`overview.socials`]"
          />
          <div
            v-for="(social, index) in overviewSocials"
            :key="index"
            class="flex space-x-2 mb-2 w-full items-center"
          >
            <AbstractSocialSelector v-model="social.handle" />
            <InputText
              class="w-2/3 md:w-1/3"
              v-model="social.href"
              :id="`social-url-${index}`"
              placeholder="https://social-handle.com/@big-space-tech"
              type-override="url"
            />
            <InputButton
              variant="destructive"
              size="icon"
              @click="removeSocialHandle(index)"
            >
              <Icon name="fluent:delete-28-regular" class="w-5 h-5" />
            </InputButton>
          </div>
          <InputButton
            variant="secondary"
            @click="overviewSocials?.push({ handle: '', href: '' })"
          >
            <Icon name="mdi:plus" class="w-5 h-5" />
            Add Social
          </InputButton>
        </div>
        <div class="md:flex gap-4 items-center mt-5">
          <div>
            <InputLabel
              label="Company Size"
              :error="errors['overview.companySize']"
              id="company-size"
            />
            <AbstractCompanySizeSelector v-model="overviewCompanySize" />
          </div>
          <InputText
            v-model="overviewTotalRaised"
            id="organization-overview-total-raised"
            placeholder="$220k Pre Seed"
            label="Total Raised"
            :error="errors['overview.totalRaised']"
          />
          <InputText
            v-model="overviewMarkets"
            id="organization-overview-markets"
            placeholder="Space Tech, Inter-galactic Wars"
            label="Markets(CSV)"
            :error="errors['overview.markets']"
          />
        </div>
      </form>
    </template>
  </FrameTabbed>
</template>
