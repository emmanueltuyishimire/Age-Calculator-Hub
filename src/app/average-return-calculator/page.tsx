
import AverageReturnCalculator from '@/components/calculators/average-return-calculator';
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
    title: 'Average Return Calculator – IRR and Cumulative Investment Returns',
    description: 'A free, dual-function Average Return Calculator to find the money-weighted return (IRR) of an investment with cash flows, or to calculate the cumulative and average return of multiple investments.',
    alternates: {
        canonical: '/average-return-calculator',
    },
};

const faqs = [
    {
        question: "What is the difference between the two calculators on this page?",
        answer: "The 'Based on Cash Flow' calculator finds your personal rate of return (IRR or money-weighted return), which is affected by the timing of your deposits and withdrawals. The 'Average and Cumulative Return' calculator finds the geometric average of multiple separate returns, which is useful for comparing the performance of different investments."
    },
    {
        question: "What is IRR (Internal Rate of Return)?",
        answer: "IRR is the annualized rate of return for an investment that has multiple cash flows over time. It's the discount rate that makes the net present value of all cash flows (deposits, withdrawals, starting and ending balances) equal to zero. It's a precise measure of your personal investment performance."
    },
    {
        question: "What is a geometric average return?",
        answer: "A geometric average is used to calculate the average rate of return on an investment that is compounded over multiple periods. It gives a more accurate picture of the investment's true performance than a simple arithmetic average. Our second calculator uses this method."
    },
    {
        question: "Why are withdrawals negative in the cash flow calculator?",
        answer: "In investment tracking, cash flows are viewed from the perspective of the investment account. A deposit is money going 'in' (positive), and a withdrawal is money coming 'out' (negative)."
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

export default function AverageReturnCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Average Return Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    A suite of tools to calculate your investment returns, whether based on cash flows over time or from multiple separate investments.
                </p>
            </div>

            <AverageReturnCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Investing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/the-power-of-compound-interest" className="text-primary hover:underline">The Power of Compound Interest</Link></li>
                            <li><Link href="/investment-calculator" className="text-primary hover:underline">Investment Calculator</Link></li>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/average-return-calculator" />
      </div>
    </div>
  );
}
