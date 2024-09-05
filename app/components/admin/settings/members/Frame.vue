<script setup lang="ts">
const { data } = await useMembersRepository();
</script>

<template>
  <FrameTabbed tab-group="settings">
    <template #action>
      <AdminSettingsMembersAddAction />
    </template>
    <template #content>
      <section class="grid grid-cols-12 gap-6 mt-4 px-4">
        <AdminSettingsMembersCard
          v-for="member in data"
          :key="member.id"
          :member="member"
        />
      </section>
    </template>
  </FrameTabbed>
</template>
