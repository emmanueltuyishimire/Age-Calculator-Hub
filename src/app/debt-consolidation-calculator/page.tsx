
import DebtConsolidationCalculator from '@/components/calculators/debt-consolidation-calculator';
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
    title: 'Debt Consolidation Calculator – Compare Your Loan Options',
    description: 'Use our free Debt Consolidation Calculator to compare your current debts with a new consolidation loan. See potential savings on monthly payments, total interest, and payoff time.',
    alternates: {
        canonical: '/debt-consolidation-calculator',
    },
};

const faqs = [
    {
        question: "What is debt consolidation?",
        answer: "Debt consolidation is the process of taking out a new, single loan to pay off multiple existing debts. The goal is often to get a lower interest rate, a single monthly payment, and a clear path to becoming debt-free."
    },
    {
        question: "How does this calculator work?",
        answer: "It calculates the total time and interest you'll pay on your current debts with your current payments. It then compares that to the total time and interest you'd pay with the new consolidation loan. This allows you to see if consolidation is financially beneficial."
    },
    {
        question: "What is APR (Annual Percentage Rate)?",
        answer: "APR is the total cost of borrowing money over a year, including the interest rate and any associated fees. Using APR provides a more accurate comparison between different loan options."
    },
    {
        question: "Is consolidating my debt always a good idea?",
        answer: "Not always. It's generally a good idea if you can get a new loan with a lower interest rate than the weighted average rate of your current debts. If the new rate is higher, or if the term is much longer, you could end up paying more in interest over time. This calculator helps you see that trade-off."
    },
    {
        question: "Does this calculator affect my credit score?",
        answer: "No. Using this calculator is for informational purposes only and does not involve any credit checks. Applying for a real consolidation loan, however, will involve a hard inquiry from the lender, which can temporarily lower your credit score."
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

export default function DebtConsolidationCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Debt Consolidation Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Compare your current debts to a consolidation loan to see if you can save money and pay off your debt faster.
                </p>
            </div>

            <DebtConsolidationCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Debt Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/debt-snowball-vs-avalanche" className="text-primary hover:underline">Debt Snowball vs. Avalanche: Which Method is Best?</Link></li>
                            <li><Link href="/credit-card-calculator" className="text-primary hover:underline">Credit Card Payoff Calculator</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>How Debt Consolidation Works</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">Debt consolidation can simplify your finances by rolling multiple high-interest debts (like credit cards) into a single loan, ideally with a lower interest rate. This calculator helps you analyze the financial impact by:</p>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li>Calculating the total interest and time it will take to pay off your existing debts with your current payments.</li>
                            <li>Calculating the total interest and time it will take to pay off the new consolidation loan.</li>
                            <li>Presenting a clear, side-by-side comparison of the monthly payments, total interest paid, and payoff dates for both scenarios.</li>
                        </ol>
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
        <RelatedCalculators currentCategory="Financial" currentHref="/debt-consolidation-calculator" />
      </div>
    </div>
  );
}
