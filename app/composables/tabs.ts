import type { Tab } from '~~/shared/types/general';

const integrationTabs = [
  {
    id: 'hooks',
    title: 'Hooks',
    description:
      'Use hooks to send events to other services. Authenticate via JWKs-RSA key from documentation.',
    icon: 'ph:link',
    url: '/admin/integrations?tab=hooks',
  },
  {
    id: 'plugins',
    title: 'Plugins',
    description:
      'Install plugins to extend functionality and build custom features.',
    icon: 'mingcute:plugin-2-line',
    url: '/admin/integrations?tab=plugins',
  },
];

const settingsTabs = [
  {
    id: 'career-site',
    title: 'Career Site',
    description: "Configure career site's home page.",
    icon: 'gg:website',
    url: '/admin/settings?tab=career-site',
  },
  {
    id: 'seo',
    title: 'SEO',
    description:
      'These settings help your website rank better and enable better device previews.',
    icon: 'codicon:settings',
    url: '/admin/settings?tab=seo',
  },
  {
    id: 'members',
    title: 'Members',
    description: 'Manage who can access the admin side of the application.',
    icon: 'fluent:people-20-regular',
    url: '/admin/settings?tab=members',
  },
];

export const definedTabs = {
  integration: integrationTabs,
  settings: settingsTabs,
};

export type TabGroup = keyof typeof definedTabs;

export function useTabGroup(tabGroup: TabGroup, defaultIndex: number = 0) {
  const tabs = definedTabs[tabGroup];
  if (!tabs || tabs.length == 0) {
    throw new Error('Atleast 1 tab is necessary for `useTabGroup`');
  }

  const route = useRoute();
  const activeTab = computed<Tab>(
    () =>
      (tabs.find((t) => t.id == route.query.tab) || tabs[defaultIndex]) as Tab
  );

  return { tabs, activeTab };
}
