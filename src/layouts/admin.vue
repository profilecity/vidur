<template>
  <main class="min-h-screen w-full">
    <div class="flex flex-col md:flex-row h-full w-full">
      <AdminSidebar/>
      <section class="px-4 py-2 md:px-4 md:py-4 w-full">
        <slot />
      </section>
    </div>
  </main>
</template>