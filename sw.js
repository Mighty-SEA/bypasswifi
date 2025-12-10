self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Proxy ke VPS
  if (url.pathname.startsWith('/proxy')) {
    event.respondWith(handleProxy(event.request));
  }
});

async function handleProxy(request) {
  const targetUrl = request.headers.get('X-Target-Url') || 'https://google.com';
  
  // Forward ke VPS
  const vpsResponse = await fetch(`http://194.233.69.249:8080${request.url}`, {
    method: request.method,
    headers: request.headers,
    body: request.body
  });
  
  return vpsResponse;
}
