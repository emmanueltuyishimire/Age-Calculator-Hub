
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
import FutureValueCalculator from '@/components/calculators/future-value-calculator';

export const metadata: Metadata = {
    title: 'Compound Interest Calculator – Find Future Value',
    description: 'A free Compound Interest Calculator to find the future value of an investment with fixed principal and periodic contributions. Includes options for tax and inflation.',
    alternates: {
        canonical: '/compound-interest-calculator',
    },
};

const faqs = [
    {
        question: "What is the difference between simple and compound interest?",
        answer: "Simple interest is calculated only on the original principal amount. Compound interest is calculated on the principal plus the accumulated interest from previous periods, leading to exponential growth."
    },
    {
        question: "How does compounding frequency affect my investment?",
        answer: "The more frequently interest is compounded (e.g., monthly vs. annually), the more interest you will earn over time, because you start earning interest on your interest sooner."
    },
    {
        question: "What is the 'Contribute at' setting for?",
        answer: "This determines if your periodic deposits are made at the beginning or end of each period. Contributions made at the 'beginning' will have slightly more time to earn interest, resulting in a higher final balance."
    },
    {
        question: "How do taxes and inflation affect my end balance?",
        answer: "Taxes reduce your interest earned each year, slowing down growth. Inflation reduces the future 'buying power' of your money. This calculator can show you the real value of your investment after accounting for these factors."
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

export default function CompoundInterestCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-5xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Compound Interest Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    This calculator helps determine the final balance and compound interest on an investment with fixed principal and optional periodic contributions.
                </p>
            </div>

            <FutureValueCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                 <Card>
                    <CardHeader>
                        <CardTitle>What is Compound Interest?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           Interest is the cost of using borrowed money, or more specifically, the amount a lender receives for advancing money to a borrower. <Link href="/simple-interest-calculator" className="text-primary hover:underline">Simple interest</Link> is earned only on the principal, while compound interest is interest earned on both the principal and on the accumulated interest. Because lenders earn interest on interest, earnings compound over time like an exponentially growing snowball. Therefore, compound interest can financially reward lenders generously over time. The longer the interest compounds for any investment, the greater the growth.
                        </p>
                        <p className="text-muted-foreground mt-2">
                            To learn more, read our detailed <Link href="/articles/the-power-of-compound-interest" className="text-primary hover:underline">article on the power of compound interest</Link>.
                        </p>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/compound-interest-calculator" />
      </div>
    </div>
  );
}
