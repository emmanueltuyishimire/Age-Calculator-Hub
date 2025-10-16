
import CompoundInterestCalculator from '@/components/calculators/compound-interest-calculator';
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
    title: 'Compound Interest Calculator – Future Value with Contributions',
    description: 'Use our free Compound Interest Calculator to see how your savings can grow. Calculate the future value of an investment with an initial principal and periodic contributions.',
    alternates: {
        canonical: '/compound-interest-calculator',
    },
};

const faqs = [
    {
        question: "What is the difference between simple and compound interest?",
        answer: "Simple interest is calculated only on the original principal amount. Compound interest is calculated on the principal plus the accumulated interest from previous periods, leading to exponential growth. Our calculator models compound interest."
    },
    {
        question: "How does the contribution timing (beginning vs. end) affect the result?",
        answer: "Making contributions at the beginning of each period gives your money slightly more time to compound, resulting in a higher ending balance compared to making contributions at the end."
    },
    {
        question: "What is the Rule of 72?",
        answer: "The Rule of 72 is a quick mental shortcut to estimate the number of years it takes to double your money. You divide 72 by the annual interest rate. For example, at an 8% interest rate, your money would double in approximately 9 years (72 / 8 = 9)."
    },
    {
        question: "How do taxes and inflation affect my savings?",
        answer: "Taxes on interest gains reduce your net return, slowing down growth. Inflation reduces the future purchasing power of your money. Our calculator includes optional fields for both to give you a more realistic picture of your investment's real value over time."
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
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Compound Interest Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Determine the future value of your savings or investments, including the impact of periodic contributions, taxes, and inflation.
                </p>
            </div>

            <CompoundInterestCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Investing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/the-power-of-compound-interest" className="text-primary hover:underline">The Power of Compound Interest: The '8th Wonder of the World'</Link></li>
                            <li><Link href="/investment-calculator" className="text-primary hover:underline">Investment Calculator</Link></li>
                             <li><Link href="/simple-interest-calculator" className="text-primary hover:underline">Simple Interest Calculator</Link></li>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/compound-interest-calculator" />
      </div>
    </div>
  );
}
