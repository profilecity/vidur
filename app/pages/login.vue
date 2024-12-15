<template>
  <main class="w-full h-full">
    <div class="justify-center flex mt-12">
      <img src="/vidur-logo.svg" class="h-8" />
    </div>
    <h4 class="text-sm text-zinc-600 mt-2 mb-6 text-center">The only recruiting software you will ever need.</h4>
    <div class="flex w-full items-center justify-center h-[calc(100vh-160px)] border">
      <div class="flex flex-col space-y-2 w-1/3">
        <InputLabel class="text-center" label-class="text-xl font-mont" label="Login">Login</InputLabel>
        <InputText class="w-full" placeholder="Email" />
        <InputText class="w-full" placeholder="Password" type-override="password" />
        <InputButton>Login</InputButton>
      </div>
    </div>
  </main>
</template>
