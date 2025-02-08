<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerField,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger,
  Label,
} from 'radix-vue';
import { CalendarDate } from '@internationalized/date';
import { useVModel } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    modelValue?: CalendarDate;
    label?: string;
    disabled?: boolean;
  }>(),
  {
    label: 'Pick a date',
  }
);

const emits = defineEmits<{
  'update:modelValue': [CalendarDate];
}>();

const selectedDate = useVModel(props, 'modelValue', emits);

const todaysDate = useTodaysDate();
const isDateDisabled = (date: CalendarDate) => date.compare(todaysDate) <= 0;

const open = ref<boolean>();
const defaultDate = selectedDate.value ? selectedDate.value : todaysDate.add({ days: 8 });
const dateModel = ref<CalendarDate>(defaultDate);

const onSelect = () => {
  open.value = false;
  // @ts-expect-error
  selectedDate.value = dateModel.value;
};

const onClear = () => {
  open.value = false;
  selectedDate.value = undefined;
};
</script>

<template>
  <!-- @vue-expect-error -->
  <DatePickerRoot id="date-field" :is-date-disabled v-model:open="open" v-model:model-value="dateModel" :disabled>
    <DatePickerField class="flex items-center space-x-2 border border-transparent justify-start w-full">
      <DatePickerTrigger as-child>
        <VInputButton size="icon-sm" variant="secondary" @click.stop="open = !open">
          <Icon icon="radix-icons:calendar" class="w-5 h-5" />
        </VInputButton>
      </DatePickerTrigger>
      <div class="flex flex-col text-sm">
        <span v-if="selectedDate">
          {{ `${selectedDate.month}/${selectedDate.day}/${selectedDate.year}` }}
        </span>
        <span v-else> Select a date </span>
      </div>
    </DatePickerField>

    <DatePickerContent
      :side-offset="2"
      class="border shadow-md rounded-xl bg-white data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
    >
      <DatePickerArrow class="fill-white" />
      <DatePickerCalendar v-slot="{ weekDays, grid }" class="p-4">
        <DatePickerHeader class="flex items-center justify-between">
          <DatePickerPrev class="text-zinc-400 justify-center rounded-lg w-8 h-8 hover:border inline-flex items-center">
            <Icon icon="radix-icons:chevron-left" class="w-6 h-6" />
          </DatePickerPrev>

          <DatePickerHeading class="text-black font-bold font-lato" />
          <DatePickerNext class="text-zinc-400 justify-center rounded-lg w-8 h-8 hover:border inline-flex items-center">
            <Icon icon="radix-icons:chevron-right" class="w-6 h-6" />
          </DatePickerNext>
        </DatePickerHeader>
        <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <DatePickerGrid
            v-for="month in grid"
            :key="month.value.toString()"
            class="w-full border-collapse select-none space-y-1"
          >
            <DatePickerGridHead>
              <DatePickerGridRow class="mb-1 flex w-full justify-between">
                <DatePickerHeadCell v-for="day in weekDays" :key="day" class="w-8 rounded-md text-xs text-green8">
                  {{ day }}
                </DatePickerHeadCell>
              </DatePickerGridRow>
            </DatePickerGridHead>
            <DatePickerGridBody>
              <DatePickerGridRow
                v-for="(weekDates, index) in month.rows"
                :key="`weekDate-${index}`"
                class="flex w-full"
              >
                <DatePickerCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate">
                  <DatePickerCellTrigger
                    :day="weekDate"
                    :month="month.value"
                    class="relative flex items-center justify-center whitespace-nowrap rounded-lg border text-sm font-normal text-zinc-700 w-8 h-8 outline-none hover:border-zinc-300 data-[selected]:bg-zinc-800 data-[selected]:font-medium data-[disabled]:text-zinc-300 data-[selected]:text-white data-[unavailable]:pointer-events-none data-[unavailable]:text-black/30 data-[unavailable]:line-through before:absolute before:top-[5px] before:hidden before:rounded-full before:w-1 before:h-1 before:bg-white data-[today]:before:block data-[today]:before:bg-green9 data-[selected]:before:bg-white"
                  />
                </DatePickerCell>
              </DatePickerGridRow>
            </DatePickerGridBody>
          </DatePickerGrid>
        </div>
      </DatePickerCalendar>
      <div class="flex justify-between items-center text-sm text-zinc-500 mb-2 px-4">
        <span>{{ `${dateModel.month}/${dateModel.day}/${dateModel.year}` }}</span>
        <div class="flex space-x-1">
          <VInputButton variant="secondary" size="sm" @click.prevent="onClear" v-if="selectedDate">Clear</VInputButton>
          <VInputButton size="sm" @click.prevent="onSelect">Select</VInputButton>
        </div>
      </div>
    </DatePickerContent>
  </DatePickerRoot>
</template>
