import type { BasicProfile } from '~/types/profile-types';
import {
  userHandlesTable,
  usersTable,
  type User,
  type UserHandle,
} from '../db/schema';
import { eq } from 'drizzle-orm';
import type { H3Event } from 'h3';
import { getToken } from './jwt';

export type OnboardingStatus = { onboardingURL: string | null };

export async function getUserOnboardStatus(
  event: H3Event,
): Promise<OnboardingStatus> {
  const config = useRuntimeConfig();
  const accessToken = await getToken(event);

  const res = await $fetch<OnboardingStatus>(
    config.public.serverBaseURL + '/user/onboard',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return res;
}

export async function getOrCreateUser(
  verifiedDetails: { email: string },
  credentials: Credentials,
): Promise<User> {
  if (IS_DEV) {
    console.log('getOrCreateUser called');
  }
  const db = await useDatabase();
  const config = useRuntimeConfig();

  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, verifiedDetails.email));

  if (result && result.length > 0) {
    return result[0];
  }

  let userBasicProfile: BasicProfile | null = null;
  try {
    if (IS_DEV) {
      console.log('Calling userBasicProfile');
    }
    userBasicProfile = await $fetch<BasicProfile>(config.basicInfoEndpoint, {
      headers: {
        Accept: 'application/json',
        Authorization: `${credentials.tokenType} ${credentials.token}`,
      },
    });

    if (IS_DEV) {
      console.log(userBasicProfile);
    }
  } catch (e: any) {
    console.error('Error fetching `basic-profile`', e);
  }

  if (userBasicProfile == null) {
    throw createError({
      statusCode: 400,
      message:
        "Bad Request: Insufficient privilages to fetch user's information",
    });
  }

  const user = await db.transaction(async (tx) => {
    const top5SkillsCSV = userBasicProfile.resume?.top5Skills
      ?.map((s) => s.trim())
      .join(',');

    const user = (
      await tx
        .insert(usersTable)
        .values({
          id: userBasicProfile.id,
          ...userBasicProfile.profile,
          top5SkillsCSV,
        })
        .returning()
    )[0];

    const handles: UserHandle[] = Object.keys(userBasicProfile.handles).map(
      (key) => {
        return {
          key,
          value: userBasicProfile.handles[key],
          userId: user.id,
        };
      },
    );

    await tx.insert(userHandlesTable).values(handles);

    return user;
  });

  return user;
}
