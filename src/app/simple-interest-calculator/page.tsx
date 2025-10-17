
import SimpleInterestCalculator from '@/components/calculators/simple-interest-calculator';
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
    title: 'Simple Interest Calculator – Calculate I=PRT',
    description: 'A free Simple Interest Calculator to solve for interest, principal, rate, or term. See the formula, a balance accumulation graph, and a year-by-year schedule.',
    alternates: {
        canonical: '/simple-interest-calculator',
    },
};

const faqs = [
    {
        question: "What is the simple interest formula?",
        answer: "The simple interest formula is I = P * r * t, where I is the interest, P is the principal amount, r is the annual interest rate, and t is the term in years."
    },
    {
        question: "How is simple interest different from compound interest?",
        answer: "Simple interest is calculated only on the original principal amount. Compound interest is calculated on the principal amount plus the accumulated interest from previous periods, which allows it to grow much faster."
    },
    {
        question: "How do I use the different tabs on this calculator?",
        answer: "Click on the tab for the value you want to find (e.g., 'Balance', 'Principal', 'Rate', or 'Term'). The calculator will then allow you to input the other known values to solve for the missing one."
    },
    {
        question: "Is simple interest commonly used in real life?",
        answer: "While most savings accounts and loans use compound interest, simple interest is often used for short-term loans, like car title loans or some personal loans."
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

export default function SimpleInterestCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Simple Interest Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Calculate simple interest based on the I=PRT formula. Use the tabs to solve for the end balance, principal, interest rate, or term.
                </p>
            </div>

            <SimpleInterestCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Understanding Simple Interest</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           Simple interest is a straightforward method for calculating the interest charge on a loan or investment. Unlike <Link href="/compound-interest-calculator" className="text-primary hover:underline">compound interest</Link>, it is calculated only on the original principal amount. The amount of interest earned is the same for every period of the term.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Interest</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/the-power-of-compound-interest" className="text-primary hover:underline">The Power of Compound Interest</Link></li>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/simple-interest-calculator" />
      </div>
    </div>
  );
}
