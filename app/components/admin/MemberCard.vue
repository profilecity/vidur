<script setup lang="ts">
import type { Admin } from '~~/server/db/schema';

const props = defineProps<{
  member: Admin;
}>();

const { deleteData } = await useMembersRepository();
const { user: profile } = useUserSession();

const onRemove = () => {
  deleteData({ id: props.member.id });
};
</script>

<template>
  <div class="col-span-full md:col-span-4 xl:col-span-4 bg-white rounded-2xl border border-zinc-200">
    <!-- Card content -->
    <div class="flex justify-between items-center w-full p-2">
      <div class="flex items-center space-x-2">
        <img :src="member.picture" v-if="member.picture" class="w-10 h-10 rounded-xl border border-zinc-200s" />
        <div>
          <h3 class="text-lg text-zinc-800 font-semibold">{{ member.firstName }} {{ member.lastName }}</h3>
          <div class="text-sm text-zinc-400">{{ member.email }}</div>
        </div>
      </div>
      <AbstractConfirmationBox
        @confirm="onRemove"
        title="Remove Member?"
        confirmLabel="Remove"
        content="Member's access will be immediatly disabled. No actions performed by member will be reverted."
        v-if="profile?.id != member.id"
      >
        <template #input="{ open }">
          <VInputButton variant="destructive" size="icon" @click="open">
            <Icon name="mdi:delete" />
          </VInputButton>
        </template>
      </AbstractConfirmationBox>
    </div>
  </div>
</template>
