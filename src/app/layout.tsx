import type { Metadata } from 'next';
import { AppLayout } from '@/components/layout/app-layout';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'Age Calculators Hub – Online Age, Birthday, Biological & Pet Age Calculators',
  description:
    'Discover our free, accurate online age calculators. Calculate your chronological, biological, metabolic, gestational, birthday, retirement, and pet ages instantly. Easy-to-use tools for every age-related calculation.',
  robots: {
    index: true,
    follow: true,
  },
   alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Age Calculators Hub – Online Age, Birthday, Biological & Pet Age Calculators',
    description: 'Discover our free, accurate online age calculators. Calculate your chronological, biological, metabolic, gestational, birthday, retirement, and pet ages instantly. Easy-to-use tools for every age-related calculation.',
    type: 'website',
    url: 'https://innerpeacejournals.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Age Calculators Hub – Online Age, Birthday, Biological & Pet Age Calculators',
    description: 'Discover our free, accurate online age calculators. Calculate your chronological, biological, metabolic, gestational, birthday, retirement, and pet ages instantly. Easy-to-use tools for every age-related calculation.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3042243846300811"
     crossOrigin="anonymous"></script>
      </head>
      <body className="font-body antialiased">
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
