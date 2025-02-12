<script setup lang="ts">
useHead({
  title: 'Setup your career site',
});

const { steps, currentStep, goToNextStep } = useOnboardingSteps();
const { key, finishOnboarding } = useOnboarding();
const logoId = ref('');
const orgName = ref('');
const registrationNeeded = ref(true);

const step0Completed = (verifiedKey: string, registrationNeededRes: boolean) => {
  key.value = verifiedKey;
  registrationNeeded.value = registrationNeededRes;
  goToNextStep();
};

const step1Completed = () => {
  goToNextStep();
};

const step2Completed = (savedLogoId: string) => {
  logoId.value = savedLogoId;
  goToNextStep();
};

const settingUpCareerSite = ref(false);
const errorSettingUpCareerSite = ref(false);
const step3Completed = async (savedOrgName: string) => {
  orgName.value = savedOrgName;
  goToNextStep();
  try {
    settingUpCareerSite.value = true;
    await finishOnboarding();
  } catch (e) {
    console.error('Error setting up career site', e);
    errorSettingUpCareerSite.value = true;
  } finally {
    settingUpCareerSite.value = false;
  }
};
</script>

<template>
  <OnboardingKeyInput v-if="currentStep == 0" @done="step0Completed" />
  <main v-else>
    <div class="justify-center flex mt-12">
      <img src="/vidur-logo.svg" class="h-8" />
    </div>
    <h4 class="text-sm text-zinc-600 mt-2 mb-6 text-center">The only recruiting software you will ever need.</h4>
    <section class="w-full mt-12">
      <VInputStep class="mx-auto" :steps :step="currentStep" />
    </section>
    <section class="w-full mt-16 flex items-center">
      <OnboardingRegister
        class="w-1/3 mx-auto mt-12"
        :register="registrationNeeded"
        :onboarding-key="key"
        v-if="currentStep == 1"
        @done="step1Completed"
      />
      <OnboardingLogoUpload class="w-1/2 mx-auto" v-else-if="currentStep == 2" @done="step2Completed" />
      <OnboardingCareerSiteConfig
        class="w-1/2 mx-auto"
        :logo="logoId"
        v-else-if="currentStep == 3"
        @done="step3Completed"
      />
      <div class="w-1/2 mx-auto" v-else-if="currentStep == 4">
        <div class="text-center">
          <div class="text-2xl text-zinc-700 font-noto" v-if="settingUpCareerSite">
            Setting up the career site. <br />
            <Icon name="svg-spinners:blocks-shuffle-3" class="w-12 h-12 mt-10" />
          </div>
          <div v-else-if="!errorSettingUpCareerSite">
            <Icon name="line-md:circle-twotone-to-confirm-circle-twotone-transition" class="w-32 h-32" />
            <h1 class="text-2xl font-noto text-zinc-800 font-bold mb-8">Nice to have you, {{ orgName }}. 🙌</h1>
            <VInputButton as="a" href="/admin">Go to admin console</VInputButton>
          </div>
          <div class="text-2xl text-red-600 font-noto" v-else>
            Something went wrong!<br />There was an error setting up the career site.
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
