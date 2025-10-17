
import AutoLeaseCalculator from '@/components/calculators/auto-lease-calculator';
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
    title: 'Auto Lease Calculator – Estimate Your Monthly Car Lease Payment',
    description: 'Use our free Auto Lease Calculator to estimate your monthly car lease payments. Input vehicle price, lease term, money factor, and residual value to see a full breakdown of your costs.',
    alternates: {
        canonical: '/auto-lease-calculator',
    },
};

const faqs = [
    {
        question: "What is a money factor?",
        answer: "A money factor is another way of expressing the interest rate on a lease. To convert it to a more familiar APR, multiply the money factor by 2400. For example, a money factor of 0.0025 is equivalent to a 6% APR (0.0025 * 2400)."
    },
    {
        question: "What is residual value?",
        answer: "Residual value is the estimated value of the car at the end of the lease term. It's set by the leasing company and is a key component in calculating your payment, as you are essentially paying for the depreciation below this value."
    },
    {
        question: "How is a lease payment calculated?",
        answer: "A monthly lease payment is made up of three parts: 1) The depreciation fee (the difference between the car's price and its residual value, spread over the term), 2) The finance fee (calculated using the money factor), and 3) Sales tax."
    },
    {
        question: "What does 'capitalized cost reduction' mean?",
        answer: "This is simply the total amount you pay upfront that reduces the price of the car for the lease calculation. It includes your down payment and any net trade-in value."
    },
    {
        question: "Is it better to lease or buy a car?",
        answer: "It depends on your priorities. Leasing typically offers lower monthly payments and lets you drive a new car more often, but you don't build any equity. Buying is more expensive upfront, but you own the car at the end. Use our <a href='/auto-loan-calculator' class='text-primary hover:underline'>Auto Loan Calculator</a> to compare payments."
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

export default function AutoLeaseCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-5xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Auto Lease Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate your monthly car lease payment and see a full breakdown of the costs involved, including depreciation, finance charges, and taxes.
                </p>
            </div>

            <AutoLeaseCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Auto Financing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>Compare this to a purchase with our <Link href="/auto-loan-calculator" className="text-primary hover:underline">Auto Loan Calculator</Link>.</li>
                            <li><Link href="/articles/understanding-your-credit-score" className="text-primary hover:underline">Understanding Your Credit Score: The 5 Key Factors</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Auto Lease Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">This tool helps you understand the true cost of leasing a vehicle. Here's a guide to the inputs:</p>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground mt-4">
                            <li><strong>Auto Price:</strong> The negotiated price of the vehicle (MSRP minus any discounts).</li>
                            <li><strong>Lease Term:</strong> The length of your lease in months (e.g., 36 months).</li>
                            <li><strong>Money Factor:</strong> The financing rate for the lease. Ask the dealer for this number. It looks small, like 0.0025.</li>
                            <li><strong>Down Payment & Trade-in:</strong> Any cash or vehicle equity you are putting toward the lease to reduce the capitalized cost.</li>
                            <li><strong>Sales Tax:</strong> The sales tax rate in your state, which is typically applied to the monthly payments.</li>
                            <li><strong>Residual Value:</strong> The car's estimated worth at the end of the lease, expressed as a fixed amount or a percentage of MSRP.</li>
                        </ol>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Tips for Getting the Best Lease Deal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="space-y-3">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Negotiate the Price First:</strong> Always negotiate the vehicle's selling price as if you were buying it. This is the single biggest factor in lowering your lease payment.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Minimize the Down Payment:</strong> While a large down payment lowers your monthly cost, it's not recommended for a lease. If the car is stolen or totaled, you likely won't get that money back.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Understand the Money Factor:</strong> Ask for the money factor and convert it to an APR (multiply by 2400) to understand the financing cost and compare it to loan rates.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Check Mileage Limits:</strong> Be realistic about how much you drive. Exceeding the mileage limit on your lease can result in expensive penalties at the end of the term.</span></li>
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
        <RelatedCalculators currentCategory="Financial" currentHref="/auto-lease-calculator" />
      </div>
    </div>
  );
}
