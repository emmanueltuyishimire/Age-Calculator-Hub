import type { Metadata } from 'next';
import { AppLayout } from '@/components/layout/app-layout';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'Free Age Calculator – Dog, Cat, Biological & Retirement Age',
  description:
    'Instantly calculate anything age-related with our free online tools. Find your chronological age, dog age, cat age, biological age, retirement eligibility, and pregnancy due date all in one place.',
  robots: {
    index: true,
    follow: true,
  },
   alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Free Age Calculator – Dog, Cat, Biological & Retirement Age',
    description: 'Instantly calculate anything age-related with our free online tools. Find your chronological age, dog age, cat age, biological age, retirement eligibility, and pregnancy due date all in one place.',
    type: 'website',
    url: 'https://innerpeacejournals.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Age Calculator – Dog, Cat, Biological & Retirement Age',
    description: 'Instantly calculate anything age-related with our free online tools. Find your chronological age, dog age, cat age, biological age, retirement eligibility, and pregnancy due date all in one place.',
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
