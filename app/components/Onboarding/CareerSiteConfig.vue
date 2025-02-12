<script setup lang="ts">
import { careerSiteConfigSchema } from '~~/shared/schemas/setting';

const emits = defineEmits<{
  done: [string];
}>();

const props = defineProps<{
  logo: string;
}>();
const formSchema = toTypedSchema(careerSiteConfigSchema);
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: formSchema,
});

const [name] = defineField('name');
const [bio] = defineField('bio');
const [location] = defineField('location');
const [overview] = defineField('overview');
const [links] = defineField('links');

const [logo] = defineField('logo');
if (!props.logo) {
  throw new Error('<CareerSiteConfig/> logo cannot be null / undefined');
}
logo.value = props.logo;

(overview.value = { socials: [] }), (links.value = []);

const isSubmitting = ref(false);
const onSubmit = handleSubmit(async (values) => {
  try {
    isSubmitting.value = true;
    await $fetch('/api/settings/career-site', {
      method: 'PUT',
      body: values,
    });
    emits('done', values.name);
  } catch (error) {
    console.error('Error saving settings', error);
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <form>
    <div class="text-xl font-noto font-bold text-center">Configure Career Site</div>
    <div class="text-zinc-600 text-center text-sm">You can change this later</div>
    <div class="flex space-x-2 mt-6">
      <VInputText
        class="w-full md:w-1/2"
        placeholder="Organization Name"
        v-model="name"
        id="organization-name"
        :error="errors['name']"
        label="Organization Name"
      />
      <VInputText
        class="w-full md:w-1/2"
        placeholder="Location"
        v-model="location"
        id="organization-location"
        :error="errors['location']"
        label="Location"
      />
    </div>
    <VInputText
      class="w-full mt-5"
      placeholder="Join us in building next generation space technology.."
      v-model="bio"
      id="organization-bio"
      :error="errors['bio']"
      label="Bio"
    />
    <VInputButton class="mt-3" @click="onSubmit" :disabled="isSubmitting"> Save </VInputButton>
  </form>
</template>
