export type Handle = {
  id: string;
  name: string;
  description: string;
  logo: string;
  icon: string;
  cover: string;
  links: {
    site: string;
    linkedin: string;
    twitter: string;
  };
  helpText?: string[];
  verificationDto?: 'username' | 'link' | 'api-key-username' | 'oauth';
  ssoUrl?: string;
  preview: string;
};
