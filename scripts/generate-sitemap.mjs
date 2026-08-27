/**
 * Generates public/sitemap.xml.
 *
 * The site is a single-page portfolio: one indexable URL. Section links are
 * fragments (#about, #projects, ...) which are NOT separate URLs, so they are
 * deliberately excluded -- listing them would only add duplicates.
 *
 * Runs automatically via the `prebuild` npm script. Add entries to ROUTES if
 * real routes are introduced later.
 */

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const SITE = 'https://usmanfarhan.com'

/** Canonical, indexable routes only. */
const ROUTES = [{ path: '/', changefreq: 'monthly', priority: '1.0' }]

const lastmod = new Date().toISOString().slice(0, 10)

const urls = ROUTES.map(
  ({ path, changefreq, priority }) => `  <url>
    <loc>${SITE}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
writeFileSync(join(outDir, 'sitemap.xml'), xml)
console.log(`sitemap.xml: ${ROUTES.length} URL(s), lastmod ${lastmod}`)
