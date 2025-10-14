
import type { Metadata } from 'next';
import { PT_Sans } from 'next/font/google';
import Script from 'next/script';
import { AppLayout } from '@/components/layout/app-layout';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/layout/theme-provider';
import './globals.css';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-pt-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Age Calculator Hub – Online Age, Birthday, Biological & Pet Age Calculators',
    template: '%s – Age Calculator Hub',
  },
  description:
    'Discover our free, accurate online age calculators. Calculate your chronological, biological, metabolic, gestational, birthday, retirement, and pet ages instantly. Easy-to-use tools for every age-related calculation.',
  robots: {
    index: true,
    follow: true,
  },
   alternates: {
    canonical: 'https://age-calculator-hub.com',
  },
  openGraph: {
    title: 'Age Calculator Hub – Online Age, Birthday, Biological & Pet Age Calculators',
    description: 'Discover our free, accurate online age calculators. Calculate your chronological, biological, metabolic, gestational, birthday, retirement, and pet ages instantly. Easy-to-use tools for every age-related calculation.',
    type: 'website',
    url: 'https://age-calculator-hub.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Age Calculator Hub – Online Age, Birthday, Biological & Pet Age Calculators',
    description: 'Discover our free, accurate online age calculators. Calculate your chronological, biological, metabolic, gestational, birthday, retirement, and pet ages instantly. Easy-to-use tools for every age-related calculation.',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${ptSans.variable}`}>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7XVG2YF7MY"
        />
        <Script id="gtag-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7XVG2YF7MY');
          `}
        </Script>
        {/* 
          IMPORTANT: Replace the placeholder ca-pub ID with your own Google AdSense Publisher ID 
          for ads to work correctly.
        */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3042243846300811"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
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
