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
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', zh: 'zh-CN' },
      },
    }),
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: { webp: { quality: 80 } },
    },
    layout: 'constrained',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
