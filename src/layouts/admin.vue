<template>
  <main class="min-h-screen w-full">
    <div class="flex-col md:flex-row h-full w-full hidden lg:flex">
      <AdminSidebar />
      <section class="ml-60 w-full bg-zinc-50 min-h-screen">
        <slot />
      </section>
    </div>
    <div
      class="flex-col flex lg:hidden w-full items-center justify-center h-screen"
    >
      <div class="text-4xl">⚠️</div>
      <div class="font-noto font-bold text-zinc-900">
        Admin panel can only be accessed via desktop.
      </div>
    </div>
  </main>
</template>
