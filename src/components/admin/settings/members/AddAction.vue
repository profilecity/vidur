<template>
  <Modal title="Add Member">
    <template #input="{ open }">
      <button class="btn bg-zinc-800 hover:bg-zinc-800 text-white text-xs" @click="open">
        <span class="mr-2">Add Member</span>
        <Icon name="ic:baseline-plus" class="w-5 h-5" />
      </button>
    </template>
    <template #content="{ close }">
      <form>
        <input type="text" class="input-custom" placeholder="Start searching to add members" v-model="userSearchQuery" :disabled="isSubmitting" />
        <div class="flex flex-col space-y-3 overflow-y-scroll no-scrollbar h-64 mt-3"
          v-if="suggestedUsers && suggestedUsers.length > 0">
          <div class="flex w-full justify-between p-2 border rounded-lg" v-for="user in suggestedUsers" :key="user.id">
            <div class="flex space-x-1 items-center">
              <img :src="user.picture" v-if="user.picture" class="w-10 h-10 rounded-full">
              <div class="flex flex-col text-sm">
                <span class="font-bold">{{ user.firstName }} {{ user.lastName }}</span>
                <span>{{ user.email }}</span>
              </div>
            </div>
            <AbstractAsyncAction :is-loading="isSubmitting">
              <template #default="{ startAction }">
                <button class="btn btn-sm border text-sm" @click="startAction(() => submit(user.id, close))" :disabled="isSubmitting">
                  Add
                </button>
              </template>
            </AbstractAsyncAction>
          </div>
        </div>
        <div class="h-64 flex w-full justify-center items-center" v-else>
          <span class="text-center" v-if="userSearchQuery && !fetchingUserSuggestions">
            <span class="font-bold">No User Found</span><br>
            <span class="text-xs">User has to login at least once to be added.</span>
          </span>
          <span class="text-center" v-else-if="!userSearchQuery">
            <span class="font-bold">Start typing to see suggestions.</span><br>
            <span class="text-xs">
              Any user added will be able to see / create job postings and see / manage all the applicants.
            </span>
          </span>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import type { User } from "~/server/db/schema";
import { watchDebounced } from "@vueuse/core";

const { addMember, isSubmitting } = await useMembers();

const suggestedUsers = ref<User[]>();

const submit = async (id: string, closeFn: () => void) => {
  let success = false;
  if (id) {
    success = await addMember({ id });
  }
  if (success) {
    closeFn();
  }
}

const userSearchQuery = ref<string>("");
const fetchingUserSuggestions = ref(false);

watchDebounced(userSearchQuery, async (q) => {
  try {
    fetchingUserSuggestions.value = true;
    suggestedUsers.value = await $fetch<User[]>("/api/user/lookup", {
      query: {
        q,
      }
    })
  } catch (error) {
    console.error("error fetching user suggestions", error);
  } finally {
    fetchingUserSuggestions.value = false;
  }
}, { debounce: 500, maxWait: 1000 })
</script>

<style scoped>
.input-custom {
  @apply w-full block py-2 px-4 border border-zinc-200 rounded-xl text-sm placeholder:text-zinc-400 focus:ring-1 focus:ring-inset focus:ring-zinc-300 sm:text-sm sm:leading-6 outline-0;
}
</style>
