
import DebtPayoffCalculator from '@/components/calculators/debt-payoff-calculator';
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
    title: 'Debt Payoff Calculator – Avalanche Method',
    description: 'Use our free Debt Payoff Calculator to create a cost-efficient payment schedule for multiple debts using the Debt Avalanche method. See when you can be debt-free.',
    alternates: {
        canonical: '/debt-payoff-calculator',
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

export default function DebtPayoffCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Debt Payoff Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    The calculator below estimates the amount of time required to pay back one or more debts. Additionally, it gives users the most cost-efficient payoff sequence, with the option of adding extra payments. This calculator utilizes the debt avalanche method, considered the most cost-efficient payoff strategy from a financial perspective.
                </p>
            </div>

            <DebtPayoffCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                 <Card>
                    <CardHeader>
                        <CardTitle>Related Calculators</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/debt-consolidation-calculator" className="text-primary hover:underline">Debt Consolidation Calculator</Link></li>
                            <li><Link href="/payment-calculator" className="text-primary hover:underline">Payment Calculator</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>How to Pay Off Debts Early</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Most people like the feeling of being debt-free and, when possible, will pay off debts earlier. One common way to pay off loans more quickly is to make extra payments on top of the required minimum monthly payments. Borrowers can make one-time extra payments or pay additional amounts every month or year. Those extra payments will lower the principal amounts owed. They also move the payoff date forward and reduce the amount of interest paid over the life of the loan.</p>
                        <p>Once borrowers decide to pay off debts early, they may struggle to act. Achieving such a goal often takes firm financial discipline. Finding extra funds to pay off the debts usually involves actions such as creating a budget, cutting unnecessary spending, selling unwanted items, and changing one's lifestyle.</p>
                        <p>Borrowers should also use the right strategies to pay off their debts. Listed below are some of the most common techniques:</p>
                    </CardContent>
                </Card>
                
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Payoff Strategies</h2>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Debt Avalanche</AccordionTrigger>
                            <AccordionContent>This debt repayment method results in the lowest total interest cost. It prioritizes the repayment of debts with the highest interest rates while paying the minimum required amount for each other debt. This continues like an avalanche, where the highest interest rate debt tumbles down to the next highest interest rate debt until the borrower pays off every debt and the avalanche ends.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Debt Snowball</AccordionTrigger>
                            <AccordionContent>In contrast, this debt repayment method starts with the smallest debt first, regardless of the interest rate. As smaller debts get paid off, the borrower then directs payments toward the next smallest debt amount. This method often results in borrowers paying more interest than with the debt avalanche method. However, the resulting boost in confidence can provide a significant emotional stimulus.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Debt Consolidation</AccordionTrigger>
                            <AccordionContent>Debt consolidation involves taking out a single, larger loan, usually at a lower interest rate, to pay off all existing smaller debts. This can lower the monthly repayment amount and simplify the repayment process to a single payment.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/debt-payoff-calculator" />
      </div>
    </div>
  );
}
