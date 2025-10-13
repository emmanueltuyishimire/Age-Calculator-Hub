
import BirthdayAgeCalculator from '@/components/calculators/birthday-age-calculator';
import { type Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Birthday Age Calculator - Countdown to Your Next Birthday',
    description: 'Use the Birthday Age Calculator to find out exactly how old you are and see a live countdown to your next birthday. Perfect for birthday celebrations!',
    openGraph: {
        title: 'Birthday Age Calculator - Countdown to Your Next Birthday',
        description: 'Use the Birthday Age Calculator to find out exactly how old you are and see a live countdown to your next birthday. Perfect for birthday celebrations!',
        type: 'website',
        url: '/birthday-age-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Birthday Age Calculator - Countdown to Your Next Birthday',
        description: 'Use the Birthday Age Calculator to find out exactly how old you are and see a live countdown to your next birthday. Perfect for birthday celebrations!',
    },
    alternates: {
        canonical: '/birthday-age-calculator',
    },
};


export default function BirthdayAgeCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Birthday Age Calculator</h1>
            <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Find out your exact age and count down to your next birthday in real-time.
            </p>
        </div>
        <BirthdayAgeCalculator />
    </div>
  );
}
