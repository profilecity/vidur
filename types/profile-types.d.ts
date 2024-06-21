import type { OnboardingStatus } from "~/server/utils/user";

export type Profile =  {
  id: string;
  firstName: string | null;
  lastName: string | null;
  picture: string | null;
  email: string;
  top5SkillsCSV: string | null;
  isAdmin: boolean;
};

export type Session = {
  profile: Profile;
}

export type BasicProfile = {
  id: string;
  profile: Omit<Profile, 'id'>,
  handles: Record<string, string>,
  resume: {
    top5Skills: string[],
  }
}

export type CalculatedProfile = {
  id: string;
  rmId?: string;
  firstName: string;
  lastName: string;
  email: string;
  picture?: string;

  handles: Record<string, string>;

  refermateProfile?: {
    refermateId?: string;
    shortBio?: string;
    detailsUniversity?: string;
    detailsLocation?: string;
    detailsDesignation?: string;
    organizationLogo?: string;
  }

  calculatedTS: number;
}

export type SentRequest = {
  id: string;
  jdUrl: string;
  message: string;
  createdAt: string;
  status: number;
  referer: {
    id: string;
    organization: {
      logoURL: string;
      name: string;
    }
    user: {
      firstName: string;
      lastName: string;
      picture: string;
    }
  }
}