<script setup lang="ts">
import { loginSchema } from '~~/shared/schemas/authentication';

const formSchema = toTypedSchema(loginSchema);
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: formSchema,
});

const [email] = defineField('email');
const [password] = defineField('password');

const submit = handleSubmit(async (validatedData) => {
  await $fetch('/api/login', {
    method: 'POST',
    body: validatedData,
  });
});
</script>

<template>
  <main class="w-full h-full">
    <div class="flex w-full items-center justify-center h-screen border">
      <div class="flex flex-col space-y-2 w-1/3 border border-zinc-300 p-12 rounded-xl">
        <div class="flex justify-center">
          <InputLabel class="text-center" label-class="text-xl !font-bold" label="Login">Login</InputLabel>
          <div class="ml-5 mr-5">|</div>
          <img src="/vidur-small.svg" class="h-8" />
        </div>
        <InputLabel
          label-class="text-sm text-gray-500 text-center"
          label="The only recruiting software you will ever need"
          id="random"
        />

        <InputText class="w-full" placeholder="Email" v-model="email" :error="errors['email']" />

        <InputText
          class="w-full"
          placeholder="Password"
          type-override="password"
          v-model="password"
          :error="errors['password']"
        />
        <InputButton @click="submit">Login</InputButton>

        <div class="text-center">
          <span class="text-sm text-zinc-600">Don't have an account? </span>
          <NuxtLink to="/register" class="text-sm text-primary">Register</NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>
