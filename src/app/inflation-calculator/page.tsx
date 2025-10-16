
import InflationCalculator from '@/components/calculators/inflation-calculator';
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
    title: 'Inflation Calculator – Historical & Future Value',
    description: 'Use our free Inflation Calculator to find the historical and future value of the U.S. dollar based on CPI data or a flat inflation rate. See how purchasing power changes over time.',
    alternates: {
        canonical: '/inflation-calculator',
    },
};

const faqs = [
    {
        question: "How does the CPI Inflation Calculator work?",
        answer: "It uses historical Consumer Price Index (CPI) data from the U.S. Bureau of Labor Statistics. It calculates the change in purchasing power by comparing the CPI value from the starting period to the ending period."
    },
    {
        question: "What is the difference between the forward and backward flat rate calculators?",
        answer: "The Forward calculator projects how much a certain amount of money will be worth in the future, given a steady inflation rate. The Backward calculator determines what a certain amount of money today would have been worth in the past."
    },
    {
        question: "What's a good average inflation rate to use for projections?",
        answer: "Historically, the average inflation rate in the U.S. has been around 3%. This is a common and reasonable assumption for long-term financial planning, but you can adjust it based on your own expectations."
    },
    {
        question: "How is inflation measured?",
        answer: "Inflation is typically measured by tracking the price changes of a 'basket' of common consumer goods and services over time. The most well-known measure in the U.S. is the Consumer Price Index (CPI)."
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

export default function InflationCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Inflation Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    A suite of tools to calculate the changing value of money over time using historical CPI data or theoretical inflation rates.
                </p>
            </div>

            <InflationCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Interest</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/interest-rate-calculator" className="text-primary hover:underline">Interest Rate Calculator</Link></li>
                            <li><Link href="/loan-calculator" className="text-primary hover:underline">Loan Calculator</Link></li>
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
                                    <p>{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/inflation-calculator" />
      </div>
    </div>
  );
}
