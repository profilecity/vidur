<script setup lang="ts">
import type { User } from '~/server/db/schema';

const props = defineProps<{
  member: User;
}>();

const { removeMember } = await useMembers();
const session = await useAuth();

const onRemove = () => {
  removeMember({ id: props.member.id });
}
</script>

<template>
  <div class="col-span-full md:col-span-2 xl:col-span-4 bg-white shadow-md rounded-2xl border border-zinc-200">
    <!-- Card content -->
    <div class="flex justify-between items-center w-full p-2">
      <div class="flex items-center space-x-2">
        <img :src="member.picture" v-if="member.picture" class="w-10 h-10 rounded-full" />
        <div>
          <h3 class="text-lg text-zinc-800 font-semibold">{{ member.firstName }} {{ member.lastName }}</h3>
          <div class="text-sm text-zinc-400">{{ member.email }}</div>
        </div>
      </div>
      <AbstractConfirmationBox @confirm="onRemove" title="Remove Member?" confirmLabel="Remove"
        content="Member's access will be immediatly disabled. No actions performed by member will be reverted."
        v-if="session.user.value?.profile.id != member.id">
        <template #input="{ open }">
          <button class="btn btn-sm border border-zinc-200 hover:border-zinc-300 flex space-x-1 items-center"
            @click="open">
            <Icon name="mdi:delete" class="w-4 h-4 text-red-500" />
            <span>Remove</span>
          </button>
        </template>
      </AbstractConfirmationBox>
    </div>
  </div>
</template>