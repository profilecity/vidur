<script setup lang="ts">
import { createJobPostingSchema, updateJobPostingSchema } from '~/schemas/posting';
import type { JobPosting } from '~/server/db/schema';

definePageMeta({
  layout: 'admin'
})

const route = useRoute();

const postingId = route.query.id as string | undefined;

const isUpdating = !!postingId;

// @ts-expect-error
let posting: JobPosting = null;

if (isUpdating) {
  posting = (await useRequestFetch()('/api/posting', { query: { id: postingId } }))[0] as unknown as JobPosting;
  if (!posting) {
    throw createError({
      statusCode: 404,
      message: "Job Posting Not Found",
    })
  }
}

useHead({
  title: `${isUpdating ? 'Edit - ' : 'New Posting'} ${(isUpdating && posting.title) || ''}`
})

const formSchema = toTypedSchema(isUpdating ? updateJobPostingSchema : createJobPostingSchema);
const { handleSubmit, errors, defineField, errorBag } = useForm({
  validationSchema: formSchema,
});

// @ts-expect-error
const [id] = defineField("id");

const [title] = defineField("title");
const [contents] = defineField("contents");
const [tagsCSV] = defineField("tagsCSV");
const [isPublished] = defineField("isPublished");

if (isUpdating && posting) {
  id.value = posting.id;
  title.value = posting.title;
  contents.value = posting.contents || undefined;
  tagsCSV.value = posting.tagsCSV || undefined;
  isPublished.value = posting.isPublished;
}

const isSubmitting = ref(false);

const onSubmit = handleSubmit(async values => {
  try {
    if (errorBag.value) {
      console.log(errorBag.value);
    }
    isSubmitting.value = true;
    await $fetch('/api/posting', {
      method: isUpdating ? 'PUT' : 'POST',
      body: {
        ...values,
      }
    })
    await navigateTo("/admin/postings");
  } catch (e) {
    console.error(e);
  } finally {
    isSubmitting.value = false;
  }
})

const onDelete = async () => {
  if (!isUpdating) {
    return;
  }
  try {
    if (errorBag.value) {
      console.log(errorBag.value);
    }
    isSubmitting.value = true;
    await $fetch('/api/posting', {
      method: 'DELETE',
      query: {
        id: postingId,
      }
    })
    await navigateTo("/admin/postings");
  } catch (e) {
    console.error(e);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="w-full max-w-9xl mx-auto">
    <!-- Page header -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-4">
      <!-- Left: Title -->
      <div class="mb-4 sm:mb-0">
        <h2 class="text-md md:text-lg text-zinc-800 font-bold flex items-center">
          <Icon class="w-6 h-6 md:w-8 md:h-8 shrink-0 fill-current mr-2" name="akar-icons:edit" />{{ isUpdating ?
            posting.title : 'New Posting' }}
        </h2>
      </div>
      <!-- Right: Actions -->
      <div class="flex items-center space-x-3">
        <Icon name="ei:spinner-3" class="w-6 h-6 text-zinc-900 animate-spin" v-if="isSubmitting" />
        <button class="btn border border-zinc-100" :disabled="isSubmitting" @click="onDelete"><Icon name="material-symbols:delete-outline" class="text-red-500 w-5 h-5"/></button>
        <div class="flex space-x-1 items-center border bg-zinc-100 p-2 rounded-xl">
          <span class="text-sm">Publish?</span>
          <div class="form-switch">
            <input type="checkbox" id="toggle1" class="sr-only" v-model="isPublished" :disabled="isSubmitting">
            <label class="bg-slate-400 dark:bg-slate-700" for="toggle1">
              <span class="bg-white shadow-sm" aria-hidden="true"></span>
              <span class="sr-only">Publish/Draft</span>
            </label>
          </div>
        </div>
        <button class="btn bg-zinc-900 hover:bg-zinc-800 text-white flex space-x-2" @click="onSubmit">
          <Icon name="lets-icons:save" class="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
    <!-- Input Section -->
    <form @submit="onSubmit">
      <div class="border-t border-zinc-300">
        <div class="mx-auto mt-4">
          <div>
            <label class="block text-sm font-medium mb-1" for="title">Title <span class="text-rose-500">*</span></label>
            <input id="title" class="form-input w-full" type="text" placeholder="Senior Software Engineer"
              v-model="title" :disabled="isSubmitting" />
            <div class="text-xs mt-1 text-rose-500">{{ errors.title }}</div>
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium mb-1" for="tags-csv">Tags (CSV)</label>
            <input id="tags-csv" class="form-input w-full" type="text" placeholder="Remote, Full Time, San Fransisco"
              v-model="tagsCSV" :disabled="isSubmitting" />
            <div class="text-xs mt-1 text-rose-500">{{ errors.tagsCSV }}</div>
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium mb-1" for="jobdescription">Job Description</label>
            <textarea id="jobdescription" class="form-textarea w-full focus:border-slate-300" rows="6"
              v-model="contents" placeholder="We want someone who…" :disabled="isSubmitting"></textarea>
            <div class="text-xs mt-1 text-rose-500">{{ errors.contents }}</div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>