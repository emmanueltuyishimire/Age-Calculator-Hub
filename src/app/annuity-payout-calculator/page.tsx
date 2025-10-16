
import AnnuityPayoutCalculator from '@/components/calculators/annuity-payout-calculator';
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
    title: 'Annuity Payout Calculator – Estimate Your Payout or Duration',
    description: 'Use our free Annuity Payout Calculator to estimate your monthly payout amount for a fixed period or calculate how long your annuity will last with fixed payments.',
    alternates: {
        canonical: '/annuity-payout-calculator',
    },
};

const faqs = [
    {
        question: "What is an annuity payout?",
        answer: "An annuity payout is a series of regular payments made to you from a lump-sum investment (your principal). This is often used for retirement income. This calculator helps you understand what those payouts might be or how long they might last."
    },
    {
        question: "What is the difference between 'Fixed Length' and 'Fixed Payment' mode?",
        answer: "'Fixed Length' mode calculates how much you can withdraw periodically if you want the annuity to last for a specific number of years. 'Fixed Payment' mode calculates how many years your annuity will last if you withdraw a fixed amount periodically."
    },
    {
        question: "How does the interest rate affect my payout?",
        answer: "A higher interest or return rate means your remaining principal will grow faster, which will result in either a higher payout amount over the same period or a longer payout duration for the same payment amount."
    },
    {
        question: "Is this calculator a substitute for financial advice?",
        answer: "No. This tool is for informational purposes only and provides a simplified estimate. Annuities can be complex financial products. You should always consult with a qualified financial advisor before making any investment decisions."
    }
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
};

export default function AnnuityPayoutCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Annuity Payout Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate your annuity payout amount for a fixed period or determine how long your annuity will last with fixed payments.
                </p>
            </div>

            <AnnuityPayoutCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Retirement & Investments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/retirement-savings-goal-calculator" className="text-primary hover:underline">Retirement Savings Goal Calculator</Link></li>
                            <li><Link href="/articles/the-power-of-compound-interest" className="text-primary hover:underline">The Power of Compound Interest</Link></li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Understanding Annuity Payouts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            An annuity payout phase, also known as the distribution or annuitization phase, is when you start receiving regular income from the funds you've accumulated in an annuity. This tool helps you model that phase.
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                            <li><strong>Fixed Length Calculation:</strong> Use this if you want to know how much you can withdraw each month to make your money last for a set number of years (e.g., a 20-year retirement).</li>
                            <li><strong>Fixed Payment Calculation:</strong> Use this if you know how much money you need each month and want to find out how long your principal will be able to provide that amount.</li>
                        </ul>
                    </CardContent>
                </Card>
                
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p>{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/annuity-payout-calculator" />
      </div>
    </div>
  );
}
