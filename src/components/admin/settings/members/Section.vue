<script setup lang="ts">
const { members } = await useMembers();
</script>

<template>
  <section>
    <AdminSettingsMembersAddAction/>
    <div class="grid grid-cols-12 gap-6 mt-2">
      <AdminSettingsMembersCard v-for="member in members" :key="member.id" :member="member" />
    </div>
  </section>
</template>