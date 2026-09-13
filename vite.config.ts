import { defineConfig } from 'vite';

// A GitHub Pages project site is served from /<repo>/, so every link and asset
// needs that prefix or it resolves against the domain root and 404s. The
// deploy workflow sets TB_BASE from the repository name.
export default defineConfig({
  base: process.env.TB_BASE ?? '/',
});
