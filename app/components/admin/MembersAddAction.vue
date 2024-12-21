<script setup lang="ts">
import type { Admin } from '~~/server/db/schema';
import { watchDebounced } from '@vueuse/core';

const { postData, changing } = await useMembersRepository();

const suggestedAdmins = ref<Admin[]>();

const submit = async (id: string, closeFn: () => void) => {
  let success = false;
  if (id) {
    success = await postData({ id });
  }
  if (success) {
    closeFn();
  }
};

const adminSearchQuery = ref<string>('');
const fetchingAdminSuggestions = ref(false);

watchDebounced(
  adminSearchQuery,
  async (q) => {
    try {
      fetchingAdminSuggestions.value = true;
      suggestedAdmins.value = await $fetch<Admin[]>('/api/admin/lookup', {
        query: {
          q,
        },
      });
    } catch (error) {
      console.error('error fetching admin suggestions', error);
    } finally {
      fetchingAdminSuggestions.value = false;
    }
  },
  { debounce: 500, maxWait: 1000 }
);
</script>
<template>
  <Modal title="Add Member">
    <template #input="{ open }">
      <InputButton @click="open">
        <span class="mr-2">Add Member</span>
        <Icon name="ic:baseline-plus" class="w-5 h-5" />
      </InputButton>
    </template>
    <template #content="{ close }">
      <form>
        <input
          type="text"
          class="input-custom"
          placeholder="Start searching to add members"
          v-model="adminSearchQuery"
          :disabled="changing"
        />
        <div
          class="flex flex-col space-y-3 overflow-y-scroll no-scrollbar h-64 mt-3"
          v-if="suggestedAdmins && suggestedAdmins.length > 0"
        >
          <div
            class="flex w-full justify-between p-2 border rounded-lg"
            v-for="admin in suggestedAdmins"
            :key="admin.id"
          >
            <div class="flex space-x-1 items-center">
              <img :src="admin.picture" v-if="admin.picture" class="w-10 h-10 rounded-full" />
              <div class="flex flex-col text-sm">
                <span class="font-bold">{{ admin.firstName }} {{ admin.lastName }}</span>
                <span>{{ admin.email }}</span>
              </div>
            </div>
            <InputButton size="sm" variant="outline" @click="submit(admin.id, close)" :loading="changing"
              >Add</InputButton
            >
          </div>
        </div>
        <div class="h-64 flex w-full justify-center items-center" v-else>
          <span class="text-center" v-if="adminSearchQuery && !fetchingAdminSuggestions">
            <span class="font-bold">No Admin Found</span><br />
            <span class="text-xs">Admin has to login atleast once to be added.</span>
          </span>
          <span class="text-center" v-else-if="!adminSearchQuery">
            <span class="font-bold">Start typing to see suggestions.</span><br />
            <span class="text-xs">
              Any admin added will be able to see / create job postings and see / manage all the applicants.
            </span>
          </span>
        </div>
      </form>
    </template>
  </Modal>
</template>

<style scoped>
.input-custom {
  @apply w-full block py-2 px-4 border border-zinc-200 rounded-xl text-sm placeholder:text-zinc-400 focus:ring-1 focus:ring-inset focus:ring-zinc-300 sm:text-sm sm:leading-6 outline-0;
}
</style>
