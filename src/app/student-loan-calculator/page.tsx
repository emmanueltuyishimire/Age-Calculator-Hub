
import StudentLoanCalculator from '@/components/calculators/student-loan-calculator';
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
    title: 'Student Loan Calculator – Repayment, Payoff & Projection',
    description: 'A free, all-in-one Student Loan Calculator to estimate payments, analyze accelerated payoff options, and project future loan balances after graduation.',
    alternates: {
        canonical: '/student-loan-calculator',
    },
};

const faqs = [
    {
        question: "How is a student loan payment calculated?",
        answer: "It's calculated using an amortization formula based on the loan balance, interest rate, and repayment term. Our Simple Student Loan Calculator can find this for you if you provide the other three values."
    },
    {
        question: "How can I pay off my student loans faster?",
        answer: "Making extra payments is the most effective way. Even a small additional amount reduces the principal, which in turn reduces the total interest you pay over time. Our Repayment Calculator is designed to show you this exact impact."
    },
    {
        question: "What is a grace period?",
        answer: "A grace period is a set amount of time after you graduate or leave school before you have to start making payments. For federal loans, this is typically six months. Interest may still accrue during this time, which is what our Projection Calculator models."
    },
    {
        question: "Should I pay interest while in school?",
        answer: "If you have unsubsidized loans, interest will accrue while you're in school. Paying that interest as it accrues prevents it from being capitalized (added to your principal balance) when you enter repayment. This can save you a significant amount of money in the long run."
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

export default function StudentLoanCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Student Loan Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    A suite of tools to help you estimate your monthly payments, plan your payoff strategy, and project your future loan balance.
                </p>
            </div>

            <StudentLoanCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                 <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Managing Debt</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/how-to-pay-off-debt-faster" className="text-primary hover:underline">The Power of Extra Payments: How to Pay Off Your Loans Faster</Link></li>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/student-loan-calculator" />
      </div>
    </div>
  );
}

```