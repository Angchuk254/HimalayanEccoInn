# Deploy Himalayan Eco Inn (Static Hosting)

## Why prerendered? (Fixes "blank" for Google)

The site is **prerendered** at build time. Each page (home, rooms, about, etc.) is pre-built as full HTML. Google sees real content immediately—no blank page.

## Deploy steps

1. **Build:**
   ```bash
   npm run build:prod
   ```

2. **Upload** everything from:
   ```
   dist/Himalayan_Eco_Inn/browser/
   ```
   to your hosting `public_html` (or web root).

3. **Important:** Deploy the **browser** folder only. Do not deploy the `server` folder—that is for Node.js hosting.

## After deploy

- Submit sitemap in Google Search Console: `https://himalayanecoinn.com/sitemap.xml`
- Use "Request Indexing" for `/`, `/rooms`, `/about`, `/contact`
- Verify `https://himalayanecoinn.com/robots.txt` is reachable
