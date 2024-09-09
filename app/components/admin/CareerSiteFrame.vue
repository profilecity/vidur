<script setup lang="ts">
import { careerSiteConfigSchema } from '~~/shared/schemas/setting';

const { data, setData } = useCareerSiteConfigObjectState();

// Define form schema and use it in the form handling
const formSchema = toTypedSchema(careerSiteConfigSchema);
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: formSchema,
});

// Career Site Fields
const [name] = defineField('name');
const [bio] = defineField('bio');
const [location] = defineField('location');
const [links] = defineField('links');
const [logo] = defineField('logo');

// Future Fields
const [overviewSocials] = defineField('overview.socials');

// Initialise fields to prevent type-errors.
links.value = [];
overviewSocials.value = []; // Future Field.

const removeFeaturedLink = (index: number) => {
  links.value = links.value?.filter(
    (_, originalIndex) => originalIndex != index
  );
};

// Initialize fields with data from settings
name.value = data.value.name;
bio.value = data.value.bio;
location.value = data.value.location;
links.value = data.value.links;
logo.value = data.value.logo;

const isSubmitting = ref(false);
const onSubmit = handleSubmit(async (values) => {
  try {
    isSubmitting.value = true;
    await $fetch('/api/settings/career-site', {
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
      <form class="px-4 space-y-6 w-full md:w-2/3 items-center mt-4">
        <div class="flex items-end">
          <div class="mr-4">
            <img
              class="w-16 h-16 md:w-20 md:h-20 rounded-xl"
              :src="logoURL"
              alt="User upload"
            />
          </div>
          <AdminUpdateOrgLogo @update="logoUpdated" />
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
            @click.prevent="links?.push({ title: '', href: '' })"
          >
            <Icon name="mdi:plus" class="w-5 h-5" />
            Add Link
          </InputButton>
        </div>
      </form>
    </template>
  </FrameTabbed>
</template>
