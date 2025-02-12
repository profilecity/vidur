<script setup lang="ts">
const { data } = await useMembersRepository();
</script>

<template>
  <VFrameTabbed tab-group="settings">
    <template #action>
      <AdminMembersAddAction />
    </template>
    <template #content>
      <section class="grid grid-cols-12 gap-6 mt-4 px-4">
        <AdminMemberCard v-for="member in data" :key="member.id" :member="member" />
      </section>
    </template>
  </VFrameTabbed>
</template>
