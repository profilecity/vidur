<script setup lang="ts">
import { createJobPostingSchema, updateJobPostingSchema } from '~/schemas/posting';
import type { JobPosting } from '~/server/db/schema';
import { ref, computed } from 'vue';
import WysiwygEditor from '~/components/WysiwygEditor.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
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
} else {
  isPublished.value = false;
}

const isSubmitting = ref(false);

const onSubmit = handleSubmit(async values => {
  try {
    isSubmitting.value = true;
    await $fetch('/api/posting', {
      method: isUpdating ? 'PUT' : 'POST',
      body: {
        ...values,
        contents: contents.value,
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
    <div class="flex flex-col md:flex-row justify-between items-center mb-4 border-b border-zinc-200 p-4 bg-white">
      <div class="mb-4 sm:mb-0">
        <h2 class="text-md md:text-lg text-zinc-800 font-bold flex items-center">
          <Icon class="w-5 h-5 shrink-0 fill-current mr-2" name="iconamoon:edit" />{{ isUpdating ?
            posting.title : 'New Posting' }}
        </h2>
      </div>
      <div class="flex items-center space-x-3">
        <Icon name="ei:spinner-3" class="w-6 h-6 text-zinc-900 animate-spin" v-if="isSubmitting" />
        <AbstractConfirmationBox title="Delete Posting?" content="You won't be able to undo this action. You will loose access to applicant list." @confirm="onDelete">
          <template #input="{ open }">
            <button class="btn border border-zinc-100" :disabled="isSubmitting" @click="open">
              <Icon name="material-symbols:delete-outline" class="text-red-500 w-5 h-5" />
            </button>
          </template>
        </AbstractConfirmationBox>
        <div class="flex space-x-1 items-center border bg-zinc-100 p-2 rounded-xl">
          <span class="text-sm">Publish?</span>
          <div class="form-switch">
            <input type="checkbox" id="toggle1" class="sr-only" v-model="isPublished" :disabled="isSubmitting">
            <label class="bg-zinc-400" for="toggle1">
              <span class="bg-white shadow-sm" aria-hidden="true"></span>
              <span class="sr-only">Publish/Draft</span>
            </label>
          </div>
        </div>
        <AbstractConfirmationBox title="Delete Posting?" content="You won't be able to undo this action. You will loose access to applicant list." @confirm="onDelete">
          <template #input="{ open }">
            <button class="btn border border-zinc-100" :disabled="isSubmitting" @click="open">
              <Icon name="material-symbols:delete-outline" class="text-red-500 w-5 h-5" />
            </button>
          </template>
        </AbstractConfirmationBox>
      </div>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="px-4">
        <div class="mx-auto mt-4">
          <div>
            <label class="block text-sm font-medium mb-1" for="title">Title <span class="text-rose-500">*</span></label>
            <input id="title" class="form-input w-full" type="text" placeholder="Senior Software Engineer"
              v-model="title" :disabled="isSubmitting" />
            <div class="text-xs mt-1 text-rose-500">{{ errors.title }}</div>
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium mb-1" for="tags-csv">Tags (CSV)</label>
            <input id="tags-csv" class="form-input w-full" type="text" placeholder="Remote, Full Time, San Francisco"
              v-model="tagsCSV" :disabled="isSubmitting" />
            <div class="text-xs mt-1 text-rose-500">{{ errors.tagsCSV }}</div>
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium mb-1" for="jobdescription">Job Description</label>
            <WysiwygEditor :initial-content="contents" @update:content="contents = $event" />
            <div class="text-xs mt-1 text-rose-500">{{ errors.contents }}</div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>