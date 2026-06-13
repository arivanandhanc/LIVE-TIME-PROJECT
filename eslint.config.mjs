import coreWebVitals from 'eslint-config-next/core-web-vitals';

/** ESLint 9 flat config using Next.js' recommended rules. */
const config = [
  ...coreWebVitals,
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'public/sw.js', 'scripts/**'],
  },
  {
    rules: {
      // Initialising client-only state from localStorage after mount (to avoid
      // hydration mismatches) is a legitimate use of setState in an effect here.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];

export default config;
