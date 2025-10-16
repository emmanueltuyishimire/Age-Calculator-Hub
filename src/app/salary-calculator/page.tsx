
import SalaryCalculator from '@/components/calculators/salary-calculator';
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
    title: 'Salary & Take-Home Paycheck Calculator',
    description: 'Use our free Salary Calculator to estimate your take-home pay after federal, state, and FICA taxes. See a detailed breakdown of your paycheck based on your salary, pay frequency, and deductions.',
    alternates: {
        canonical: '/salary-calculator',
    },
};

const faqs = [
    {
        question: "How is my take-home pay calculated?",
        answer: "Your take-home pay (net pay) is your gross salary minus all deductions. This calculator estimates your federal income tax withholding, FICA taxes (Social Security & Medicare), and any state/local taxes, as well as pre-tax deductions like 401(k) and health insurance."
    },
    {
        question: "What is the difference between bi-weekly and semi-monthly pay?",
        answer: "Bi-weekly pay occurs every two weeks, resulting in 26 paychecks per year. Semi-monthly pay occurs twice a month (e.g., on the 15th and last day), resulting in 24 paychecks per year. The paychecks for semi-monthly pay are slightly larger, but you receive two fewer checks."
    },
    {
        question: "How do pre-tax deductions affect my paycheck?",
        answer: "Pre-tax deductions, like contributions to a 401(k) or health insurance premiums, are subtracted from your gross income *before* taxes are calculated. This lowers your taxable income, which in turn reduces the amount of tax you owe."
    },
    {
        question: "Is this calculator accurate for my state?",
        answer: "This calculator provides a good estimate for federal and FICA taxes. For state and local taxes, it applies a flat percentage rate that you provide. It does not account for complex state-specific deductions or credits, so the state tax portion is an approximation."
    },
    {
        question: "Does this replace the W-4 form?",
        answer: "No. This calculator is an estimation tool to help you understand your paycheck. It can help you make decisions when filling out your W-4, but it does not replace the official IRS form."
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

export default function SalaryCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Salary & Take-Home Paycheck Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate your actual paycheck amount after taxes and deductions. This tool helps you understand your net pay based on your salary, filing status, and pay frequency. For U.S. residents.
                </p>
            </div>

            <SalaryCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Your Pay & Taxes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/understanding-your-paycheck" className="text-primary hover:underline">Understanding Your Paycheck: A Guide to Deductions and Net Pay</Link></li>
                            <li>See how this impacts your annual tax return with our <Link href="/income-tax-calculator" className="text-primary hover:underline">Income Tax Calculator</Link>.</li>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/salary-calculator" />
      </div>
    </div>
  );
}
