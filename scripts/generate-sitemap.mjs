import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const publicDir = resolve(root, 'public');
const sitemapPath = resolve(publicDir, 'sitemap.xml');
const siteUrl = 'https://iead-jardim-todos-os-santos.online';
const today = new Date().toISOString().slice(0, 10);

const routes = [
  '/',
  '/agenda',
  '/contato',
  '/contribuicao',
  '/ministerios',
  '/liderancas',
  '/historia',
  '/missao',
  '/reforma',
  '/igreja-evangelica-em-senador-canedo',
  '/assembleia-de-deus-em-senador-canedo',
  '/horarios-de-culto-em-senador-canedo',
  '/congresso-umadmego-senador-canedo',
  '/atualizacoes'
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route === '/' ? '' : route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(sitemapPath, xml, 'utf8');
console.log(`Sitemap gerado em: ${sitemapPath}`);
