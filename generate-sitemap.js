import pkg from 'fs-extra';
const { writeFileSync, existsSync, readdirSync } = pkg;
import { create } from 'xmlbuilder2';
import { createClient } from '@supabase/supabase-js';
import { join } from 'path';
import dotenv from 'dotenv';

// Load .env variables manually for the script
dotenv.config();

async function generateSitemap() {
  const baseUrl = 'https://www.perozcorp.com';
  
  // Initialize Supabase (Ensure these match your .env file)
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  const staticPages = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/products', changefreq: 'weekly', priority: 0.9 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/contact', changefreq: 'monthly', priority: 0.8 },
    { url: '/login', changefreq: 'yearly', priority: 0.3 },
  ];

  let dynamicPages = [];

  // 1. Try to fetch from Supabase first
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: products, error } = await supabase
        .from('products')
        .select('slug, updated_at');
      
      if (!error && products) {
        dynamicPages = products.map(product => ({
          url: `/products/${product.slug}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: product.updated_at || new Date().toISOString(),
        }));
        console.log(`✅ Fetched ${dynamicPages.length} products from Supabase.`);
      }
    } catch (error) {
      console.warn('⚠️ Supabase connection failed, falling back to local files.');
    }
  }

  // 2. Fallback: Scan public/images/ folders (Based on your sitemap)
  const imageDirs = [
    'OKF',
    'cooking-essential-oils',
    'dates',
    'drink-desserts',
    'grains-sides',
    'pocas-products',
    'sauces-dips',
    'spices-seasonings',
    'tea',
  ];

  const fileBasedProducts = imageDirs.flatMap(dir => {
    const dirPath = join(process.cwd(), 'public', 'images', dir);
    if (!existsSync(dirPath)) return [];

    return readdirSync(dirPath)
      .filter(file => /\.(webp|jpeg|jpg|png)$/i.test(file))
      .map(file => {
        // Generate a URL-friendly slug from the filename
        const slug = file
          .replace(/\.[^/.]+$/, "") // Remove extension
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-'); // Replace spaces/special chars with hyphens

        return {
          url: `/products/${slug}`,
          changefreq: 'weekly',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        };
      });
  });

  // Combine and deduplicate
  const allPages = [...staticPages, ...dynamicPages, ...fileBasedProducts].filter(
    (page, index, self) => index === self.findIndex(p => p.url === page.url)
  );

  // Generate XML
  const xml = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' })
    .com('Generated for Peroz Corp - Alexandria, VA')

  allPages.forEach(page => {
    const urlNode = xml.ele('url');
    urlNode.ele('loc').txt(`${baseUrl}${page.url}`).up();
    urlNode.ele('lastmod').txt(page.lastmod || new Date().toISOString().split('T')[0]).up();
    urlNode.ele('changefreq').txt(page.changefreq).up();
    urlNode.ele('priority').txt(page.priority.toString()).up();
  });

  const sitemap = xml.end({ prettyPrint: true });
  
  // Write to public folder
  const outputPath = join(process.cwd(), 'public', 'sitemap.xml');
  writeFileSync(outputPath, sitemap);
  
  console.log(`🚀 Sitemap generated with ${allPages.length} pages at ${outputPath}`);
}

generateSitemap().catch(console.error);