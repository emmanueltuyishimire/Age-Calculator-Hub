
import RoiCalculator from '@/components/calculators/roi-calculator';
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
    title: 'Return on Investment (ROI) Calculator',
    description: 'Use our free ROI Calculator to measure the profitability of an investment. Calculate both simple and annualized ROI to compare different investment opportunities.',
    alternates: {
        canonical: '/roi-calculator',
    },
};

const faqs = [
    {
        question: "What is ROI?",
        answer: "Return on Investment (ROI) is a performance measure used to evaluate the efficiency or profitability of an investment. It measures the amount of return on an investment relative to its cost. The formula is: ROI = (Net Profit / Cost of Investment) * 100."
    },
    {
        question: "What is the difference between simple ROI and annualized ROI?",
        answer: "Simple ROI gives you the total return over the entire life of the investment, but it doesn't account for how long you held it. Annualized ROI converts this into an average annual rate of return, making it much better for comparing investments with different time horizons."
    },
    {
        question: "Why is annualized ROI important?",
        answer: "A 20% ROI over one year is much better than a 20% ROI over ten years. Annualized ROI standardizes the return into a yearly figure, allowing for a true apples-to-apples comparison of investment performance."
    },
    {
        question: "Is this calculator suitable for complex cash flows?",
        answer: "No. This calculator is for investments with a single initial cost and a single final return amount. For investments with multiple cash flows (like deposits and withdrawals), you should use an Internal Rate of Return (IRR) calculation with our <a href='/rental-property-calculator' class='text-primary hover:underline'>Rental Property Calculator</a>."
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

export default function RoiCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Return on Investment (ROI) Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Calculate the simple and annualized Return on Investment (ROI) to evaluate the profitability of your investments.
                </p>
            </div>

            <RoiCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Investment Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/compound-interest-calculator" className="text-primary hover:underline">Compound Interest Calculator</Link></li>
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
                                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/roi-calculator" />
      </div>
    </div>
  );
}
