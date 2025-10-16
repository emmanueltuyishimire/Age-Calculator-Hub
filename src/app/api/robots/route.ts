
export async function GET(request: Request) {
  const { protocol, host } = new URL(request.url);
  const baseUrl = `${protocol}//${host}`;

  const sitemapUrl = `${baseUrl}/sitemap.xml`;

  const content = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;
  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
