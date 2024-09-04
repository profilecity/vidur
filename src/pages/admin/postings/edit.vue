<script setup lang="ts">
import {
  createJobPostingSchema,
  updateJobPostingSchema,
} from '~/schemas/posting';
import type { JobPosting } from '~/server/db/schema';

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

const route = useRoute();

const postingId = route.query.id as string | undefined;

const isUpdating = !!postingId;

// @ts-expect-error
let posting: JobPosting = null;

if (isUpdating) {
  posting = (
    await useRequestFetch()('/api/posting', { query: { id: postingId } })
  )[0] as unknown as JobPosting;
  if (!posting) {
    throw createError({
      statusCode: 404,
      message: 'Job Posting Not Found',
    });
  }
}

useHead({
  title: `${isUpdating ? 'Edit - ' : 'New Posting'} ${(isUpdating && posting.title) || ''}`,
});

const formSchema = toTypedSchema(
  isUpdating ? updateJobPostingSchema : createJobPostingSchema
);
const { handleSubmit, errors, defineField, errorBag } = useForm({
  validationSchema: formSchema,
});

// @ts-expect-error
const [id] = defineField('id');

const [title] = defineField('title');
const [contents] = defineField('contents');
const [tagsCSV] = defineField('tagsCSV');
const [isPublished] = defineField('isPublished');

if (isUpdating && posting) {
  id.value = posting.id;
  title.value = posting.title;
  contents.value = posting.contents || undefined;
  tagsCSV.value = posting.tagsCSV || undefined;
  isPublished.value = posting.isPublished;
} else {
  isPublished.value = false;
}

const isSubmitting = ref(false);

const onSubmit = handleSubmit(async (values) => {
  try {
    isSubmitting.value = true;
    await $fetch('/api/posting', {
      method: isUpdating ? 'PUT' : 'POST',
      body: {
        ...values,
      },
    });
    await navigateTo('/admin/postings');
  } catch (e) {
    console.error(e);
  } finally {
    isSubmitting.value = false;
  }
});

const isDeleting = ref(false);
const onDelete = async () => {
  if (!isUpdating) {
    return;
  }
  try {
    if (errorBag.value) {
      console.log(errorBag.value);
    }
    isDeleting.value = true;
    await $fetch('/api/posting', {
      method: 'DELETE',
      query: {
        id: postingId,
      },
    });
    await navigateTo('/admin/postings');
  } catch (e) {
    console.error(e);
  } finally {
    isDeleting.value = false;
  }
};
</script>

<template>
  <div class="w-full max-w-9xl mx-auto">
    <!-- Page header -->
    <div
      class="flex flex-col md:flex-row justify-between items-center mb-4 border-b border-zinc-200 p-4 bg-white"
    >
      <!-- Left: Title -->
      <div class="mb-4 sm:mb-0">
        <h2
          class="text-md md:text-lg text-zinc-800 font-bold flex items-center"
        >
          <Icon
            class="w-5 h-5 shrink-0 fill-current mr-2"
            name="iconamoon:edit"
          />{{ isUpdating ? posting.title : 'New Posting' }}
        </h2>
      </div>
      <!-- Right: Actions -->
      <div class="flex items-center space-x-3">
        <AbstractConfirmationBox
          title="Delete Posting?"
          content="You won't be able to undo this action. You will loose access to applicant list."
          @confirm="onDelete"
          v-if="isUpdating"
        >
          <template #input="{ open }">
            <InputButton
              variant="destructive"
              size="icon"
              @click="open"
              :disabled="isSubmitting"
            >
              <Icon name="material-symbols:delete-outline" class="h-4 w-4" />
            </InputButton>
          </template>
        </AbstractConfirmationBox>
        <!-- <div class="flex space-x-1 items-center border bg-zinc-100 p-2 rounded-xl">
          <span class="text-sm">Publish?</span>
          <div class="form-switch">
            <input type="checkbox" id="toggle1" name="toggle1" class="sr-only" v-model="isPublished" :disabled="isSubmitting">
            <label class="bg-zinc-400" for="toggle1">
              <span class="bg-white shadow-sm" aria-hidden="true"></span>
              <span class="sr-only">Publish/Draft</span>
            </label>
          </div>
        </div> -->
        <InputSwitch label="Publish?" v-model="isPublished" />
        <AbstractConfirmationBox
          title="Save Posting?"
          content="Are you sure you want to save the changes?"
          @confirm="onSubmit"
        >
          <template #input="{ open }">
            <InputButton :disabled="isSubmitting" @click="open">
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
            :disabled="isSubmitting"
            :error="errors.title"
            v-model="title"
          />
          <InputText
            class="mt-4"
            placeholder="Remote, Full Time, San Fransisco"
            label="Tags (CSV)"
            :disabled="isSubmitting"
            v-model="tagsCSV"
          />
          <div class="mt-4">
            <label class="block text-sm font-medium mb-1" for="jobdescription"
              >Job Description</label
            >
            <Editor
              placeholder="We are looking for someone who can..."
              v-model="contents"
            />
            <div class="text-xs mt-1 text-rose-500">{{ errors.contents }}</div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
