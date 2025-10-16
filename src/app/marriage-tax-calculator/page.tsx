
import MarriageTaxCalculator from '@/components/calculators/marriage-tax-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Marriage Tax Calculator – Estimate Your Marriage Bonus or Penalty',
    description: 'Use our free Marriage Tax Calculator to estimate the financial impact of filing a joint tax return versus filing as two single individuals. See your potential marriage tax bonus or penalty for 2025.',
    alternates: {
        canonical: '/marriage-tax-calculator',
    },
};

export default function MarriageTaxCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Marriage Tax Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate the financial impact of filing a joint tax return as a married couple versus filing separately as singles based on 2025 federal tax brackets.
                </p>
            </div>

            <MarriageTaxCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Taxes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/income-tax-calculator" className="text-primary hover:underline">Income Tax Calculator</Link></li>
                            <li><Link href="/take-home-pay-calculator" className="text-primary hover:underline">Take-Home-Paycheck Calculator</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>The Marriage Bonus vs. The Marriage Penalty</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>
                            Tax laws generally become more complicated after marriage, but marriage can present some opportunities to save additional money, particularly for those in single-income marriages or marriages in which there is a large difference between the income of the spouses.
                        </p>
                         <p>
                            Conversely, dual-income married couples, especially those with similar high incomes, can experience the "marriage penalty," paying more in taxes than they would as two single individuals. Our calculator helps you estimate where you might stand.
                        </p>
                    </CardContent>
                </Card>

            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/marriage-tax-calculator" />
      </div>
    </div>
  );
}
