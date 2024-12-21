<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { updateJobPostingSchema } from '~~/shared/schemas/posting';

definePageMeta({
  layout: 'admin',
});

const route = useRoute();

if (!route.query.id) {
  await navigateTo('/admin/postings/new');
}

const { refresh } = await usePostingsRepository();

const q = { id: route.query.id as string };
const { data, updateData, deleteData, changing } = await usePostingRepository(q);

useHead({
  title: `Edit - ${data.value.title}`,
});

const formSchema = toTypedSchema(updateJobPostingSchema);
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: formSchema,
});

const validTillCalendarDate = ref<CalendarDate>();
const isExpired = ref<boolean>(false);

const [id] = defineField('id');

// Declare form fields
const [title] = defineField('title');
const [contents] = defineField('contents');
const [tagsCSV] = defineField('tagsCSV');
const [isPublished] = defineField('isPublished');
const [validTill] = defineField('validTill');

// Initialise form fields
id.value = data.value.id;
title.value = data.value.title;
contents.value = data.value.contents || undefined;
tagsCSV.value = data.value.tagsCSV || undefined;
isPublished.value = data.value.isPublished;
validTill.value = (data.value.validTill as string | null) || undefined;

// Initialise Extra Refs
if (validTill.value) {
  validTillCalendarDate.value = dateToCalendarDate(new Date(validTill.value));
}
isExpired.value = data.value.isExpired;

const onSubmit = handleSubmit(async (values) => {
  await updateData(values);
  refresh();
  await navigateTo('/admin/postings');
});

const onDelete = async () => {
  await deleteData(q);
  refresh();
  await navigateTo('/admin/postings');
};

watch(validTillCalendarDate, (calendarDate) => {
  if (!calendarDate) return;
  validTill.value = calendarDateToDate(calendarDate).toISOString();
});

const disableFields = computed(() => changing.value || isExpired.value);
</script>

<template>
  <div class="w-full max-w-9xl mx-auto">
    <div
      class="flex justify-center items-cente border-b border-zinc-200 bg-red-200 text-red-600 text-sm py-1"
      v-if="isExpired"
    >
      Posting has expired. Editing is disabled.
    </div>
    <!-- Page header -->
    <div class="flex justify-between items-center mb-4 border-b border-zinc-200 p-4 bg-white">
      <!-- Left: Title -->
      <div class="mb-4 sm:mb-0">
        <h2 class="text-md md:text-lg text-zinc-800 font-bold flex items-center">
          <Icon class="w-5 h-5 shrink-0 fill-current mr-2" name="iconamoon:edit" />
          {{ data.title }}
        </h2>
      </div>
      <!-- Right: Actions -->
      <div class="flex items-center space-x-3">
        <InputDatePicker label="Expiry Date" v-model="validTillCalendarDate" :disabled="disableFields" />
        <AbstractConfirmationBox
          title="Delete Posting?"
          content="You won't be able to undo this action. You will loose access to applicant list."
          @confirm="onDelete"
        >
          <template #input="{ open }">
            <InputButton variant="destructive" size="icon" @click="open" :disabled="disableFields">
              <Icon name="material-symbols:delete-outline" class="h-4 w-4" />
            </InputButton>
          </template>
        </AbstractConfirmationBox>
        <InputSwitch label="Publish?" v-model="isPublished" :disabled="disableFields" />
        <AbstractConfirmationBox
          title="Save Posting?"
          content="Are you sure you want to save the changes?"
          @confirm="onSubmit"
        >
          <template #input="{ open }">
            <InputButton :disabled="disableFields" @click="open">
              <div class="flex spece-x-2 items-center">
                <Icon name="lets-icons:save" class="w-3 h-3 mr-1" />
                <span>Save</span>
              </div>
            </InputButton>
          </template>
        </AbstractConfirmationBox>
      </div>
    </div>
    <!-- Input Section -->
    <form @submit="onSubmit">
      <div class="px-4">
        <div class="mx-auto mt-4">
          <InputText
            placeholder="Senior Software Engineer"
            label="Title"
            :disabled="disableFields"
            :error="errors.title"
            v-model="title"
          />
          <InputText
            class="mt-4"
            placeholder="Remote, Full Time, San Fransisco"
            label="Tags (CSV)"
            :disabled="disableFields"
            v-model="tagsCSV"
          />
          <div class="mt-4">
            <InputLabel label="Job Description" />
            <Editor placeholder="We are looking for someone who can..." v-model="contents" :read-only="disableFields" />
            <div class="text-xs mt-1 text-rose-500">{{ errors.contents }}</div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
