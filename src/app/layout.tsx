
import type { Metadata } from 'next';
import Script from 'next/script';
import { AppLayout } from '@/components/layout/app-layout';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/layout/theme-provider';
import './globals.css';
import { PT_Sans } from 'next/font/google';
import { Partytown } from '@builder.io/partytown/react';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://innerpeacejournals.com'),
  title: {
    default: 'Calculators – Free Online Financial, Health & Math Calculators',
    template: '%s',
  },
  description:
    'Your central hub for free, accurate online calculators. From financial and health tools to math and everyday conversions, find the calculator you need.',
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
   alternates: {
    canonical: 'https://innerpeacejournals.com',
  },
  openGraph: {
    title: 'Calculators – Free Online Financial, Health & Math Calculators',
    description: 'Your central hub for free, accurate online calculators. From financial and health tools to math and everyday conversions, find the calculator you need.',
    type: 'website',
    url: 'https://innerpeacejournals.com',
    siteName: 'Calculators',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Calculators Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculators – Free Online Financial, Health & Math Calculators',
    description: 'Your central hub for free, accurate online calculators. From financial and health tools to math and everyday conversions, find the calculator you need.',
    images: [
        {
          url: '/logo.png',
          width: 512,
          height: 512,
          alt: 'Calculators Logo',
        },
      ],
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Calculators",
    "url": "https://innerpeacejournals.com",
    "logo": "https://innerpeacejournals.com/logo.png"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={ptSans.variable}>
      <head>
        <Partytown debug={false} forward={['dataLayer.push']} />
        <Script 
            id="org-schema" 
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3042243846300811"
          crossOrigin="anonymous"
          type="text/partytown"
        ></Script>
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AppLayout>{children}</AppLayout>
          <Toaster />
        </ThemeProvider>
         <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7XVG2YF7MY"
          type="text/partytown"
        />
        <Script
          id="gtag-init"
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7XVG2YF7MY');
          `,
          }}
        />
      </body>
    </html>
  );
}
