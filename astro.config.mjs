// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://ohmyhf.com',
  // Optional path prefix for previews served under a subpath; the production
  // deploy on the ohmyhf.com custom domain serves from the root.
  base: process.env.BASE_PATH || '/',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
