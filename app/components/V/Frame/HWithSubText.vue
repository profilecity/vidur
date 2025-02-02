<script setup lang="ts">
import H1 from '../H1.vue';
import H2 from '../H2.vue';
import H3 from '../H3.vue';
import H4 from '../H4.vue';

const props = withDefaults(
  defineProps<{
    heading?: 'h1' | 'h2' | 'h3' | 'h4';
    subtextAsChild?: boolean;
  }>(),
  {
    heading: 'h2',
    subtextAsChild: false,
  }
);

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
} as const;
</script>

<template>
  <div
    class="flex flex-col"
    :class="{
      'space-y-2': props.heading === 'h1',
      'space-y-1': props.heading === 'h2',
      'space-y-0': props.heading === 'h3' || props.heading === 'h4',
    }"
  >
    <component :is="components[props.heading]" v-bind="$attrs">
      <slot name="heading"></slot>
    </component>
    <VSubtext v-if="!props.subtextAsChild">
      <slot name="subtext"></slot>
    </VSubtext>
    <slot name="subtext" v-else></slot>
  </div>
</template>
