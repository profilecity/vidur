<script setup lang="ts">
defineProps<{
  applicants: Applicants;
  applications: Application[];
}>();
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table-auto w-full">
      <!-- Table header -->
      <thead
        class="text-xs font-semibold uppercase text-gray-500 border-y border-gray-200">
        <tr>
          <th class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
            <div class="font-semibold text-left">Applicant</div>
          </th>
          <th class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
            <div class="font-semibold text-left">Public Handles</div>
          </th>
          <th class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
            <div class="font-semibold text-left">Applied</div>
          </th>
          <th class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
            <div class="font-semibold text-right">Resume</div>
          </th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody
        class="text-sm divide-y divide-gray-100 border-b border-gray-200">
        <AdminApplicationsRow v-for="application in applications" :key="application.id"
          :applicant="applicants[application.candidateId]" :application="application" />
      </tbody>
    </table>

  </div>
</template>