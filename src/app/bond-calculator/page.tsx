
import BondCalculator from '@/components/calculators/bond-calculator';
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
    title: 'Bond Calculator – Price, Yield, and Accrued Interest',
    description: 'A comprehensive Bond Calculator to solve for price, yield, and other variables. Includes tools for calculating clean price, dirty price, and accrued interest for bonds traded between coupon dates.',
    alternates: {
        canonical: '/bond-calculator',
    },
};

const faqs = [
    {
        question: "What is the difference between clean price and dirty price?",
        answer: "The 'clean price' is the quoted market price of a bond, which does not include any accrued interest. The 'dirty price' (or full price) is what you actually pay; it includes the clean price plus any interest that has accrued since the last coupon payment."
    },
    {
        question: "What is accrued interest?",
        answer: "Accrued interest is the interest that a bond has earned since its last coupon payment but has not yet been paid to the bondholder. When a bond is sold between payment dates, the buyer pays this accrued interest to the seller."
    },
    {
        question: "What is yield to maturity (YTM)?",
        answer: "Yield to maturity is the total return an investor can expect to receive if they hold the bond until it matures. It takes into account the bond's current market price, par value, coupon interest rate, and time to maturity."
    },
    {
        question: "Why would a bond's price be different from its face value?",
        answer: "A bond's price changes based on market interest rates. If market rates are higher than the bond's coupon rate, the bond will sell at a discount (below face value). If market rates are lower, it will sell at a premium (above face value)."
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

export default function BondCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Bond Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                   A suite of tools to calculate a bond's price, yield, and other variables, including accrued interest for bonds traded between coupon dates.
                </p>
            </div>

            <BondCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Interest & Investments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/simple-interest-calculator" className="text-primary hover:underline">Simple Interest Calculator</Link></li>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/bond-calculator" />
      </div>
    </div>
  );
}
