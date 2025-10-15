
import LoanPayoffCalculator from '@/components/calculators/loan-payoff-calculator';
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
    title: 'Loan Payoff Calculator – Find Your Debt-Free Date',
    description: 'Use our free Loan Payoff Calculator to find out when you’ll pay off your mortgage, car loan, or other debts. See your payoff date and the total interest you’ll pay.',
    alternates: {
        canonical: '/loan-payoff-calculator',
    },
};

const faqs = [
    {
        question: "How can I pay off my loan faster?",
        answer: "The best way to pay off a loan faster is to make extra payments. Even a small additional amount each month can significantly reduce your loan term and the total interest you pay. You can also try to refinance to a lower interest rate."
    },
    {
        question: "Does this calculator work for mortgages?",
        answer: "Yes, this calculator is perfect for mortgages, car loans, personal loans, or any other type of amortizing loan with a fixed interest rate."
    },
    {
        question: "What if my monthly payment is too low?",
        answer: "If your monthly payment doesn't cover the interest accrued each month, the loan balance will actually increase, and you will never pay it off. Our calculator will show an error if this is the case, signaling that you need to increase your payment."
    },
    {
        question: "How is the total interest calculated?",
        answer: "The total interest is calculated by multiplying your monthly payment by the number of months it takes to pay off the loan, and then subtracting the original loan principal. It shows you the true cost of borrowing the money."
    },
    {
        question: "Can I use this for variable-rate loans?",
        answer: "This calculator is designed for fixed-rate loans. For a variable-rate loan, the results would only be accurate as long as the interest rate remains the same. You would need to re-calculate if your rate changes."
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

export default function LoanPayoffCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Loan Payoff Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Find out exactly when you'll be debt-free. Enter your loan details to calculate your payoff date and see how much total interest you'll pay.
                </p>
            </div>

            <LoanPayoffCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Loan Payoff Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Loan Amount:</strong> Input the total amount you borrowed.</li>
                            <li><strong>Set Annual Interest Rate:</strong> Provide the annual percentage rate (APR) of your loan.</li>
                            <li><strong>Enter Monthly Payment:</strong> Input the amount you pay towards your loan each month.</li>
                            <li><strong>Click “Calculate Payoff”:</strong> Get an instant calculation of your loan payoff date and total interest paid.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>The Power of Extra Payments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">The single most effective way to shorten the life of your loan and save money on interest is to make extra payments. Even a small amount added to your monthly payment can have a huge impact over time.</p>
                        <ul className="space-y-3 mt-4">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Reduce the Principal Faster:</strong> Extra payments go directly towards reducing the loan principal, which means less interest accrues each month.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Save Thousands in Interest:</strong> Shaving years off your loan term can save you a significant amount of money that would have otherwise gone to interest.</span></li>
                             <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Experiment with the Calculator:</strong> Try increasing your monthly payment in the calculator to see how much faster you can become debt-free and how much interest you'll save.</span></li>
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
        <RelatedCalculators currentCategory="Financial Planning" currentHref="/loan-payoff-calculator" />
      </div>
    </div>
  );
}
