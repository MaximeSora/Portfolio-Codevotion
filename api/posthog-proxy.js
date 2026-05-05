module.exports = async (req, res) => {
  const { proxyPath, ...restQuery } = req.query || {};

  if (!proxyPath) return res.status(400).end('Missing proxy path');

  const queryString = new URLSearchParams(restQuery).toString();
  const targetUrl = `https://eu.i.posthog.com/${proxyPath}${queryString ? '?' + queryString : ''}`;

  try {
    const headers = {};
    if (req.headers['content-type']) headers['content-type'] = req.headers['content-type'];
    if (req.headers['user-agent']) headers['user-agent'] = req.headers['user-agent'];

    const body = req.method !== 'GET' && req.method !== 'HEAD'
      ? JSON.stringify(req.body)
      : undefined;

    const response = await fetch(targetUrl, { method: req.method, headers, body });

    const contentType = response.headers.get('content-type');
    if (contentType) res.setHeader('Content-Type', contentType);

    res.status(response.status).end(await response.text());
  } catch (err) {
    console.error('PostHog proxy error:', err);
    res.status(502).end('Bad gateway');
  }
};
