
import { Metadata } from 'next';
import AgeCalculator from '@/components/calculators/age-calculator';

export const metadata: Metadata = {
  title: 'Age Calculator – Calculate Your Age by Date of Birth Online',
  description:
    'Use our free age calculator to calculate your exact age by date of birth or by year. Online age calculator for birthday tracking, easy and instant.',
};

export default function AgeCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Age Calculator',
            applicationCategory: 'WebApplication',
            operatingSystem: 'All',
            description:
              'Free online age calculator to calculate your age by date of birth or by year.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Online Age Calculator – Calculate Your Age by Date of Birth
          </h1>
          <p className="text-muted-foreground">
            Our age calculator allows you to calculate your exact age by date of birth, by year, or by birthday. This online age calculator is easy to use and provides instant results for anyone looking to track their age accurately.
          </p>
        </div>
        <AgeCalculator />
      </div>
    </>
  );
}
