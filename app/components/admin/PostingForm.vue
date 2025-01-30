<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date';
import { syncRef } from '@vueuse/core';
import { employmentTypeIds, employmentTypes } from '~~/shared/employment-types';
import { createJobPostingSchema, updateJobPostingSchema } from '~~/shared/schemas/posting';
import type { SelectableOption } from '~~/shared/types/general';

const props = defineProps<{
  id?: string;
}>();

const emits = defineEmits<{
  done: [];
}>();

const isEditing = !!props.id;

const { refresh } = await usePostingsRepository();

const isUpdating = ref(false);
const isCreating = ref(false);
const isExpired = ref(false);

const disableFields = computed(() => isUpdating.value || isCreating.value || isExpired.value);

const formSchema = toTypedSchema(isEditing ? updateJobPostingSchema : createJobPostingSchema);
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: formSchema,
});

const validTillCalendarDate = shallowRef<CalendarDate>();

const [title] = defineField('title');
const [contents] = defineField('contents');
const [tagsCSV] = defineField('tagsCSV');
const [isPublished] = defineField('isPublished');
const [validTill] = defineField('validTill');
const [isRemote] = defineField('isRemote');
const [employmentType] = defineField('employmentType');
const [baseSalary] = defineField('baseSalary');

let onDelete = () => Promise.resolve();
let onUpdate = () => Promise.resolve();
let onCreate = handleSubmit(async (values) => {
  try {
    isCreating.value = true;
    await $fetch('/api/posting', {
      method: 'POST',
      body: {
        ...values,
      },
    });
    refresh();
    emits('done');
  } catch (e) {
    console.error(e);
  } finally {
    isCreating.value = false;
  }
});

if (isEditing) {
  // @ts-expect-error (only available when editing)
  const [id] = defineField('id');

  const q = { id: props.id as string };
  const { data, changing, deleteData, updateData } = await usePostingRepository(q);

  syncRef(changing, isUpdating, { direction: 'rtl' });

  if (!data.value.id)
    throw createError({
      statusCode: 404,
      message: 'Unable to edit posting, not found.',
    });

  id.value = data.value.id;
  title.value = data.value.title;
  contents.value = data.value.contents || undefined;
  tagsCSV.value = data.value.tagsCSV || undefined;
  isPublished.value = data.value.isPublished;
  validTill.value = (data.value.validTill as string | null) || undefined;
  isRemote.value = data.value.isRemote || false;
  employmentType.value = data.value.employmentType || employmentTypeIds[0];
  baseSalary.value = data.value.baseSalary || {};

  // Initialise Extra Refs
  if (validTill.value) {
    validTillCalendarDate.value = dateToCalendarDate(new Date(validTill.value));
  }
  isExpired.value = data.value.isExpired;

  onDelete = async () => {
    await deleteData(q);
    refresh();
    emits('done');
  };

  onUpdate = handleSubmit(async (values) => {
    await updateData({ ...values, id: data.value.id });
    refresh();
    emits('done');
  }) as () => Promise<void>;
} else {
  isRemote.value = false;
  employmentType.value = employmentTypeIds[0];
  baseSalary.value = {};
}

const onSubmit = () => {
  isEditing ? onUpdate() : onCreate();
};

watch(validTillCalendarDate, (calendarDate) => {
  if (!calendarDate) return;
  validTill.value = calendarDateToDate(calendarDate).toISOString();
});

const employmentTypeOptions = employmentTypes.map<SelectableOption>((e) => ({
  id: e.id,
  title: e.title,
  description: e.description,
}));

defineExpose({
  delete: onDelete,
  submit: onSubmit,
  isEditing: isEditing,
});
</script>

<template>
  <div class="w-full h-full bg-zinc-100">
    <div
      class="flex justify-center items-center border-b border-zinc-200 bg-red-200 text-red-600 text-sm py-1"
      v-if="isExpired"
    >
      Posting has expired. Editing is disabled.
    </div>
    <!-- Input Section -->
    <form @submit="onSubmit" class="w-full flex items-start space-x-6 h-full">
      <section class="flex flex-col w-2/3 space-y-3 px-4 pt-4 h-full">
        <InputText
          placeholder="Senior Software Engineer"
          label="Title"
          :disabled="disableFields"
          :error="errors.title"
          v-model="title"
        />
        <InputText
          placeholder="Remote, Full Time, San Fransisco"
          label="Tags (CSV)"
          :disabled="disableFields"
          v-model="tagsCSV"
        />
        <InputLabel label="Job Description" :error="errors.contents">
          <template #input>
            <Editor
              placeholder="We are looking for someone who can..."
              editor-class="h-[480px] overflow-y-scroll"
              v-model="contents"
              :read-only="disableFields"
            />
          </template>
        </InputLabel>
      </section>
      <section class="flex flex-col items-start justify-start space-y-3 w-1/3 px-4 pt-4 border-l-2 h-full">
        <div class="flex w-full justify-end space-x-3 px-4 pt-2">
          <AbstractConfirmationBox
            title="Delete Posting?"
            content="You won't be able to undo this action. You will loose access to applicant list."
            @confirm="onDelete"
            v-if="isEditing"
          >
            <template #input="{ open }">
              <InputButton class="w-22" variant="destructive" @click="open" :disabled="disableFields">
                <div class="flex items-center space-x-1 w-full">
                  <Icon name="material-symbols:delete-outline" class="h-4 w-4" />
                  <span>Delete</span>
                </div>
              </InputButton>
            </template>
          </AbstractConfirmationBox>
          <AbstractConfirmationBox
            title="Save Posting?"
            content="Are you sure you want to save the changes?"
            @confirm="onSubmit"
          >
            <template #input="{ open }">
              <InputButton class="w-22" :disabled="disableFields" @click="open">
                <div class="flex items-center space-x-1 w-full">
                  <Icon name="lets-icons:save" class="h-4 w-4" />
                  <span>Save</span>
                </div>
              </InputButton>
            </template>
          </AbstractConfirmationBox>
        </div>
        <InputLabel label="Publish?">
          <template #input>
            <div class="border p-[7px] w-full rounded-lg bg-white">
              <InputSwitch v-model="isPublished" :disabled="disableFields" />
            </div>
          </template>
        </InputLabel>
        <InputLabel label="Expiry Date">
          <template #input>
            <div class="border p-0.5 w-full rounded-lg bg-white">
              <InputDatePicker
                class="w-full"
                label="Expiry Date"
                v-model="validTillCalendarDate"
                :disabled="disableFields"
              />
            </div>
          </template>
        </InputLabel>
        <InputLabel label="Is Remote?">
          <template #input>
            <div class="border p-[7px] w-full rounded-lg bg-white">
              <InputSwitch v-model="isRemote" :disabled="disableFields" />
            </div>
          </template>
        </InputLabel>
        <InputLabel label="Employment Type">
          <template #input>
            <InputCombobox class="bg-white rounded-lg" :options="employmentTypeOptions" v-model="employmentType" />
          </template>
        </InputLabel>
        <InputLabel label="Salary Details">
          <template #input>
            <div class="flex flex-col p-2 border rounded-lg space-y-2 bg-white">
              <div class="flex w-full items-center space-x-2">
                <InputLabel label="Unit">
                  <template #input>
                    <PickerSalaryUnit v-model="baseSalary!.unitText" />
                  </template>
                </InputLabel>
                <InputLabel label="Currency">
                  <template #input>
                    <PickerCurrency v-model="baseSalary!.currency" />
                  </template>
                </InputLabel>
              </div>
              <InputLabel label="Range">
                <template #input>
                  <div class="flex w-full items-center space-x-2">
                    <InputText
                      class="w-1/2"
                      type-override="number"
                      v-model="baseSalary!.minValue"
                      placeholder="Minimum"
                    />
                    <span class="text-xs text-zinc-600">to</span>
                    <InputText
                      class="w-1/2"
                      type-override="number"
                      v-model="baseSalary!.maxValue"
                      placeholder="Maximum"
                    />
                  </div>
                </template>
              </InputLabel>
            </div>
          </template>
        </InputLabel>
      </section>
    </form>
  </div>
</template>
