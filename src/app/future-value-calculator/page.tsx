
import FutureValueCalculator from '@/components/calculators/future-value-calculator';
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
    title: 'Future Value Calculator – FV of an Investment',
    description: 'Use our free Future Value (FV) Calculator to find the future value of an investment based on periodic deposits, starting amount, interest rate, and compounding frequency.',
    alternates: {
        canonical: '/future-value-calculator',
    },
};

const faqs = [
    {
        question: "What is future value (FV)?",
        answer: "Future value is the value of a current asset at a specified date in the future based on an assumed rate of growth. It helps you understand how much your money could be worth over time due to compound interest."
    },
    {
        question: "How is future value calculated?",
        answer: "The FV of a single sum is P(1+r)^n. For a series of payments (an annuity), the formula is more complex: PMT * [((1+r)^n - 1) / r]. Our calculator combines these to handle both a starting amount and periodic deposits."
    },
    {
        question: "What is the difference between PV and FV?",
        answer: "Present Value (PV) is the current worth of a future sum of money. Future Value (FV) is the value of a current sum of money at a future date. They are two sides of the same time value of money concept."
    },
    {
        question: "What does 'PMT made at the end/beginning' mean?",
        answer: "This determines when your periodic deposits are made. 'End' (ordinary annuity) is standard for loans. 'Beginning' (annuity due) is common for savings plans where you deposit money at the start of each month or year, and it results in slightly more interest earned."
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

export default function FutureValueCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Future Value Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Calculate the future value (FV) of an investment with given inputs of compounding periods (N), interest rate (I/Y), starting amount, and periodic deposits (PMT).
                </p>
            </div>

            <FutureValueCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Future Value Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Number of Periods (N):</strong> Enter the total number of years for the investment.</li>
                            <li><strong>Starting Amount (PV):</strong> Input the initial amount of your investment.</li>
                            <li><strong>Interest Rate (I/Y):</strong> Provide the annual interest rate.</li>
                            <li><strong>Periodic Deposit (PMT):</strong> Enter the amount you will deposit each period (e.g., annually).</li>
                            <li><strong>Settings:</strong> Use the '+ Settings' button to adjust the compounding frequency and when payments are made (start or end of the period).</li>
                            <li><strong>Click “Calculate”:</strong> Get an instant breakdown of the future value, total deposits, and total interest earned.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Understanding Future Value</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Future value, or FV, is what money is expected to be worth in the future. Typically, cash in a savings account or a hold in a bond purchase earns compound interest and so has a different value in the future.</p>
                        <p>A good example of this kind of calculation is a savings account because the future value of it tells how much will be in the account at a given point in the future. It is possible to use the calculator to learn this concept. Input $10 (PV) at 6% (I/Y) for 1 year (N). We can ignore PMT for simplicity's sake. Pressing calculate will result in an FV of $10.60. This means that $10 in a savings account today will be worth $10.60 one year later.</p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>The Time Value of Money</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                         <p>FV (along with PV, I/Y, N, and PMT) is an important element in the time value of money, which forms the backbone of finance. There can be no such things as mortgages, auto loans, or credit cards without FV.</p>
                         <p>To learn more about or do calculations on present value instead, feel free to pop on over to our Present Value Calculator (coming soon). For a brief, educational introduction to finance and the time value of money, please visit our <Link href="/finance-calculator" className="text-primary hover:underline">Finance Calculator</Link>.</p>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/future-value-calculator" />
      </div>
    </div>
  );
}
