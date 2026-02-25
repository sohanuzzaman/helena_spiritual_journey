// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  i18n: {
    locales: ['en', 'cs'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api/uilm': {
          target: 'https://api.seliseblocks.com',
          changeOrigin: true,
          rewrite: (path) => {
            const url = new URL(path, 'http://localhost');
            const language = url.searchParams.get('Language') || 'en-US';
            const moduleName = url.searchParams.get('ModuleName') || 'common';
            const projectKey = url.searchParams.get('ProjectKey') || 'P43335b928ba643959d9755c542239a1d';
            return `/uilm/v1/Key/GetUilmFile?Language=${encodeURIComponent(language)}&ModuleName=${encodeURIComponent(moduleName)}&ProjectKey=${encodeURIComponent(projectKey)}`;
          },
          headers: {
            'x-blocks-key': 'P43335b928ba643959d9755c542239a1d',
          },
        },
      },
    },
  },
});
