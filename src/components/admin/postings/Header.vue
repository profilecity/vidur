<template>
  <section class="sticky top-0 bg-white p-4">
    <div class="flex text-xl font-bold text-zinc-900">Postings</div>
    <div class="flex items-center border-b py-4 mt-2">
      <div class="bg-zinc-100 p-2 space-x-1 rounded-xl border border-zinc-200">
        <NuxtLink to="/admin/postings/edit"
          class="btn bg-white border-zinc-200 text-zinc-900 hover:border-slate-300 hover:text-slate-800">
          <span class="mr-2">Create Posting</span>
          <Icon name="ic:baseline-plus" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>