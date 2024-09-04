import type { z } from 'zod';
import type { addMemberSchema, removeMemberSchema } from '~/schemas/setting';
import type { User } from '~/server/db/schema';

type AddOrRemoveMember =
  | z.infer<typeof addMemberSchema>
  | z.infer<typeof removeMemberSchema>;

const useMembersState = () => useState<User[]>('settings-members', () => []);
const useMembersFetchedState = () =>
  useState<boolean>('settings-members-first-fetch', () => false);

export async function useMembers() {
  const members = useMembersState();
  const membersFetched = useMembersFetchedState();

  const membersApiCall = useFetch<User[]>('/api/settings/members', {
    immediate: false,
    default: () => [],
  });

  const setMembers = (m: User[]) => {
    members.value = [...m];
  };
  watch(membersApiCall.data, setMembers);

  if (!membersFetched.value) {
    await membersApiCall
      .execute()
      .then(() => setMembers(membersApiCall.data.value));
    membersFetched.value = true;
  }

  const refereshMembers = membersApiCall.refresh;

  const isSubmitting = ref(false);

  const makeAddOrRemoveMember =
    (method: 'POST' | 'DELETE') => async (body: AddOrRemoveMember) => {
      try {
        isSubmitting.value = true;
        await $fetch<User>('/api/settings/members', {
          method,
          body,
        });
        refereshMembers();
        return true;
      } catch (e) {
        console.error(e);
        return false;
      } finally {
        isSubmitting.value = false;
      }
    };
  const addMember = makeAddOrRemoveMember('POST');
  const removeMember = makeAddOrRemoveMember('DELETE');

  return {
    members,
    isSubmitting,

    addMember,
    removeMember,
  };
}
