export function useActiveTab(tabs: string[], defaultIndex: number = 0) {
  if (tabs.length == 0) {
    throw new Error('Atleast 1 tab is necessary for `useActiveTab`');
  }

  const route = useRoute();
  const defaultTab = tabs[defaultIndex];

  const activeTab = computed<string>(() => {
    const routeTab = route.query.tab as string;
    if (tabs.includes(routeTab)) {
      return routeTab;
    }
    return defaultTab;
  });

  return activeTab;
}
