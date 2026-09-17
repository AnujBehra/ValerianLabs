import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

function seoFiles(siteUrl) {
  const normalizedSiteUrl = siteUrl.replace(/\/$/, '');
  return {
    name: 'seo-files',
    writeBundle(options) {
      const outputDirectory = options.dir || resolve(process.cwd(), 'dist');
      mkdirSync(outputDirectory, { recursive: true });
      const paths = ['/', '/services', '/industries', '/about', '/contact', '/privacy', '/terms'];
      writeFileSync(
        resolve(outputDirectory, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${normalizedSiteUrl}${path}</loc></url>`).join('\n')}\n</urlset>\n`,
      );
      writeFileSync(resolve(outputDirectory, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${normalizedSiteUrl}/sitemap.xml\n`);

      const indexPath = resolve(outputDirectory, 'index.html');
      if (existsSync(indexPath)) {
        copyFileSync(indexPath, resolve(outputDirectory, '404.html'));
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const basePath = process.env.VITE_BASE_PATH
    ? `${process.env.VITE_BASE_PATH.replace(/\/$/, '')}/`
    : '/';
  return {
    base: basePath,
    plugins: [react(), seoFiles(env.VITE_SITE_URL || 'https://valerianlabs.publicvm.com')],
  };
});
