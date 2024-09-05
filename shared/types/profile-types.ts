export type Profile = {
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
};

export type BasicProfile = {
  id: string;
  profile: Omit<Profile, 'id'>;
  handles: Record<string, string>;
  resume: {
    top5Skills: string[];
  };
};
