import type { z } from 'zod';
import type { createHookSchema, updateHookSchema } from '~~/shared/schemas/hook';
import type { Hook } from '~~/server/db/schema';

type UpdateHook = z.infer<typeof updateHookSchema>;
type CreateHook = z.infer<typeof createHookSchema>;
type DeleteHook = { id: string };

export function useHooksRepository() {
  return useObjectRepository<Hook[], never, any, UpdateHook, any, CreateHook, DeleteHook>({
    key: 'integration-hooks',
    fetchURL: '/api/hooks',
    postURL: '/api/hook',
    updateURL: '/api/hook',
    deleteURL: '/api/hook',
    initFn: () => [],
  });
}
