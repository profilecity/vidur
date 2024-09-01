import type { Step } from "~/types/general";

const steps: Step[] = [
  {
    step: 1,
    title: 'Logo',
    icon: 'octicon:upload-16',
  },
  {
    step: 2,
    title: 'Career Site',
    icon: 'icon-park-outline:config',
  },
  {
    step: 3,
    title: 'Done!',
    icon: 'mingcute:celebrate-line',
  },
];

export function useOnboardingSteps() {
  const currentStep = ref(0);
  const goToNextStep = () => currentStep.value++;
  return { currentStep, goToNextStep, steps }
}

export function useOnboarding() {
  const key = ref("");
  const finishOnboarding = async () => {
    if (!key.value) return;
    await $fetch("/api/onboarding", {
      method: "POST",
      body: {
        key: key.value,
      }
    })
  }

  return { key, finishOnboarding };
}