
import SavingsCalculator from '@/components/calculators/savings-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Savings Calculator – Estimate Your Savings Growth',
    description: 'Use our free Savings Calculator to estimate the future value of your savings. Factor in initial deposits, periodic contributions with growth, interest rates, taxes, and inflation.',
    alternates: {
        canonical: '/savings-calculator',
    },
};

export default function SavingsCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Savings Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate the future balance and interest of your savings, considering factors like periodic contributions, taxes, and inflation.
                </p>
            </div>

            <SavingsCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                 <Card>
                    <CardHeader>
                        <CardTitle>About Savings Accounts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>
                            In the U.S., savings accounts are bank accounts mostly insured by the Federal Deposit Insurance Corporation (FDIC) with the ability to earn interest on deposited funds. While they are a safe way to store money, it's important to understand their characteristics. They have limitations on withdrawals and may require minimum balances.
                        </p>
                        <p>
                           A key benefit is their ability to earn interest, though these rates are often lower than other investment vehicles. Due to a federal limit of six outgoing transactions per month, savings accounts are best for funds not needed for daily expenses, such as emergency funds.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>General Savings Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <ul className="list-disc list-inside space-y-2">
                           <li><strong>Emergency Fund Rule:</strong> Have enough in savings to cover at least three to six months' worth of living expenses.</li>
                           <li><strong>10% Rule:</strong> Aim to set aside 10% of each paycheck to place into savings.</li>
                           <li><strong>50-30-20 Rule:</strong> Allocate 50% of income to necessities, 30% to wants, and 20% to savings and debt repayment.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Learn More About Savings & Investments</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/the-power-of-compound-interest" className="text-primary hover:underline">The Power of Compound Interest</Link></li>
                            <li><Link href="/articles/creating-a-budget-that-works" className="text-primary hover:underline">Creating a Budget That Works: The 50/30/20 Rule</Link></li>
                        </ul>
                    </CardContent>
                </Card>

            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/savings-calculator" />
      </div>
    </div>
  );
}

