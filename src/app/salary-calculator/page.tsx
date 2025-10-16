
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
    title: 'Salary Calculator – Convert Pay Between Frequencies',
    description: 'Use our free Salary Calculator to convert your pay between hourly, daily, weekly, monthly, and annual amounts. See adjusted figures that account for holidays and vacation time.',
    alternates: {
        canonical: '/salary-calculator',
    },
};

const faqs = [
    {
        question: "How do you calculate annual salary from hourly pay?",
        answer: "A common simple calculation is to multiply the hourly rate by 2080 (40 hours/week * 52 weeks/year). Our calculator refines this by also considering paid holidays and vacation days."
    },
    {
        question: "What is the difference between bi-weekly and semi-monthly pay?",
        answer: "Bi-weekly pay occurs every two weeks, resulting in 26 paychecks per year. Semi-monthly pay occurs twice a month (e.g., on the 15th and last day), resulting in 24 paychecks per year. The paychecks for semi-monthly pay are slightly larger."
    },
    {
        question: "Why are the 'adjusted' figures lower?",
        answer: "The adjusted figures account for paid time off (holidays and vacation). Because you are paid for these days without working, the number of actual working hours/days in the year decreases. This means your effective hourly and daily rate is higher for the time you are actually working."
    },
    {
        question: "What assumptions does this calculator make?",
        answer: "This calculator assumes a standard 52-week year. The 'Unadjusted' column does not account for any paid time off. The 'Adjusted' column factors in the holiday and vacation days you provide as paid, non-working days."
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
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Salary Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Convert your salary between hourly, weekly, monthly, and annual amounts, and see how holidays and vacation time affect your pay.
                </p>
            </div>

            <SalaryCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Your Pay</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/understanding-your-paycheck" className="text-primary hover:underline">Understanding Your Paycheck: A Guide to Deductions and Net Pay</Link></li>
                            <li>Estimate your paycheck after taxes with our <Link href="/take-home-pay-calculator" className="text-primary hover:underline">Take-Home Pay Calculator</Link>.</li>
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
