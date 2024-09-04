<script setup lang="ts">
import type { Hook } from '~/server/db/schema';

const props = defineProps<{
  hook: Hook;
}>();

const { deleteHook } = await useHooks();

const onDelete = () => {
  deleteHook(props.hook.id);
};
</script>

<template>
  <div
    class="col-span-full md:col-span-2 xl:col-span-3 rounded-xl border border-zinc-200 bg-white shadow-sm"
  >
    <!-- Card content -->
    <div class="flex flex-col h-full p-2">
      <div class="grow">
        <header class="flex mb-4 items-start">
          <div
            class="w-10 h-10 rounded-xl shrink-0 bg-gradient-to-tr from-amber-500 to-pink-300 mr-3 flex items-center justify-center"
          >
            <Icon
              name="mingcute:plugin-2-line"
              class="w-5 h-5 fill-current text-white"
            />
          </div>
          <div class="flex-col">
            <h3 class="text-base text-zinc-900 font-semibold font-noto">
              {{ hook.title }}
            </h3>
            <div class="text-sm text-blue-400">
              {{ hook.url.substring(0, 30) }}...
            </div>
          </div>
        </header>
      </div>
      <!-- Card footer -->
      <footer class="mt-2">
        <div class="flex flex-wrap justify-between items-center">
          <!-- Left side -->
          <div class="flex items-center text-zinc-400">
            <Icon
              name="formkit:time"
              class="w-4 h-4 shrink-0 fill-current mr-1"
            />
            <div class="text-sm">
              {{
                hook.lastExecutedAt
                  ? timeAgo(new Date(hook.lastExecutedAt))
                  : 'Never executed'
              }}
            </div>
          </div>
          <!-- Right side -->
          <div class="flex space-x-1">
            <AbstractConfirmationBox
              @confirm="onDelete"
              title="Delete Hook?"
              confirmLabel="Delete"
              content="Hook will stop receiving further events immediatly. You cannot undo this action."
            >
              <template #input="{ open }">
                <InputButton variant="destructive" size="icon" @click="open">
                  <Icon name="mdi:delete" />
                </InputButton>
              </template>
            </AbstractConfirmationBox>
            <AdminIntegrationHooksEditAction :hook="hook" />
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
