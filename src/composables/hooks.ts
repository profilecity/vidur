import type { z } from 'zod';
import type { createHookSchema, updateHookSchema } from '~/schemas/hook';
import type { Hook } from '~/server/db/schema';

type SaveOrUpdateInput = z.infer<typeof updateHookSchema> | z.infer<typeof createHookSchema>;

const useHooksState = () => useState<Hook[]>('integration-hooks', () => []);
const useHooksFetchedState = () => useState<boolean>('integration-hooks-first-fetch', () => false);

export async function useHooks() {
  const hooks = useHooksState();
  const hooksFetched = useHooksFetchedState();

  const hooksApiCall = useFetch<Hook[]>('/api/hooks', {
    immediate: false,
    default: () => [],
  });

  const setHooks = (h: Hook[]) => { hooks.value = [...h] };
  watch(hooksApiCall.data, setHooks);

  if (!hooksFetched.value) {
    await hooksApiCall.execute().then(() => setHooks(hooksApiCall.data.value));
    hooksFetched.value = true;
  }

  const refreshHooks = hooksApiCall.refresh;

  const isSubmitting = ref(false);

  const makeSaveOrUpdateHook = (method: 'POST' | 'PUT') => async (body: SaveOrUpdateInput) => {
    try {
      isSubmitting.value = true;
      await $fetch<Hook>('/api/hook', {
        method,
        body,
      });
      refreshHooks();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      isSubmitting.value = false;
    }
  };
  const saveHook = makeSaveOrUpdateHook('POST');
  const updateHook = makeSaveOrUpdateHook('PUT');

  const deleteHook = async (id: string) => {
    if (!isSubmitting) {
      throw new Error('cannot delete when updating');
    }
    try {
      isSubmitting.value = true;
      await $fetch<Hook>('/api/hook', {
        method: 'DELETE',
        query: {
          id,
        },
      });
      refreshHooks();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    hooks,
    isSubmitting,

    saveHook,
    updateHook,
    deleteHook,
  };
}
