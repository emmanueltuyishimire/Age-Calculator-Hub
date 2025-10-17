
import MortgageCalculator from '@/components/calculators/mortgage-calculator';
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
    title: 'Mortgage Calculator – Estimate Your Monthly House Payment',
    description: 'Use our free Mortgage Calculator to estimate your monthly payment, including principal, interest, taxes, insurance (PITI), and other costs. View a full amortization schedule.',
    alternates: {
        canonical: '/mortgage-calculator',
    },
};

const faqs = [
    {
        question: "What is PITI?",
        answer: "PITI stands for Principal, Interest, Taxes, and Insurance. These are the four main components of a monthly mortgage payment. Our calculator helps you estimate all of them, plus other potential costs like HOA fees."
    },
    {
        question: "How much of a down payment do I need?",
        answer: "While 20% is the traditional recommendation to avoid Private Mortgage Insurance (PMI), many conventional loans allow for as little as 3-5% down. FHA loans can be even lower. A larger down payment reduces your loan amount and monthly payment."
    },
    {
        question: "What's the difference between interest rate and APR?",
        answer: "The interest rate is the cost of borrowing the money. The Annual Percentage Rate (APR) is a broader measure that includes the interest rate plus other costs like lender fees and points, giving you a more complete picture of the loan's cost."
    },
    {
        question: "How can I pay off my mortgage faster?",
        answer: "Making extra payments toward the principal is the most effective way. Even one extra payment per year can shave years off your loan. Our <a href='/loan-payoff-calculator' class='text-primary hover:underline'>Loan Payoff Calculator</a> can show you the impact."
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

export default function MortgageCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-5xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Mortgage Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate your monthly mortgage payment and see a breakdown of principal, interest, taxes, insurance, and other costs.
                </p>
            </div>

            <MortgageCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Mortgages & Financial Planning</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/understanding-your-credit-score" className="text-primary hover:underline">Understanding Your Credit Score: The 5 Key Factors</Link></li>
                            <li><Link href="/articles/how-to-pay-off-debt-faster" className="text-primary hover:underline">The Power of Extra Payments: How to Pay Off Your Loans Faster</Link></li>
                            <li><Link href="/articles/understanding-life-insurance" className="text-primary hover:underline">A Beginner's Guide to Life Insurance (Term vs. Whole)</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>What Is Amortization?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            Amortization is the process of spreading out a loan into a series of fixed payments over time. Each payment you make is split into two parts: interest and principal.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Interest:</strong> This is the fee you pay to the lender for borrowing the money. In the early years of a loan, the interest portion of your payment is highest.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Principal:</strong> This is the portion of your payment that goes directly to paying down your loan balance. As you pay down the loan, the interest portion of each payment decreases, and more money goes toward principal.</span></li>
                        </ul>
                        <p className="text-muted-foreground mt-4">This calculator provides a full amortization schedule, allowing you to see this process year-by-year and how your equity builds over time.</p>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/mortgage-calculator" />
      </div>
    </div>
  );
}
