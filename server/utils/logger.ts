import { createConsola } from 'consola';

const logger = createConsola({
  defaults: {
    tag: 'Vidur',
  },
  level: 3,
});

export default logger;
