export function useTrix() {
  useHead({
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://unpkg.com/trix@2.0.8/dist/trix.css',
      },
    ],
    script: [
      {
        type: 'text/javascript',
        src: 'https://unpkg.com/trix@2.0.8/dist/trix.umd.min.js',
      },
    ],
  });

  const input = ref('');

  return { input };
}
