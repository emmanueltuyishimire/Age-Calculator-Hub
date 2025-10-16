
import RefinanceCalculator from '@/components/calculators/refinance-calculator';
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
    title: 'Refinance Calculator – Should You Refinance Your Mortgage?',
    description: 'Use our free Refinance Calculator to see if refinancing your mortgage or loan makes sense. Compare your current loan to a new one and see your monthly savings, break-even point, and lifetime savings.',
    alternates: {
        canonical: '/refinance-calculator',
    },
};

const faqs = [
    {
        question: "When is a good time to refinance?",
        answer: "Refinancing is often a good idea if you can lower your interest rate significantly (typically 1% or more), if you plan to stay in your home long enough to pass the break-even point, or if you need to switch from an adjustable-rate to a fixed-rate mortgage."
    },
    {
        question: "What is a 'break-even point' in refinancing?",
        answer: "The break-even point is the time it takes for your monthly savings to cover the closing costs of the new loan. If you plan to sell the home or pay off the loan before this point, refinancing may not be financially beneficial. Our calculator determines this for you."
    },
    {
        question: "What are 'points' on a loan?",
        answer: "Points (or discount points) are fees paid directly to the lender at closing in exchange for a reduced interest rate. One point costs 1% of your loan amount. This is a way to 'buy down' your rate."
    },
    {
        question: "Does this calculator work for auto loans?",
        answer: "Yes, this calculator can be used for any type of fixed-rate loan, including mortgages, auto loans, or personal loans. Simply enter your current loan details and the terms of the new loan you are considering."
    },
];

const terminologies = [
    {
        term: "Closing Costs",
        definition: "The fees you pay to finalize a refinance. This includes appraisal fees, title insurance, attorney fees, and loan origination fees. Our calculator groups these under 'Costs and Fees'."
    },
    {
        term: "Points",
        definition: "An optional fee you can pay to the lender to lower your interest rate. One point is equal to 1% of the new loan amount."
    },
    {
        term: "Cash-Out Refinance",
        definition: "When you refinance your mortgage for more than you currently owe and receive the difference in cash. This is a way to tap into your home's equity, but it increases your total loan amount."
    },
    {
        term: "Break-Even Point",
        definition: "The number of months it takes for the savings from your lower monthly payment to equal the total closing costs of the refinance. It's a critical factor in deciding if refinancing is worthwhile."
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

export default function RefinanceCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Refinance Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Compare your current loan to a new refinance loan to see if you can save money. This tool calculates your new payment, break-even point, and potential lifetime savings.
                </p>
            </div>

            <RefinanceCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Refinance Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Your Current Loan Details:</strong> Provide the remaining balance, your current monthly payment (principal and interest only), and your current interest rate. The calculator will use this to determine your remaining term.</li>
                            <li><strong>Enter Your New Loan Details:</strong> Input the term and interest rate for the new loan you are considering.</li>
                            <li><strong>Add Refinance Costs:</strong> Enter any costs associated with the new loan, such as points and closing fees. A point is 1% of the loan amount.</li>
                            <li><strong>Consider Cash Out (Optional):</strong> If you plan to take cash out, enter that amount. This will be added to your new loan balance.</li>
                            <li><strong>Click “Calculate”:</strong> Get an instant, detailed comparison of the two loans.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>When Does Refinancing Make Sense?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">Refinancing can be a powerful financial move, but it's not right for everyone. Here are the key scenarios where it's often beneficial:</p>
                        <ul className="space-y-3">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Lower Your Interest Rate:</strong> This is the most common reason. If market rates have dropped significantly since you got your loan, you could save a substantial amount of money.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Shorten Your Loan Term:</strong> If your income has increased, you might be able to switch from a 30-year to a 15-year mortgage. Your payment might be higher, but you'll pay off the loan much faster and save a huge amount in interest.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Convert from ARM to Fixed:</strong> If you have an adjustable-rate mortgage (ARM) and want the stability of a fixed payment, refinancing to a fixed-rate loan can provide peace of mind.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Tap Into Home Equity:</strong> A cash-out refinance allows you to borrow against your home's equity, which can be useful for home improvements or consolidating high-interest debt.</span></li>
                        </ul>
                         <p className="text-muted-foreground mt-4">The most important factor is whether you plan to stay in your home long enough to pass the **break-even point**. If you might sell before then, the closing costs could outweigh the monthly savings.</p>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding Key Refinancing Terms</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {terminologies.map((item, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{item.term}</AccordionTrigger>
                                <AccordionContent>{item.definition}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
                
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/refinance-calculator" />
      </div>
    </div>
  );
}
