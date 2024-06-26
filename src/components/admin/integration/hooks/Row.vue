<script setup lang="ts">
import type { Hook } from "~/server/db/schema";

const props = defineProps<{
  hook: Hook;
}>();

const isUpdating = ref(true);
if (props.hook.id === "") {
  isUpdating.value = false;
}

const emit = defineEmits<{
  updated: [hook: Hook];
  deleted: [id: string];
}>();

const descriptionOpen = ref(false)
</script>

<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-slate-800">{{ hook.title }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">{{ timeAgo(new Date(hook.updatedAt)) }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left" v-if="hook.lastExecutedAt">{{ timeAgo(new Date(hook.lastExecutedAt)) }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="flex items-center">
        <button class="text-slate-400 hover:text-slate-500 transform"
          :class="{ 'rotate-180': descriptionOpen }" @click.prevent="descriptionOpen = !descriptionOpen"
          :aria-expanded="descriptionOpen" :aria-controls="`description-${hook.id}`">
          <span class="sr-only">Menu</span>
          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
          </svg>
        </button>
      </div>
    </td>
  </tr>
  <tr :id="`description-${hook.id}`" role="region" :class="!descriptionOpen && 'hidden'">
    <td colspan="10" class="px-2 first:pl-5 last:pr-5 py-3">
      <div class="bg-slate-50 p-3 -mt-3">
        <AdminIntegrationHooksForm @updated="(h) => emit('updated', h)" @deleted="(id) => emit('deleted', id)"
          :hook="hook" />
      </div>
    </td>
  </tr>
</template>