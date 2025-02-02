<script setup lang="ts">
import { createReviewTagSchema } from '~~/shared/schemas/review-tags';
import type { SelectableOption } from '~~/shared/types/general';

const { data: reviewTags, postData: createReviewTag, deleteData: deleteReviewTag } = await useReviewTagsRepository();

const pendingReviewTags = computed(() => reviewTags.value.filter((t) => t.parent === 0));
const deferredReviewTags = computed(() => reviewTags.value.filter((t) => t.parent === 1));
const rejectedReviewTags = computed(() => reviewTags.value.filter((t) => t.parent === 2));
const shortlistedReviewTags = computed(() => reviewTags.value.filter((t) => t.parent === 3));
const approvedReviewTags = computed(() => reviewTags.value.filter((t) => t.parent === 4));

const tagsVsIndex = [
  pendingReviewTags,
  deferredReviewTags,
  rejectedReviewTags,
  shortlistedReviewTags,
  approvedReviewTags,
];

const reviewTagCategoryDropdownOptions: SelectableOption[] = reviewTagGroupVsIndex.map((tg, i) => ({
  id: i,
  title: tg,
  logo: 'material-symbols:circle',
  logoClass: `text-${reviewTagColorVsIndex[i]}-200 rounded-full border border-${reviewTagColorVsIndex[i]}-600`,
}));

const formSchema = toTypedSchema(createReviewTagSchema);
const { handleSubmit, errors, defineField, handleReset } = useForm({
  validationSchema: formSchema,
});

const [newTagTitle] = defineField('title');
const [newTagParent] = defineField('parent');

const onSubmit = handleSubmit(async (values) => {
  await createReviewTag(values);
  handleReset();
});

const activeDeleteId = ref<number>();
const onDelete = async () => {
  if (!activeDeleteId.value) return;
  await deleteReviewTag({ id: activeDeleteId.value });
  activeDeleteId.value = undefined;
};
</script>

<template>
  <Modal class-override="h-full">
    <template #input="{ open }">
      <VInputButton :variant="'secondary'" @click="open">
        <Icon name="mdi:tags" class="w-5 h-5 mr-1" />
        <span>Manage Tags</span>
      </VInputButton>
    </template>
    <template #content>
      <div class="h-full overflow-y-scroll">
        <div class="mb-6">
          <div class="flex items-center space-x-2 mb-2">
            <span class="font-noto font-bold">New Review Tag</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="flex flex-col">
              <AbstractDropdownSingleSelect
                :options="reviewTagCategoryDropdownOptions"
                title="Category"
                v-model="newTagParent"
              />
              <span class="text-rose-600 text-xs">{{ errors['parent'] }}</span>
            </div>
            <div class="flex flex-col">
              <VInputText placeholder="Title" v-model="newTagTitle" />
              <span class="text-rose-600 text-xs">{{ errors['title'] }}</span>
            </div>
            <VInputButton @click.prevent="onSubmit">Create</VInputButton>
          </div>
        </div>
        <div class="mb-6" v-for="(_, i) in 5">
          <div class="flex items-center space-x-2 mb-2">
            <span class="font-noto font-bold">{{ reviewTagGroupVsIndex[i] }} Tags</span>
          </div>
          <div
            class="flex w-full items-center justify-between mb-2 border border-zinc-200 rounded p-1"
            v-for="tag in tagsVsIndex[i]?.value"
            :key="tag.id"
          >
            <div class="flex items-center">
              <Icon
                name="material-symbols:circle"
                class="w-4 h-4 mr-1"
                :class="`text-${reviewTagColorVsIndex[i]}-200 rounded-full border border-${reviewTagColorVsIndex[i]}-600`"
              />
              <span>{{ tag.title }}</span>
            </div>
            <VInputButton
              variant="ghost"
              size="icon-xs"
              v-if="activeDeleteId !== tag.id"
              @click.prevent="activeDeleteId = tag.id"
            >
              <Icon name="mdi:delete" class="text-red-500 hover:text-red-600" />
            </VInputButton>
            <VInputButton variant="destructive" size="sm" class="space-x-1" @click.prevent="onDelete" v-else>
              <Icon name="mdi:delete" />
              <span>Delete?</span>
            </VInputButton>
          </div>
        </div>
        <AdminReviewTagPicker />
      </div>
    </template>
  </Modal>
</template>
