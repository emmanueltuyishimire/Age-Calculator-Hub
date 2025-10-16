
import AnnuityPayoutCalculator from '@/components/calculators/annuity-payout-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Annuity Payout Calculator – Fixed Payout or Fixed Length',
    description: 'Use our free Annuity Payout Calculator to determine how long your funds will last with a fixed payout, or the fixed payment amount you can receive for a set number of years.',
    alternates: {
        canonical: '/annuity-payout-calculator',
    },
};

export default function AnnuityPayoutCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Annuity Payout Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    This calculator helps you analyze the payout phase of an annuity, allowing you to solve for either the payout amount or the duration of the payments.
                </p>
            </div>

            <AnnuityPayoutCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                 <Card>
                    <CardHeader>
                        <CardTitle>Understanding the Payout Phase</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>During the payout (or distribution) phase, the capital you've accumulated in your annuity is paid back to you over time. This calculator helps you model two common scenarios:</p>
                        <ul className="list-disc list-inside space-y-2">
                          <li><strong>Fixed Length Payout:</strong> You know how long you want the payments to last (e.g., 20 years), and you want to calculate the fixed monthly or annual payment you can receive.</li>
                          <li><strong>Fixed Payment Payout:</strong> You know how much you want to receive each month or year (e.g., $5,000/month), and you want to calculate how long your annuity will last.</li>
                        </ul>
                    </CardContent>
                </Card>

            </section>
        </main>
        <RelatedCalculators currentCategory="Retirement & Social Security" currentHref="/annuity-payout-calculator" />
      </div>
    </div>
  );
}
