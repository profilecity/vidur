<script setup lang="ts">
import type { Hook } from "~/server/db/schema";

definePageMeta({
  layout: 'admin',
  middlware: 'admin-auth'
})

useHead({
  title: 'Integrations | Admin Panel'
})

const activeTab = useActiveTab(["hooks", "plugins"]);

const showEmptyState = ref(false);

const hooksApiCall = useFetch<Hook[]>("/api/hooks");

const hooks = ref<Hook[]>([]);

watchEffect(() => {
  if (hooksApiCall.data.value) {
    hooks.value = [...hooksApiCall.data.value];
  }
})

const newHookForm = ref();

const hookEvent = () => {
  hooksApiCall.refresh();
  newHookForm.value.clear();
}
</script>

<template>
  <AdminIntegrationHeader />
  <section v-if="activeTab == 'hooks'">
    <AdminIntegrationHooksEmptyState @createNew="showEmptyState = false" class="mt-8" v-if="hooks.length == 0 && showEmptyState"/>
    <div v-else>
      <AdminIntegrationHooksForm ref="newHookForm" class="p-4 bg-zinc-100" @created="hookEvent"/>
      <AdminIntegrationHooksTable :hooks="hooks" @updated="hookEvent" @deleted="hookEvent" />
    </div>
  </section>
  <section v-else-if="activeTab == 'plugins'">

  </section>
</template>