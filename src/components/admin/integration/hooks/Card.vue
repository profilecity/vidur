<script setup lang="ts">
import type { Hook } from '~/server/db/schema';

const props = defineProps<{
  hook: Hook;
}>();

const { deleteHook } = await useHooks();

const onDelete = () => {
  deleteHook(props.hook.id);
}
</script>

<template>
  <div class="col-span-full md:col-span-2 xl:col-span-4 bg-white shadow-md rounded-2xl border border-zinc-200">
    <!-- Card content -->
    <div class="flex flex-col h-full p-2">
      <div class="grow">
        <header class="flex items-center mb-4">
          <div
            class="w-10 h-10 rounded-full shrink-0 bg-gradient-to-tr from-indigo-500 to-indigo-300 mr-3 flex items-center justify-center">
            <Icon name="tabler:fish-hook" class="w-5 h-5 fill-current text-white" />
          </div>
          <h3 class="text-lg text-zinc-800 font-semibold">{{ hook.title }}</h3>
        </header>
        <div class="text-sm text-zinc-400">{{ hook.url }}</div>
      </div>
      <!-- Card footer -->
      <footer class="mt-4">
        <div class="flex flex-wrap justify-between items-center">
          <!-- Left side -->
          <div class="flex items-center text-zinc-400">
            <Icon name="formkit:time" class="w-4 h-4 shrink-0 fill-current mr-1" />
            <div class="text-sm text-zinc-500">
              {{ hook.lastExecutedAt ? timeAgo(new Date(hook.lastExecutedAt)) : 'Never executed' }}
            </div>
          </div>
          <!-- Right side -->
          <div class="flex space-x-1">
            <AbstractConfirmationBox @confirm="onDelete" title="Delete Hook?" confirmLabel="Delete" content="Hook will stop receiving further events immediatly. You cannot undo this action.">
              <template #input="{ open }">
                <button class="btn btn-sm border border-zinc-200 hover:border-zinc-300 flex space-x-1 items-center" @click="open">
                  <Icon name="mdi:delete" class="w-4 h-4 text-red-500" />
                  <span>Delete</span>
                </button>
              </template>
            </AbstractConfirmationBox>
            <AdminIntegrationHooksEditAction :hook="hook"/>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>