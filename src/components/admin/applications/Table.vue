<script setup lang="ts">
defineProps<{
  applicants: Applicants;
  applications: Application[];
}>();
</script>

<template>
  <div class="overflow-x-auto">
    <section class="w-full">
      <!-- Table body -->
      <div class="text-sm">
        <AdminApplicationsRow
          class="my-2"
          v-for="application in applications"
          :key="application.id"
          :applicant="applicants[application.candidateId]"
          :application="application"
        />
      </div>
    </section>
  </div>
</template>
