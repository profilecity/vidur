<template>
  <section class="sticky top-0 bg-white p-4 border-b border-zinc-200">
    <div class="flex text-xl font-bold text-zinc-900">Postings</div>
    <div class="flex items-center mt-2">
      <NuxtLink to="/admin/postings/edit"
          class="btn text-zinc-900 hover:border-zinc-300 hover:text-zinc-800">
          <span class="mr-2">Create Posting</span>
          <Icon name="ic:baseline-plus" class="w-4 h-4" />
      </NuxtLink>
    </div>
  </section>
</template>