// Cloudflare Worker: iCloud CalDAV CORS Proxy for CalSmash
// Deploy this to your Cloudflare account for full private iCloud support.
//
// How to deploy:
// 1. Go to https://dash.cloudflare.com → Workers & Pages → Create
// 2. Paste this code and deploy.
// 3. Copy the worker URL (e.g. https://calsmash-icloud.yourname.workers.dev)
// 4. Set ICLOUD_PROXY_URL in index.html to that URL (no trailing slash).
//
// Security: the app-specific password is sent through this worker. Deploy your own.

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PROPFIND, REPORT, OPTIONS',
          'Access-Control-Allow-Headers': 'Authorization, Content-Type, Depth, Prefer',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    const url = new URL(request.url);
    const targetPath = url.pathname.replace(/^\/caldav/, '') || '/';
    const targetUrl = `https://caldav.icloud.com${targetPath}${url.search}`;

    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.set('User-Agent', 'CalSmash-Proxy/1.0');

    try {
      const upstream = await fetch(targetUrl, {
        method: request.method,
        headers,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      });

      const responseHeaders = new Headers(upstream.headers);
      responseHeaders.set('Access-Control-Allow-Origin', '*');
      responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PROPFIND, REPORT, OPTIONS');
      responseHeaders.set('Access-Control-Allow-Headers', 'Authorization, Content-Type, Depth, Prefer');
      responseHeaders.delete('content-security-policy');
      responseHeaders.delete('x-frame-options');

      return new Response(upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers: responseHeaders,
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  },
};
