
import IraCalculator from '@/components/calculators/ira-calculator';
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
    title: 'IRA Calculator – Traditional vs. Roth vs. Taxable Savings',
    description: 'Use our free IRA Calculator to compare the growth of Traditional, Roth, and regular taxable savings accounts. See after-tax balances, graphs, and an annual schedule to make an informed decision.',
    alternates: {
        canonical: '/ira-calculator',
    },
};

const faqs = [
    {
        question: "What is the main difference between a Traditional and Roth IRA?",
        answer: "The primary difference is when you pay taxes. With a Traditional IRA, you get a tax deduction on your contributions now and you pay taxes on withdrawals in retirement. With a Roth IRA, you contribute after-tax money, and your qualified withdrawals in retirement are tax-free."
    },
    {
        question: "Which IRA is better if my tax rate is higher now than in retirement?",
        answer: "If your tax rate is higher now, a Traditional IRA is often more advantageous because you get a tax deduction when your taxes are highest. This calculator helps visualize that exact scenario."
    },
    {
        question: "Which IRA is better if my tax rate will be higher in retirement?",
        answer: "If you expect to be in a higher tax bracket in retirement, a Roth IRA is usually better. You pay taxes now at your lower rate, and all your withdrawals in retirement are tax-free."
    },
    {
        question: "How does a regular taxable savings account compare?",
        answer: "A regular taxable account has no tax advantages. You contribute with after-tax money, and you also have to pay taxes on the investment gains (interest, dividends, capital gains) each year, which can slow down growth compared to an IRA."
    },
    {
        question: "Is this calculator a substitute for financial advice?",
        answer: "No. This tool is for informational and educational purposes only. It uses simplified assumptions and does not account for all tax laws or individual circumstances. You should consult with a qualified financial advisor for personalized advice."
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

export default function IraCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-5xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">IRA Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Compare the potential growth of Traditional IRAs, Roth IRAs, and regular taxable savings to see which account might be best for your retirement goals.
                </p>
            </div>

            <IraCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Retirement & Savings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/guide-to-retirement-accounts" className="text-primary hover:underline">A Beginner's Guide to Retirement Accounts: 401(k) vs. IRA</Link></li>
                            <li><Link href="/retirement-savings-goal-calculator" className="text-primary hover:underline">Retirement Savings Goal Calculator</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Understanding the Comparison</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">This calculator models three different scenarios based on your inputs to help you understand the long-term impact of taxes on your savings:</p>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Traditional IRA:</strong> Contributions are pre-tax, meaning they lower your taxable income today. The money grows tax-deferred, and you pay taxes on all withdrawals in retirement.</li>
                            <li><strong>Roth IRA:</strong> Contributions are made with after-tax money. The money grows completely tax-free, and qualified withdrawals in retirement are also tax-free.</li>
                            <li><strong>Regular Taxable Savings:</strong> Contributions are after-tax, and you also pay taxes on any investment gains (e.g., capital gains, dividends) each year. This annual "tax drag" can reduce the overall growth potential.</li>
                        </ol>
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
        <RelatedCalculators currentCategory="Financial" currentHref="/ira-calculator" />
      </div>
    </div>
  );
}
