import type { Handle } from '~/types/handle-types';

export const getAllHandles = () => {
  return handles;
};

export const getHandle = (id: string) => {
  return handles.find((handle) => handle.id === id);
};

const handles: Handle[] = [
  {
    id: 'github',
    name: 'GitHub',
    description:
      'GitHub is a web-based handle for version control and collaboration in software development.',
    logo: '/assets/handles/gh-logo.png',
    icon: 'mdi:github',
    cover: '/assets/handles/gh-cover.jpeg',
    links: {
      site: 'https://github.com',
      linkedin: 'https://www.linkedin.com/company/github/',
      twitter: 'https://twitter.com/github',
    },
    verificationDto: 'oauth',
    preview: '',
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    description:
      'Stack Overflow empowers the world to develop technology through collective knowledge.',
    logo: '/assets/handles/stackoverflow-logo.png',
    icon: 'mdi:stackoverflow',
    cover: '/assets/handles/stackoverflow-cover.png',
    links: {
      site: 'https://stackoverflow.com',
      linkedin: 'https://www.linkedin.com/company/stack-overflow/',
      twitter: 'https://twitter.com/stackoverflow',
    },
    verificationDto: 'link',
    preview: 'https://stackoverflow.com/users/123456/dumbledore',
    helpText: [
      '- Go to your Stack Overflow profile',
      '- Make sure you have added SAME Github ID which is connected here.',
      '- If not, add it first.',
      '- Copy Profile URL & paste here.',
    ],
  },
  // {
  //   id: "leetcode",
  //   name: "LeetCode",
  //   description: "LeetCode is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.",
  //   logo: "/assets/handles/leetcode-logo.jpeg",
  //   cover: "/assets/handles/leetcode-cover.jpeg",
  //   links: {
  //     site: "https://leetcode.com",
  //     linkedin: "https://www.linkedin.com/company/leetcode/",
  //     twitter: "https://twitter.com/LeetCode",
  //   },
  //   verificationDto: 'username',
  //   preview: 'severus-snape'
  // },
  {
    id: 'dribble',
    name: 'Dribble',
    description:
      'Dribbble is the world’s leading community for creatives to share, grow, and get hired.',
    logo: '/assets/handles/dribble-logo.jpeg',
    icon: 'mdi:dribbble',
    cover: '/assets/handles/dribble-cover.jpeg',
    links: {
      site: 'https://dribbble.com',
      linkedin: 'https://www.linkedin.com/company/dribbble/',
      twitter: 'https://twitter.com/dribbble',
    },
    verificationDto: 'username',
    preview: 'arthur-weasley',
    helpText: [
      '- Go to your Dribble profile',
      '- Make sure you have added SAME Github ID which is connected here.',
      '- If not, add it first.',
      '- Copy Username & paste here.',
    ],
  },
  // {
  //   id: "codeforces",
  //   name: "Codeforces",
  //   description: "Codeforces is a website that hosts competitive programming contests. It is maintained by a group of competitive programmers.",
  //   logo: "/assets/handles/codeforces-logo.jpeg",
  //   cover: "/assets/handles/placeholder.jpeg",
  //   links: {
  //     site: "https://codeforces.com",
  //     linkedin: "https://www.linkedin.com/company/codeforces01/",
  //     twitter: "https://twitter.com/codeforces",
  //   },
  //   verificationDto: 'api-key-username',
  //   preview: '',
  // },
  {
    id: 'gitlab',
    name: 'Gitlab',
    description:
      'GitLab is a complete DevOps platform, delivered as a single application, fundamentally changing the way Development teams collaborate.',
    logo: '/assets/handles/gitlab-logo.jpeg',
    icon: 'mdi:gitlab',
    cover: '/assets/handles/gitlab-cover.jpeg',
    links: {
      site: 'https://gitlab.com',
      linkedin: 'https://www.linkedin.com/company/gitlab-com/',
      twitter: 'https://twitter.com/gitlab',
    },
    verificationDto: 'oauth',
    preview: '',
  },
  {
    id: 'kaggle',
    name: 'Kaggle',
    description:
      'Kaggle is the world’s largest data science community with powerful tools and resources to help you achieve your data science goals.',
    logo: '/assets/handles/kaggle-logo.jpeg',
    icon: 'cib:kaggle',
    cover: '/assets/handles/kaggle-cover.jpeg',
    links: {
      site: 'https://kaggle.com',
      linkedin: 'https://www.linkedin.com/company/kaggle/',
      twitter: 'https://twitter.com/kaggle',
    },
    verificationDto: 'username',
    preview: 'albus-dumbledore',
    helpText: [
      '- Go to your Kaggle profile',
      '- Make sure you have added SAME Github ID which is connected here.',
      '- If not, add it first.',
      '- Copy Username & paste here.',
    ],
  },
  {
    id: 'producthunt',
    name: 'Product Hunt',
    description:
      'Product Hunt is a curation of the best new products, every day.',
    logo: '/assets/handles/producthunt-logo.jpeg',
    icon: 'tabler:brand-producthunt',
    cover: '/assets/handles/producthunt-cover.jpeg',
    links: {
      site: 'https://www.producthunt.com',
      linkedin: 'https://www.linkedin.com/company/product-hunt/',
      twitter: 'https://twitter.com/producthunt',
    },
    verificationDto: 'username',
    preview: 'albus-dumbledore',
    helpText: [
      '- Go to your Product Hunt profile',
      '- Make sure you have added SAME Github ID which is connected here.',
      '- If not, add it first.',
      '- Copy Username & paste here.',
    ],
  },
  {
    id: 'devpost',
    name: 'Devpost',
    description:
      'Participate in online virtual and in-person hackathons to build products, practice skills and grow your network.',
    logo: '/assets/handles/devpost-logo.jpeg',
    icon: 'simple-icons:devpost',
    cover: '/assets/handles/devpost-cover.jpeg',
    links: {
      site: 'https://www.devpost.com',
      linkedin: 'https://br.linkedin.com/company/devpost/',
      twitter: 'https://twitter.com/devpost',
    },
    verificationDto: 'username',
    preview: 'albus-dumbledore',
    helpText: [
      '- Go to your Devpost profile',
      '- Make sure you have added SAME Github ID which is connected here.',
      '- If not, add it first.',
      '- Copy Username & paste here.',
    ],
  },
  {
    id: 'devto',
    name: 'DEV.to',
    description:
      'A constructive and inclusive social network for software developers. Open source and radically transparent.',
    logo: '/assets/handles/devto-logo.jpeg',
    icon: 'skill-icons:devto-light',
    cover: '/assets/handles/devto-cover.jpeg',
    links: {
      site: 'https://www.dev.to',
      linkedin: 'https://www.linkedin.com/showcase/dev-a-forem-community/',
      twitter: 'https://twitter.com/ThePracticalDev',
    },
    verificationDto: 'username',
    preview: 'albus-dumbledore',
    helpText: [
      '- Go to your Dev.to profile',
      '- Make sure you have added SAME Github ID which is connected here.',
      '- If not, add it first.',
      '- Copy Username & paste here.',
    ],
  },
  {
    id: 'hashnode',
    name: 'Hashnode',
    description:
      'The easiest way to start a blog on your personal domain 🌎 for free & connect with the readers through our dev community',
    logo: '/assets/handles/hashnode-logo.jpeg',
    icon: 'skill-icons:devto-light',
    cover: '/assets/handles/hashnode-cover.jpeg',
    links: {
      site: 'https://www.hashnode.com',
      linkedin: 'https://www.linkedin.com/company/hashnode',
      twitter: 'https://twitter.com/hashnode',
    },
    verificationDto: 'username',
    preview: 'albus-dumbledore',
    helpText: [
      '- Go to your Hashnode profile (NOT THE BLOG, PROFILE!)',
      '- Make sure you have added SAME Github ID which is connected here.',
      '- If not, add it first.',
      '- Copy Username & paste here.',
    ],
  },
];
