
import { NextResponse } from 'next/server';

const ADS_TXT_CONTENT = 'google.com, pub-3042243846300811, DIRECT, f08c47fec0942fa0';

export async function GET() {
  return new NextResponse(ADS_TXT_CONTENT, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, must-revalidate', // Cache for 24 hours
    },
  });
}

// Statically generate this route
export const dynamic = 'force-static';
