
import AutoLoanCalculator from '@/components/calculators/auto-loan-calculator';
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
    title: 'Auto Loan Calculator – Estimate Your Monthly Car Payment',
    description: 'Use our free Auto Loan Calculator to estimate your monthly car payments. Factor in vehicle price, down payment, trade-in, interest rate, and sales tax to find a loan that fits your budget.',
    alternates: {
        canonical: '/auto-loan-calculator',
    },
};

const faqs = [
    {
        question: "How is a monthly car payment calculated?",
        answer: "A car payment is calculated based on the loan principal (vehicle price minus down payment and trade-in), the interest rate, and the loan term (number of months). Our calculator uses the standard amortization formula to determine this."
    },
    {
        question: "What is a good interest rate for a car loan?",
        answer: "Interest rates vary widely based on your credit score, the loan term, and whether the car is new or used. A 'good' rate is typically one that is competitive for the current market and your credit profile. It's always best to get pre-approved from multiple lenders to find the best rate."
    },
    {
        question: "How much of a down payment should I make?",
        answer: "A common recommendation is to put down at least 20% on a new car and 10% on a used car. A larger down payment reduces your loan amount, lowers your monthly payment, and helps you avoid being 'upside down' on your loan (owing more than the car is worth)."
    },
    {
        question: "Does a trade-in value act like a down payment?",
        answer: "Yes. Your trade-in value is subtracted from the vehicle price, directly reducing the amount you need to finance. It works in the same way as a cash down payment."
    },
     {
        question: "Should I choose a longer loan term for a lower payment?",
        answer: "While a longer term (like 72 or 84 months) will result in a lower monthly payment, you will pay significantly more in total interest over the life of the loan. It's generally better to choose the shortest loan term you can comfortably afford."
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

export default function AutoLoanCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Auto Loan Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate your monthly car payment and see a breakdown of principal, interest, and total cost to make an informed buying decision.
                </p>
            </div>

            <AutoLoanCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Auto Loan Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Vehicle Price:</strong> Enter the sticker price or negotiated price of the car.</li>
                            <li><strong>Down Payment & Trade-in:</strong> Input any cash down payment and the value of your trade-in vehicle.</li>
                            <li><strong>Loan Term:</strong> Select the length of your loan in months (e.g., 60 months = 5 years).</li>
                            <li><strong>Interest Rate:</strong> Enter the annual interest rate (APR) you expect to receive.</li>
                            <li><strong>Sales Tax:</strong> Provide your local sales tax rate to include it in the total financed amount.</li>
                            <li><strong>Click “Calculate”:</strong> Instantly see your estimated monthly payment and a full breakdown of the loan.</li>
                        </ol>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Tips for Getting a Better Car Loan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="space-y-3">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Check Your Credit Score:</strong> Your credit score is the single biggest factor in determining your interest rate. Knowing your score beforehand gives you negotiating power.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Get Pre-Approved:</strong> Before you even step into a dealership, get a pre-approved loan offer from your bank or a credit union. This gives you a benchmark rate to compare against the dealership's financing offer.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Negotiate the Price, Not the Payment:</strong> Focus on negotiating the total price of the vehicle first. Only discuss financing options and monthly payments after you've agreed on the car's price.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Choose a Shorter Loan Term:</strong> A shorter term means higher monthly payments but significantly less interest paid over the life of the loan. Avoid stretching a loan beyond 72 months if possible.</span></li>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/auto-loan-calculator" />
      </div>
    </div>
  );
}
