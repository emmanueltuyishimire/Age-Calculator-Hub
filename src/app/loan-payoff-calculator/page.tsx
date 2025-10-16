
import LoanPayoffCalculator from '@/components/calculators/loan-payoff-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Loan Payoff Calculator – See How Extra Payments Help',
    description: 'Use our free Loan Payoff Calculator to see how making extra payments can shorten your loan term and save you thousands in interest. Works for mortgages, auto loans, and more.',
    alternates: {
        canonical: '/loan-payoff-calculator',
    },
};

export default function LoanPayoffCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Loan Payoff Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                   See how making extra payments on your loan can help you become debt-free faster and save money on interest.
                </p>
            </div>

            <LoanPayoffCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                 <Card>
                    <CardHeader>
                        <CardTitle>The Power of Extra Payments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>
                           When you make your regular monthly payment on a loan, a large portion goes toward interest, especially in the early years. An extra payment, however, goes directly toward reducing your principal balance.
                        </p>
                        <p>
                           By reducing the principal, you reduce the amount of interest that accrues in the following months. This creates a snowball effect, accelerating your payoff date and significantly reducing the total amount of interest you pay over the life of the loan.
                        </p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Debt Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/how-to-pay-off-debt-faster" className="text-primary hover:underline">How to Pay Off Your Debt Faster</Link></li>
                            <li><Link href="/articles/debt-snowball-vs-avalanche" className="text-primary hover:underline">Debt Snowball vs. Avalanche: Which Method is Best?</Link></li>
                        </ul>
                    </CardContent>
                </Card>
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/loan-payoff-calculator" />
      </div>
    </div>
  );
}
