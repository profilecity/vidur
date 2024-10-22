import { CalendarDate } from '@internationalized/date';

export function useTodaysDate() {
  const todaysDate = new Date();
  const todaysDateCalendar = dateToCalendarDate(todaysDate);

  return todaysDateCalendar;
}

export function dateToCalendarDate(date: Date) {
  const calendarDate = new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return calendarDate;
}

export function calendarDateToDate(calendarDate: CalendarDate) {
  return new Date(calendarDate.toString());
}
