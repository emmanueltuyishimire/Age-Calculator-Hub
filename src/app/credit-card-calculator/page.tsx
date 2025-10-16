
import CreditCardCalculator from '@/components/calculators/credit-card-calculator';
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
    title: 'Credit Card Payoff Calculator – Time or Payment Amount',
    description: 'Use our free Credit Card Calculator to find how long it will take to pay off your balance, or the payment needed to be debt-free by a specific date. See total interest paid.',
    alternates: {
        canonical: '/credit-card-calculator',
    },
};

const faqs = [
    {
        question: "How long will it take to pay off my credit card?",
        answer: "Use the 'Pay Off Over Time' tab. Enter your balance, APR, and what you plan to pay each month. The calculator will show you the exact number of months and the total interest you'll pay."
    },
    {
        question: "What monthly payment do I need to be debt-free by a certain date?",
        answer: "Use the 'Pay Off By Date' tab. Enter your balance, APR, and your desired payoff date. The calculator will determine the fixed monthly payment required to meet your goal."
    },
    {
        question: "What is APR (Annual Percentage Rate)?",
        answer: "APR is the yearly interest rate charged on your credit card balance. It's used to calculate the interest you owe on any balance you carry from one month to the next."
    },
    {
        question: "What if I have multiple credit cards?",
        answer: "This calculator is designed for analyzing a single card. For a comprehensive strategy to pay off multiple cards, use our <a href='/credit-card-payoff-calculator' class='text-primary hover:underline'>Credit Card Payoff Calculator (Multiple Cards)</a>, which uses the Debt Avalanche method."
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

export default function CreditCardCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Credit Card Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    This calculator helps find the time it will take to pay off a balance or the amount necessary to pay it off within a certain time frame.
                </p>
            </div>

            <CreditCardCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>What is a Credit Card?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            A credit card is a small plastic card issued by a bank, business, or other organization, allowing the holder to make purchases or withdrawals on credit, which is a form of unsecured loan from the issuer. There is a maximum amount of credit that a card can provide, called a credit limit, which should not be surpassed. At the end of the month, the credit card holder can choose to repay the entire amount or leave an unpaid balance that is subject to interest until it is paid off.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Debt Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>For multiple cards, use the <Link href="/credit-card-payoff-calculator" className="text-primary hover:underline">Credit Card Payoff Calculator (Multiple Cards)</Link>.</li>
                            <li><Link href="/articles/debt-snowball-vs-avalanche" className="text-primary hover:underline">Debt Snowball vs. Avalanche: Which Method is Best?</Link></li>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/credit-card-calculator" />
      </div>
    </div>
  );
}
