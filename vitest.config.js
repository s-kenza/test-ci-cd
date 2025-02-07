import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Si tu souhaites utiliser des globals comme "describe", "it", etc.
    environment: 'jsdom', // Pour tester des composants React
  },
});