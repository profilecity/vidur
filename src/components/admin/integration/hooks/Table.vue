<script setup lang="ts">
import type { Hook } from "~/server/db/schema";

defineProps<{
  hooks: Hook[],
}>()

const emit = defineEmits<{
  updated: [hook: Hook];
  deleted: [id: string];
}>();
</script>

<template>
  <div class="rounded-sm border border-zinc-200">
    <div class="overflow-x-auto">
      <table class="table-auto w-full divide-y divide-zinc-200">
        <tbody class="text-sm">
          <AdminIntegrationHooksRow v-for="hook in hooks" :key="hook.id" :hook="hook"
            @updated="(h) => emit('updated', h)" @deleted="(id) => emit('deleted', id)" />
        </tbody>
      </table>
    </div>
  </div>
</template>