
import MortgageCalculatorUk from '@/components/calculators/mortgage-calculator-uk';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'UK Mortgage Calculator – Estimate Your Monthly Repayment',
    description: 'Use our free UK Mortgage Calculator to estimate your monthly mortgage repayment in pounds (£). Includes principal, interest, taxes, and a full amortization schedule.',
    alternates: {
        canonical: '/mortgage-calculator-uk',
    },
};

const faqs = [
    {
        question: "What is a tracker mortgage?",
        answer: "A tracker mortgage is a type of variable-rate mortgage where the interest rate follows (tracks) a benchmark rate, most commonly the Bank of England base rate. Your monthly payment will go up or down as the base rate changes."
    },
    {
        question: "What is Stamp Duty?",
        answer: "Stamp Duty Land Tax (SDLT) is a tax you must pay if you buy a property or land over a certain price in England and Northern Ireland. The rate you pay varies depending on the price of the property."
    },
    {
        question: "How much deposit do I need for a mortgage in the UK?",
        answer: "While larger deposits (20% or more) can get you better interest rates, many lenders in the UK offer mortgages with deposits as low as 5% or 10% of the property value."
    },
    {
        question: "What is an 'Interest Only' payment?",
        answer: "An interest-only mortgage is where your monthly payments only cover the interest on the loan, not any of the original capital borrowed. At the end of the loan term, you still owe the entire original loan amount. This calculator shows the interest-only payment for comparison, but calculates the main repayment based on a standard repayment mortgage."
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

const stampDutyRates = [
    { threshold: 'Up to £250,000', rate: '0%' },
    { threshold: '£250,001 to £925,000', rate: '5%' },
    { threshold: '£925,001 to £1,500,000', rate: '10%' },
    { threshold: 'Over £1,500,001', rate: '12%' },
];

export default function MortgageCalculatorUkPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">UK Mortgage Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate your monthly mortgage repayment in pounds (£), including principal, interest, taxes, and other costs.
                </p>
            </div>

            <MortgageCalculatorUk />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Understanding UK Mortgages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            When applying for a mortgage in the United Kingdom, good preparation is key. Lenders will typically require addresses for the last three years, income information, and recent bank statements. It's also wise to check your credit score and address any issues before applying. In the UK, many mortgage products are available for those with deposits of 5-10%, although a larger deposit can secure better rates.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Common UK Mortgage Types</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg">Tracker Mortgage</h3>
                            <p className="text-muted-foreground">A tracker mortgage is a variable-rate mortgage where the interest rate follows the Bank of England base rate. This means your payments can go up or down. These often have low introductory rates but may come with early repayment charges if you switch or pay it off during the intro period.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Flexible Mortgage</h3>
                            <p className="text-muted-foreground">This type of mortgage allows for more flexibility, such as overpaying, underpaying, or even taking a "payment holiday" for a few months. These features can be useful for managing your finances but often come with specific conditions and potential fees.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Stamp Duty Land Tax (SDLT)</CardTitle>
                        <CardDescription>A key tax on property purchases in England and Northern Ireland.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground mb-4">Stamp Duty is a tax charged as a percentage of the purchase price. The rates are tiered, meaning you pay different rates on different portions of the property price.</p>
                         <Table>
                             <TableHeader>
                                 <TableRow>
                                     <TableHead>Property Price Threshold</TableHead>
                                     <TableHead className="text-right">Stamp Duty Rate</TableHead>
                                 </TableRow>
                             </TableHeader>
                             <TableBody>
                                 {stampDutyRates.map(tier => (
                                     <TableRow key={tier.threshold}>
                                         <TableCell>{tier.threshold}</TableCell>
                                         <TableCell className="text-right">{tier.rate}</TableCell>
                                     </TableRow>
                                 ))}
                             </TableBody>
                         </Table>
                         <p className="text-sm text-muted-foreground mt-4">Note: First-time buyers may get relief on properties up to £625,000. These rules are complex and can change, so it's best to consult an official source or a professional for the exact amount.</p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader><CardTitle>Learn More About Mortgages</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/mortgage-calculator" className="text-primary hover:underline">Conventional Mortgage Calculator (US)</Link></li>
                            <li><Link href="/house-affordability-calculator" className="text-primary hover:underline">House Affordability Calculator</Link></li>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/mortgage-calculator-uk" />
      </div>
    </div>
  );
}
