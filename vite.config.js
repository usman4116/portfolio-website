import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // The site is a single page with in-page hash anchors — it has no client
  // router, so it needs no catch-all rewrite. Vite's default SPA fallback
  // would answer every unknown path with index.html and a 200, which is a
  // soft 404: Google indexes junk URLs and reports "duplicate without
  // canonical". 'mpa' turns the fallback off so dev and preview 404 the way
  // Netlify does (netlify.toml deliberately defines no SPA redirect either).
  appType: 'mpa',
})
