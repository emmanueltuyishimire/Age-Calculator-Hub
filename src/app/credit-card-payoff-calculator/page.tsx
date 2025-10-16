
import CreditCardPayoffCalculator from '@/components/calculators/credit-card-payoff-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Credit Card Payoff Calculator (Multiple Cards)',
    description: 'Use our free Credit Card Payoff Calculator to create a cost-efficient payment schedule for multiple cards using the Debt Avalanche method. See when you can be debt-free.',
    alternates: {
        canonical: '/credit-card-payoff-calculator',
    },
};

const faqs = [
    {
        question: "What is the Debt Avalanche method?",
        answer: "The Debt Avalanche method is a debt-reduction strategy where you make minimum payments on all your debts, then use any extra money to pay off the debt with the highest interest rate first. This method saves you the most money on interest over time."
    },
    {
        question: "Is this calculator accurate?",
        answer: "This calculator provides a very good estimate based on the numbers you provide. However, it doesn't account for things like new purchases or changes in interest rates. It's a planning tool to show you a path to being debt-free."
    },
    {
        question: "What's the difference between Debt Avalanche and Debt Snowball?",
        answer: "Debt Avalanche focuses on paying off the highest-interest debt first to save money. Debt Snowball focuses on paying off the smallest balance first for a quick psychological win. Our <a href='/articles/debt-snowball-vs-avalanche' class='text-primary hover:underline'>article on payoff methods</a> explains this in detail."
    },
    {
        question: "What if my monthly budget is less than my total minimum payments?",
        answer: "If your budget is less than the sum of your minimum payments, you will not be able to make progress on your debt and the calculator will show an error. You must allocate at least enough to cover all minimums."
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

export default function CreditCardPayoffCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Credit Card Payoff Calculator (Multiple Cards)</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    This calculator creates a cost-efficient payback schedule for multiple credit cards using the **Debt Avalanche** method. See how quickly you can become debt-free.
                </p>
            </div>

            <CreditCardPayoffCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Debt Repayment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>For single card analysis, use the <Link href="/credit-card-calculator" className="text-primary hover:underline">Credit Card Calculator</Link>.</li>
                            <li><Link href="/articles/debt-snowball-vs-avalanche" className="text-primary hover:underline">Debt Snowball vs. Avalanche: Which Method is Best?</Link></li>
                            <li><Link href="/loan-payoff-calculator" className="text-primary hover:underline">Loan Payoff Calculator</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>How the Debt Avalanche Method Works</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">The Debt Avalanche strategy is mathematically the most efficient way to pay off debt. This calculator implements it for you by following these steps:</p>
                        <ul className="space-y-3">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Orders by Interest Rate:</strong> The calculator first sorts your credit cards from the highest interest rate to the lowest.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Calculates 'Extra' Payment:</strong> It subtracts the sum of all your minimum payments from your total monthly budget. This remaining amount is your 'avalanche' payment.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Targets High-Interest Debt:</strong> Each month, it applies the minimum payment to all cards, and directs the entire 'avalanche' payment to the card with the highest interest rate.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Creates a Snowball:</strong> Once the highest-interest card is paid off, its minimum payment is freed up and added to the 'avalanche' payment. This larger amount is then directed at the card with the next-highest interest rate, creating a snowball effect.</span></li>
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
                                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/credit-card-payoff-calculator" />
      </div>
    </div>
  );
}
