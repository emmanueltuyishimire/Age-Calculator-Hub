import type { Metadata } from 'next';
import { PT_Sans } from 'next/font/google';
import Script from 'next/script';
import { AppLayout } from '@/components/layout/app-layout';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-pt-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Age Calculators Hub – Online Age, Birthday, Biological & Pet Age Calculators',
    template: '%s – Age Calculator Hub',
  },
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
    <html lang="en" suppressHydrationWarning className={`${ptSans.variable}`}>
      <head />
      <body className="font-body antialiased">
        <AppLayout>{children}</AppLayout>
        <Toaster />
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3042243846300811"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
