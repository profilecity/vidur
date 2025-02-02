<script setup lang="ts">
import { loginSchema } from '~~/shared/schemas/authentication';

const { loggedIn, fetch: loadSession } = useUserSession();
const { redirectPostLogin } = useSafeRedirectToLogin(useRoute());

if (loggedIn.value) {
  console.log('Already logged in, sending back....');
  redirectPostLogin();
}

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
  loadSession();
  redirectPostLogin();
});
</script>

<template>
  <main class="w-full h-full">
    <div class="flex w-full items-center justify-center h-screen border">
      <div class="flex flex-col space-y-2 w-1/3 border border-zinc-300 p-12 rounded-xl">
        <div class="flex justify-center">
          <VFormInput class="text-center" label-class="text-xl !font-bold" label="Login">Login</VFormInput>
          <div class="ml-5 mr-5">|</div>
          <img src="/vidur-small.svg" class="h-8" />
        </div>
        <VFormInput
          label-class="text-sm text-gray-500 text-center"
          label="The only recruiting software you will ever need"
          id="random"
        />

        <VInputText class="w-full" placeholder="Email" v-model="email" :error="errors['email']" />

        <VInputText
          class="w-full"
          placeholder="Password"
          type-override="password"
          v-model="password"
          :error="errors['password']"
        />
        <VInputButton @click="submit">Login</VInputButton>
      </div>
    </div>
  </main>
</template>
