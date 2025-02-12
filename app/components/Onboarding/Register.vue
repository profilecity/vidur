<script setup lang="ts">
import { registerSchema, loginSchema } from '~~/shared/schemas/authentication';

const props = defineProps<{
  register: boolean;
  onboardingKey: string;
}>();

const formSchema = toTypedSchema(props.register ? registerSchema : loginSchema);
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: formSchema,
});

const loginError = ref<string>();

// @ts-expect-error
const [firstName] = defineField('firstName');
// @ts-expect-error
const [lastName] = defineField('lastName');
const [email] = defineField('email');
const [password] = defineField('password');

const emits = defineEmits<{
  done: [];
}>();

const submit = handleSubmit(async (validatedData) => {
  try {
    await $fetch(`/api/${props.register ? 'register' : 'login'}`, {
      method: 'POST',
      body: validatedData,
      headers: {
        'x-onboarding-token': props.onboardingKey,
      },
    });
    emits('done');
  } catch (e: any) {
    if (e.data.statusCode === 401) {
      loginError.value = e.data.message;
    } else {
      loginError.value = 'Something went wrong.';
    }
  }
});
</script>

<template>
  <div class="flex flex-col space-y-2">
    <div class="flex flex-col justify-center">
      <VFormInput class="text-center" label-class="text-xl" label="Personal Details" v-if="register" />
      <VFormInput class="text-center" label-class="text-xl" label="Log back in" v-else />
      <VFormInput
        class="text-center"
        label-class="!text-zinc-500"
        label="Registering as super admin for this instance."
        v-if="register"
      />
      <VFormInput
        class="text-center"
        label-class="!text-zinc-500"
        label="Super admin already registered, log back in."
        v-else
      />
    </div>
    <div class="flex space-x-2 w-full" v-if="register">
      <!-- @vue-expect-error -->
      <VInputText class="w-1/2" placeholder="First Name" v-model="firstName" :error="errors['firstName']" />
      <!-- @vue-expect-error -->
      <VInputText class="w-1/2" placeholder="Last Name" v-model="lastName" :error="errors['lastName']" />
    </div>
    <VInputText class="w-full" placeholder="Email" v-model="email" :error="errors['email']" />

    <VInputText
      class="w-full"
      placeholder="Password"
      type-override="password"
      v-model="password"
      :error="errors['password']"
    />
    <VInputButton @click="submit">
      {{ register ? 'Save' : 'Continue' }}
    </VInputButton>
    <VFormInput :error="loginError" v-if="loginError" />
  </div>
</template>
