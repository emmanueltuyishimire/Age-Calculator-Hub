
import FinanceCalculator from '@/components/calculators/finance-calculator';
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
    title: 'Finance Calculator – TVM, FV, PV, PMT, N, I/Y',
    description: 'A comprehensive time value of money (TVM) calculator to solve for future value (FV), present value (PV), payments (PMT), interest rate (I/Y), and number of periods (N).',
    alternates: {
        canonical: '/finance-calculator',
    },
};

const faqs = [
    {
        question: "What is the time value of money (TVM)?",
        answer: "The time value of money is the concept that a sum of money is worth more now than the same sum will be at a future date due to its potential earning capacity. This calculator helps you quantify that concept."
    },
    {
        question: "How does this calculator work?",
        answer: "It functions like a 5-key financial calculator (e.g., BA II Plus). You can solve for any one of the five main variables (N, I/Y, PV, PMT, FV) by providing the other four. Just click the tab for the value you want to find."
    },
    {
        question: "Why are Present Value (PV) and payments (PMT) often entered as negative numbers?",
        answer: "In financial calculations, we use cash flow conventions. Money you pay out (like an initial investment or regular payments) is typically entered as a negative number, while money you receive (like a loan amount or a future withdrawal) is positive. This calculator handles that logic for you."
    },
    {
        question: "What is the difference between 'End' and 'Beginning' mode for payments?",
        answer: "'End' mode (annuity) assumes payments are made at the end of each period, which is standard for loans. 'Beginning' mode (annuity due) assumes payments are made at the start of each period, common for lease payments or retirement contributions."
    },
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

export default function FinanceCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-5xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Finance Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    A powerful time value of money (TVM) calculator to solve for future value (FV), periodic payment (PMT), interest rate (I/Y), number of periods (N), and present value (PV).
                </p>
            </div>

            <FinanceCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Understanding the 5 Keys of TVM</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>N (Number of Periods):</strong> The total number of payments or compounding periods.</li>
                            <li><strong>I/Y (Interest Rate per Year):</strong> The annual interest rate.</li>
                            <li><strong>PV (Present Value):</strong> The value of an asset or cash flow today. For loans, it's the amount you borrow.</li>
                            <li><strong>PMT (Periodic Payment):</strong> The amount of each recurring payment in a series.</li>
                            <li><strong>FV (Future Value):</strong> The value of an asset or cash flow at a specified date in the future.</li>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/finance-calculator" />
      </div>
    </div>
  );
}
