<script setup lang="ts">
const props = defineProps<{
  handles: Applicant['handles'];
}>();

const handlesByIcon: Record<string, string> = {};

const getHandleIcon = (handle: string) => {
  return getAllHandles().find((h) => h.id == handle)?.icon;
};

props.handles.forEach((h) => {
  const handleIcon = getHandleIcon(h.key);
  const handleValue = h.value;
  if (!handleIcon || !handleValue) return; // Only add supported handles;
  handlesByIcon[handleIcon] = handleValue;
});
</script>

<template>
  <div class="flex w-full justify-start space-x-2">
    <a target="_blank" :href="handlesByIcon[handleIcon]" v-for="handleIcon in Object.keys(handlesByIcon)">
      <Icon size="20" class="text-zinc-900" :name="handleIcon" />
    </a>
  </div>
</template>
