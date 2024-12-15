export type User = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  picture: string | null;
  email: string;
  isAdmin: boolean;
};

export type UserRole = 'admin' | 'user';

export type Session = {
  user: User;
  role: UserRole;
};
