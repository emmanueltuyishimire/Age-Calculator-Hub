
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
    title: 'Compound Interest Calculator – Convert APR to APY & More',
    description: 'A free Compound Interest Calculator to compare or convert interest rates between different compounding periods (e.g., monthly, quarterly, annually).',
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
        question: "How does compounding frequency affect the interest rate?",
        answer: "The more frequently interest is compounded, the higher the effective annual rate (APY) will be for the same nominal rate (APR). For example, a 6% APR compounded monthly results in an APY of 6.17%."
    },
    {
        question: "What is the Rule of 72?",
        answer: "The Rule of 72 is a quick mental shortcut to estimate the number of years it takes to double your money. You divide 72 by the annual interest rate. For example, at an 8% interest rate, your money would double in approximately 9 years (72 / 8 = 9)."
    },
    {
        question: "What is the difference between APY and APR?",
        answer: "APR (Annual Percentage Rate) is the nominal yearly interest rate. APY (Annual Percentage Yield) is the effective yearly rate that includes the effect of compounding. This calculator helps you convert between them."
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
      <div className="max-w-xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Compound Interest Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    This Compound Interest Calculator can be used to compare or convert the interest rates of different compounding periods.
                </p>
            </div>

            <CompoundInterestCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>What is Compound Interest?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           Interest is the cost of using borrowed money. While simple interest is calculated only on the principal amount, compound interest is interest earned on both the principal and the accumulated interest. This "interest on interest" effect can lead to exponential growth over time. To learn more, read our detailed <Link href="/articles/the-power-of-compound-interest" className="text-primary hover:underline">article on compound interest</Link>.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Different Compounding Frequencies</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            The more frequently interest is compounded within a time period, the higher the interest will be earned on an original principal. The interest rates of savings accounts and Certificate of Deposits (CD) tend to compound annually. Mortgage loans, home equity loans, and credit card accounts usually compound monthly. For this reason, lenders often like to present interest rates compounded monthly instead of annually. For example, a 6% mortgage interest rate amounts to a monthly 0.5% interest rate. However, after compounding monthly, interest totals 6.17% compounded annually. Our compound interest calculator above accommodates the conversion between daily, bi-weekly, semi-monthly, monthly, quarterly, semi-annual, and annual compounding frequencies.
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
