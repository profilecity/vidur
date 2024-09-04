<script setup lang="ts">
const props = defineProps<{
  handles: Applicant['handles'];
}>();

const handles: Record<string, string> = {};

const getHandleIcon = (handle: string) => {
  return getAllHandles().find((h) => h.id == handle)?.icon;
};

props.handles.forEach((h) => {
  if (!getHandleIcon(h.key)) return; // Only add supported handles;
  handles[h.key] = h.value;
});
</script>

<template>
  <div class="flex w-full justify-start space-x-2">
    <a
      target="_blank"
      :href="handles[handle]"
      v-for="handle in Object.keys(handles)"
    >
      <Icon
        size="20"
        class="text-zinc-900 fill-current"
        :name="getHandleIcon(handle) as string"
        v-if="getHandleIcon(handle)"
      />
    </a>
  </div>
</template>
