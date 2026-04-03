/**
 * AsianBus Worker — Dynamic features + static asset fallback
 *
 * Routes:
 *   GET  /api/search?q=...   → JSON search results
 *   GET  /feed.xml | /rss.xml → RSS 2.0 feed
 *   GET  /latest              → 302 redirect to newest article
 *   GET  /links               → Instagram link-in-bio page
 *   POST /api/subscribe       → Newsletter signup (stub)
 *   POST /api/pageview         → Analytics beacon (stub)
 *   *    everything else      → static assets via env.ASSETS
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

/** Fetch and cache search-index.json from the static assets binding. */
let _indexCache = null;
async function getSearchIndex(env) {
  if (_indexCache) return _indexCache;
  const res = await env.ASSETS.fetch(new Request('https://dummy/search-index.json'));
  if (!res.ok) return [];
  _indexCache = await res.json();
  return _indexCache;
}

/**
 * Extract the numeric id from an article filename (e.g. "article105.html" → 105).
 * Returns 0 when no number is found.
 */
function articleNumber(file) {
  const m = file.match(/article(\d+)\.html/);
  return m ? parseInt(m[1], 10) : 0;
}

// ---------------------------------------------------------------------------
// Route handlers
// ---------------------------------------------------------------------------

/** 1. Search API — GET /api/search?q=... */
async function handleSearch(request, env) {
  const url = new URL(request.url);
  const query = (url.searchParams.get('q') || '').trim().toLowerCase();
  if (!query) return jsonResponse([]);

  const index = await getSearchIndex(env);
  const results = index
    .filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query),
    )
    .slice(0, 10)
    .map(({ title, file, category, image, excerpt }) => ({
      title,
      file,
      category,
      image,
      excerpt,
    }));

  return jsonResponse(results);
}

/** 2. RSS Feed — GET /feed.xml or /rss.xml */
async function handleRSS(env) {
  const index = await getSearchIndex(env);

  // Sort newest-first (highest article number)
  const sorted = [...index].sort((a, b) => articleNumber(b.file) - articleNumber(a.file));
  const items = sorted.slice(0, 20);

  const escapeXml = (s) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

  const rssItems = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>https://asianbus.com/${item.file}</link>
      <description>${escapeXml(item.excerpt)}</description>
      <category>${escapeXml(item.category)}</category>
    </item>`,
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>AsianBus News - K-Pop News &amp; Updates</title>
    <link>https://asianbus.com</link>
    <description>Latest K-Pop news, controversies, dating rumors, and more from AsianBus News.</description>
    <language>en-us</language>
${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}

/** 3. Latest redirect — GET /latest */
async function handleLatest(env) {
  const index = await getSearchIndex(env);
  const latest = index.reduce(
    (best, item) => (articleNumber(item.file) > articleNumber(best.file) ? item : best),
    index[0],
  );
  return Response.redirect(`https://asianbus.com/${latest.file}`, 302);
}

/** 4. Instagram link-in-bio page — GET /links */
async function handleLinks(env) {
  const index = await getSearchIndex(env);
  const recent = [...index]
    .sort((a, b) => articleNumber(b.file) - articleNumber(a.file))
    .slice(0, 5);

  const linkCards = recent
    .map(
      (item) => `
      <a class="link-card" href="https://asianbus.com/${item.file}">
        <span class="link-title">${item.title}</span>
        <span class="link-cat">${item.category}</span>
      </a>`,
    )
    .join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AsianBus — Links</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: 40px 16px;
      color: #fff;
    }
    .container {
      width: 100%;
      max-width: 420px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    .logo {
      font-size: 2rem;
      font-weight: 800;
      color: #E91E63;
      letter-spacing: -1px;
      margin-bottom: 4px;
    }
    .tagline {
      font-size: 0.85rem;
      color: rgba(255,255,255,0.6);
      margin-bottom: 12px;
    }
    .link-card {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 16px 20px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(233,30,99,0.3);
      border-radius: 12px;
      text-decoration: none;
      color: #fff;
      transition: all 0.2s ease;
    }
    .link-card:hover {
      background: rgba(233,30,99,0.15);
      border-color: #E91E63;
      transform: translateY(-2px);
    }
    .link-title {
      font-size: 0.95rem;
      font-weight: 600;
      line-height: 1.3;
    }
    .link-cat {
      font-size: 0.75rem;
      color: #E91E63;
      margin-top: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .home-link {
      display: inline-block;
      margin-top: 8px;
      padding: 12px 32px;
      background: #E91E63;
      color: #fff;
      border-radius: 24px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      transition: background 0.2s;
    }
    .home-link:hover { background: #c2185b; }
    .footer {
      margin-top: 24px;
      font-size: 0.75rem;
      color: rgba(255,255,255,0.35);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">🚌 AsianBus</div>
    <div class="tagline">K-Pop News &amp; Updates</div>
${linkCards}
    <a class="home-link" href="https://asianbus.com">Visit AsianBus →</a>
    <div class="footer">© AsianBus News</div>
  </div>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

/** 5. Newsletter signup — POST /api/subscribe */
async function handleSubscribe(request) {
  try {
    const { email } = await request.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ success: false, message: 'Invalid email address.' }, 400);
    }
    // TODO: persist to KV
    return jsonResponse({ success: true, message: 'Subscribed!' });
  } catch {
    return jsonResponse({ success: false, message: 'Invalid request body.' }, 400);
  }
}

/** 6. Analytics pageview — POST /api/pageview */
async function handlePageview(request) {
  // Accept the payload but don't store yet (KV later)
  try {
    await request.json(); // validate JSON
  } catch {
    // silently accept even malformed bodies
  }
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

// ---------------------------------------------------------------------------
// Main router
// ---------------------------------------------------------------------------

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // --- Dynamic routes ---
    if (path === '/api/search' && request.method === 'GET') {
      return handleSearch(request, env);
    }

    if ((path === '/feed.xml' || path === '/rss.xml') && request.method === 'GET') {
      return handleRSS(env);
    }

    if (path === '/latest' && request.method === 'GET') {
      return handleLatest(env);
    }

    if (path === '/links' && request.method === 'GET') {
      return handleLinks(env);
    }

    if (path === '/api/subscribe' && request.method === 'POST') {
      return handleSubscribe(request);
    }

    if (path === '/api/pageview' && request.method === 'POST') {
      return handlePageview(request);
    }

    // --- Fallback: serve static assets ---
    return env.ASSETS.fetch(request);
  },
};
