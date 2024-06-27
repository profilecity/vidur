<template>
  <main class="min-h-screen w-full">
    <AdminHeader />
    <div class="flex flex-col md:flex-row h-full w-full">
      <AdminSidebar class="md:h-[calc(100vh-4rem)]" />
      <section class="px-4 py-2 md:px-4 md:py-4 w-full">
        <slot />
      </section>
    </div>
  </main>
</template>