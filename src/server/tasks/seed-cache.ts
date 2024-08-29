import { seedCache } from '../utils/tasks/seed-cache';

export default defineTask<boolean>({
  meta: {
    name: 'seed-cache',
    description: 'This task runs when Nitro server boots up. It initialises cache with default metadata',
  },
  run() {
    return seedCache();
  },
});
