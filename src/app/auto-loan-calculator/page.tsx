
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
    openGraph: {
        title: 'Auto Loan Calculator – Estimate Your Monthly Car Payment',
        description: 'Use our free Auto Loan Calculator to estimate your monthly car payments. Factor in vehicle price, down payment, trade-in, interest rate, and sales tax.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Auto Loan Calculator – Estimate Your Monthly Car Payment',
        description: 'Use our free Auto Loan Calculator to estimate your monthly car payments. Factor in vehicle price, down payment, trade-in, interest rate, and sales tax.',
    },
};

const faqs = [
    {
        question: "How is a monthly car payment calculated?",
        answer: "A car payment is calculated based on the loan principal (vehicle price + fees - down payment - net trade-in), the interest rate, and the loan term. Our calculator uses the standard amortization formula to determine this."
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
        question: "How does the 'Amount Owed on Trade-in' work?",
        answer: "If you owe money on your trade-in, that amount is typically added to your new loan principal. If your trade-in is worth more than you owe, the difference (positive equity) is subtracted from your new loan, acting like a down payment."
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

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Use the Auto Loan Calculator",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Select Calculation Mode",
      "text": "Choose to calculate 'By Total Price' if you know the car's cost, or 'By Monthly Payment' if you have a budget in mind."
    },
    {
      "@type": "HowToStep",
      "name": "Enter Vehicle & Trade-in Details",
      "text": "Input the vehicle price, plus any cash incentives, your down payment, and trade-in details."
    },
    {
      "@type": "HowToStep",
      "name": "Define Loan Parameters",
      "text": "Set your desired loan term (in months) and the interest rate (APR) you expect."
    },
    {
      "@type": "HowToStep",
      "name": "Include Taxes & Fees",
      "text": "Add your state sales tax and any title or registration fees to get a true total loan amount."
    },
    {
      "@type": "HowToStep",
      "name": "Calculate & Review",
      "text": "Click 'Calculate' to see your estimated monthly payment, a full cost breakdown, and a year-by-year amortization schedule."
    }
  ]
};

export default function AutoLoanCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="max-w-5xl mx-auto">
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
                        <CardTitle>Learn More About Managing Your Loan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/understanding-your-credit-score" className="text-primary hover:underline">Understanding Your Credit Score: The 5 Key Factors</Link></li>
                            <li><Link href="/articles/how-to-pay-off-debt-faster" className="text-primary hover:underline">The Power of Extra Payments: How to Pay Off Your Loans Faster</Link></li>
                            <li>Compare financing offers with our <Link href="/cash-back-or-low-interest-calculator" className="text-primary hover:underline">Cash Back vs. Low Interest Calculator</Link>.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Auto Loan Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">This comprehensive tool helps you understand the full cost of your next vehicle purchase. Here's how to use it:</p>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground mt-4">
                            <li><strong>Select Calculation Mode:</strong> Choose to calculate "By Total Price" if you know the car's cost, or "By Monthly Payment" if you have a budget in mind.</li>
                            <li><strong>Enter Vehicle Details:</strong> Input the vehicle price, plus any cash incentives, your down payment, and trade-in details.</li>
                            <li><strong>Define Loan Parameters:</strong> Set your desired loan term (in months) and the interest rate (APR) you expect.</li>
                            <li><strong>Include Taxes & Fees:</strong> Add your state sales tax and any title or registration fees to get a true total loan amount.</li>
                            <li><strong>Click “Calculate”:</strong> Instantly see your estimated monthly payment, a full cost breakdown, and a year-by-year amortization schedule.</li>
                        </ol>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Tips for Getting the Best Car Loan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="space-y-3">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Improve Your Credit Score:</strong> Your credit score is the single biggest factor in determining your interest rate. Paying bills on time and reducing credit card balances can boost your score.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Get Pre-Approved:</strong> Before you shop, get a pre-approved loan offer from your bank or a credit union. This gives you a benchmark rate and strengthens your negotiating position at the dealership.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Negotiate the Price, Not the Payment:</strong> Always focus on negotiating the total price of the vehicle first. Discuss financing options and monthly payments only after you've agreed on the car's final price.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Choose the Shortest Term You Can Afford:</strong> A shorter loan term means higher monthly payments but significantly less interest paid over time. Try to avoid stretching a loan beyond 72 months.</span></li>
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
        <RelatedCalculators currentCategory="Auto" currentHref="/auto-loan-calculator" />
      </div>
    </div>
  );
}
