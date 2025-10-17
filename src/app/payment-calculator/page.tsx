
import PaymentCalculator from '@/components/calculators/payment-calculator';
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
    title: 'Payment Calculator – Estimate Monthly Loan Payments',
    description: 'Use our free Payment Calculator to estimate the monthly payment for any loan. Enter the loan amount, interest rate, and term to see your payment, total interest, and an amortization schedule.',
    alternates: {
        canonical: '/payment-calculator',
    },
};

const faqs = [
    {
        question: "How is a monthly loan payment calculated?",
        answer: "The monthly payment is calculated using a standard amortization formula that considers the loan amount (principal), the interest rate, and the loan term. Our calculator automates this complex formula for you."
    },
    {
        question: "What is amortization?",
        answer: "Amortization is the process of paying off a loan over time with regular, fixed payments. In the beginning, a larger portion of your payment goes to interest. Over time, more of it goes toward reducing the principal balance. You can see a full schedule with our <a href='/amortization-calculator' class='text-primary hover:underline'>Amortization Calculator</a>."
    },
    {
        question: "How can I reduce my monthly payment?",
        answer: "You can reduce your payment by choosing a longer loan term (which means paying more interest over time), finding a loan with a lower interest rate, or borrowing a smaller amount."
    },
    {
        question: "Does this calculator work for mortgages or auto loans?",
        answer: "Yes, this is a general-purpose loan calculator suitable for any fixed-rate installment loan, including mortgages, auto loans, and personal loans. For more detailed calculations, you can use our specific <a href='/mortgage-calculator' class='text-primary hover:underline'>Mortgage</a> or <a href='/auto-loan-calculator' class='text-primary hover:underline'>Auto Loan</a> calculators."
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

export default function PaymentCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Loan Payment Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate your monthly payment for any type of loan, including personal loans, student loans, or other fixed-rate financing.
                </p>
            </div>

            <PaymentCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Loans & Debt</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/understanding-your-credit-score" className="text-primary hover:underline">Understanding Your Credit Score: The 5 Key Factors</Link></li>
                            <li><Link href="/articles/how-to-pay-off-debt-faster" className="text-primary hover:underline">The Power of Extra Payments: How to Pay Off Your Loans Faster</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Payment Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Loan Amount:</strong> Enter the total amount of money you need to borrow.</li>
                            <li><strong>Annual Interest Rate:</strong> Input the loan's annual percentage rate (APR).</li>
                            <li><strong>Loan Term:</strong> Enter the number of years over which you will repay the loan.</li>
                            <li><strong>Click “Calculate Payment”:</strong> Get an instant breakdown of your estimated monthly payment, total interest, and total cost.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Understanding Your Loan Repayment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">This tool helps you see the true cost of borrowing money. Here's what the results mean:</p>
                        <ul className="space-y-3">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Monthly Payment:</strong> The fixed amount you will pay each month for the duration of the loan.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Total Principal Paid:</strong> This is the original loan amount that you borrowed.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Total Interest Paid:</strong> This is the total profit the lender makes from the loan. A lower interest rate or shorter loan term will reduce this amount.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Total Cost:</strong> The sum of the principal and total interest, representing the full amount you will pay back over the life of the loan.</span></li>
                        </ul>
                         <p className="text-muted-foreground mt-4">Use the Amortization Schedule to see how each payment is split between principal and interest year by year. For a more detailed payoff plan, try our <Link href="/loan-payoff-calculator" className="text-primary hover:underline">Loan Payoff Calculator</Link>.</p>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/payment-calculator" />
      </div>
    </div>
  );
}
