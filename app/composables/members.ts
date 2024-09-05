import type { z } from 'zod';
import type {
  addMemberSchema,
  removeMemberSchema,
} from '~~/shared/schemas/setting';
import type { User } from '~~/server/db/schema';

type CreateMember = z.infer<typeof addMemberSchema>;
type RemoveMember = z.infer<typeof removeMemberSchema>;

export function useMembersState() {
  return useObjectState('settings-members');
}

export async function useMembersRepository() {
  return useObjectRepository<
    User[],
    never,
    never,
    never,
    CreateMember,
    never,
    RemoveMember
  >({
    key: 'settings-members',
    fetchURL: '/api/settings/members',
    postURL: '/api/settings/members',
    deleteURL: '/api/settings/members',
    initFn: () => [],
  });
}
