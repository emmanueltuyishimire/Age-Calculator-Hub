
import type { Metadata } from 'next';
import Script from 'next/script';
import { PT_Sans } from 'next/font/google';
import { AppLayout } from '@/components/layout/app-layout';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/layout/theme-provider';
import './globals.css';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
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
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ptSans.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7XVG2YF7MY');
          `}
        </Script>
         <Script
          id="gtag-js"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-7XVG2YF7MY"
        />
         <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3042243846300811"
          crossOrigin="anonymous"
        ></script>
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
      </body>
    </html>
  );
}
