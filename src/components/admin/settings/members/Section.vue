<script setup lang="ts">
const { members } = await useMembers();
</script>

<template>
  <section class="px-4">
    <AdminSettingsMembersAddAction/>
    <div class="grid grid-cols-12 gap-6 mt-4">
      <AdminSettingsMembersCard v-for="member in members" :key="member.id" :member="member" />
    </div>
  </section>
</template>