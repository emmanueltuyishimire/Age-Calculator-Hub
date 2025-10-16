
import RentCalculator from '@/components/calculators/rent-calculator';
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
    title: 'Rent Affordability Calculator – How Much Rent Can I Afford?',
    description: 'Use our free Rent Calculator to estimate how much rent you can afford based on your annual income and monthly debts. Get a recommended budget using common financial rules.',
    alternates: {
        canonical: '/rent-calculator',
    },
};

const faqs = [
    {
        question: "What is the 30% rule for rent?",
        answer: "The 30% rule is a popular financial guideline suggesting that you should spend no more than 30% of your gross (pre-tax) monthly income on rent. This helps ensure you have enough money for other expenses and savings."
    },
    {
        question: "How do you calculate affordable rent?",
        answer: "A common method is to divide your annual income by 40, which is roughly 30% of your monthly income. Our calculator refines this by also considering your existing debt payments to provide a more realistic budget."
    },
    {
        question: "Does 'monthly debt' include utilities or groceries?",
        answer: "No. For this calculation, 'monthly debt' should only include fixed debt payments like car loans, student loans, and minimum credit card payments. It does not include variable living expenses like utilities, groceries, or entertainment."
    },
    {
        question: "Why does my debt affect how much rent I can afford?",
        answer: "Lenders and landlords often look at your total debt-to-income (DTI) ratio. High monthly debt payments reduce the amount of income available for housing, so considering your debts gives you a more conservative and safer rent estimate."
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

export default function RentCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Rent Affordability Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate an affordable monthly rent payment based on your income and debts to help you budget effectively.
                </p>
            </div>

            <RentCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Budgeting & Finances</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/creating-a-budget-that-works" className="text-primary hover:underline">Creating a Budget That Works: The 50/30/20 Rule</Link></li>
                            <li><Link href="/salary-calculator" className="text-primary hover:underline">Salary Calculator</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>How This Calculator Works</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Our calculator provides a recommended rent budget based on standard financial guidelines. Here's how it works:</p>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li>It calculates your gross monthly income from the annual figure you provide.</li>
                            <li>It determines a maximum rent based on the **30% rule** (30% of your gross monthly income).</li>
                            <li>It also calculates a more conservative maximum based on a common debt-to-income ratio guideline, ensuring your total housing and debt payments don't exceed a certain threshold (typically 36-40%) of your income.</li>
                            <li>Your final recommended rent is the lower of these two values, giving you a safe and responsible budget.</li>
                        </ol>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Why You Shouldn't Overspend on Rent</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">Sticking to a reasonable rent budget is one of the most powerful financial moves you can make. Being "house poor" (or "rent poor") can have significant consequences:</p>
                        <ul className="space-y-3">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Financial Stress:</strong> A high rent payment can leave you with little room for error, causing stress every time an unexpected expense comes up.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Inability to Save:</strong> It becomes difficult to save for important goals like an emergency fund, retirement, or a down payment on a house.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Less Discretionary Income:</strong> There's less money left over for hobbies, travel, and other activities that improve your quality of life.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Difficulty Getting Other Loans:</strong> A high housing expense increases your DTI ratio, which can make it harder to get approved for other loans, like a car loan.</span></li>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/rent-calculator" />
      </div>
    </div>
  );
}
