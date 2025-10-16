
import DtiCalculator from '@/components/calculators/dti-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Debt-to-Income (DTI) Ratio Calculator',
    description: 'Use our free Debt-to-Income (DTI) Ratio Calculator to assess your financial health. Input your monthly income and debts to see where you stand with lenders.',
    alternates: {
        canonical: '/dti-calculator',
    },
};

const faqs = [
    {
        question: "What is a Debt-to-Income (DTI) ratio?",
        answer: "Your DTI ratio is the percentage of your gross monthly income that goes toward paying your monthly debt payments. Lenders use it as a key metric to measure your ability to manage monthly payments and repay debts."
    },
    {
        question: "How do you calculate DTI?",
        answer: "DTI is calculated by dividing your total monthly debt payments by your total gross monthly income, then multiplying by 100 to get a percentage. The formula is: DTI = (Total Monthly Debt / Gross Monthly Income) * 100."
    },
    {
        question: "What is a good DTI ratio?",
        answer: "A DTI of 36% or less is generally considered ideal. A ratio of 43% is typically the highest DTI a borrower can have and still get a qualified mortgage, though some lenders may go higher. A DTI over 50% is generally seen as a sign of financial stress."
    },
    {
        question: "What is included in the DTI calculation?",
        answer: "Debts include rent or mortgage payments, car loans, student loans, minimum credit card payments, child support, and other recurring loan payments. Income is your gross (pre-tax) monthly earnings from all sources."
    },
    {
        question: "How can I lower my DTI ratio?",
        answer: "You can lower your DTI by either reducing your monthly debt payments (by paying off loans) or increasing your gross monthly income. Refinancing to a lower monthly payment can also help, but be mindful of extending the loan term."
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

export default function DtiCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Debt-to-Income (DTI) Ratio Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Understand your financial health from a lender's perspective. Calculate your DTI ratio to see how your income compares to your debts.
                </p>
            </div>

            <DtiCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Budgeting & Affordability</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/house-affordability-calculator" className="text-primary hover:underline">House Affordability Calculator</Link></li>
                            <li><Link href="/articles/understanding-your-credit-score" className="text-primary hover:underline">Understanding Your Credit Score: The 5 Key Factors</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Understanding Your DTI Ratio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Your Debt-to-Income (DTI) ratio is a critical number that lenders look at to assess your financial risk. It gives them a snapshot of your financial obligations relative to your income. A lower DTI indicates that you have a good balance between debt and income, making you a less risky borrower.</p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>36% or less:</strong> Ideal. You are likely in a good position to manage your debts.</li>
                            <li><strong>37% to 43%:</strong> Manageable. You may still qualify for loans, but your finances are becoming more stretched.</li>
                            <li><strong>44% to 50%:</strong> Cause for concern. You may have limited borrowing options and high financial stress.</li>
                            <li><strong>Over 50%:</strong> Dangerous. You have a very high risk of being unable to meet your debt obligations.</li>
                        </ul>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>How to Improve Your DTI Ratio</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="space-y-3">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Pay Down Debt:</strong> The most direct way. Focus on paying off high-interest loans or credit cards to reduce your total monthly payments.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Increase Your Income:</strong> Look for opportunities to increase your earnings, such as a side hustle, negotiating a raise, or finding a higher-paying job.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Avoid New Debt:</strong> Before making a major purchase that requires financing, hold off on taking on any new debts like a car loan or new credit cards.</span></li>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/dti-calculator" />
      </div>
    </div>
  );
}
