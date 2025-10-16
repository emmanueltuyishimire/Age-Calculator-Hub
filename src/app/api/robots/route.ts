
export async function GET(request: Request) {
  const sitemapUrl = `https://innerpeacejournals.com/sitemap.xml`;
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
