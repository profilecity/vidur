import type { GeneralSettings } from '~/schemas/setting';

export function usePublicGeneralSettings() {
  const generalSettings = useState<GeneralSettings>('public-general-settings');
  const updateGeneralSettings = (gs: GeneralSettings) => {
    generalSettings.value = gs;
  };
  return { generalSettings, updateGeneralSettings };
}

export function usePublicOrganizationSettings() {
  const { generalSettings } = usePublicGeneralSettings();
  return computed(() => generalSettings.value.organization);
}

export function usePublicSeoSettings() {
  const { generalSettings } = usePublicGeneralSettings();
  return computed(() => generalSettings.value.seo);
}
