import type { z } from 'zod';
import type { createHookSchema, deleteHookSchema, updateHookSchema } from '~~/shared/schemas/hook';
import type { Hook } from '~~/server/db/schema';

type UpdateHook = z.infer<typeof updateHookSchema>;
type CreateHook = z.infer<typeof createHookSchema>;
type DeleteHook = z.infer<typeof deleteHookSchema>;

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
