
import BoatLoanCalculator from '@/components/calculators/boat-loan-calculator';
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
    title: 'Boat Loan Calculator – Estimate Your Monthly Boat Payment',
    description: 'Use our free Boat Loan Calculator to estimate your monthly payments. Factor in boat price, down payment, trade-in, interest rate, and term to find a loan that fits your budget.',
    alternates: {
        canonical: '/boat-loan-calculator',
    },
};

const faqs = [
    {
        question: "What is a typical loan term for a boat?",
        answer: "Boat loan terms are often longer than auto loans, typically ranging from 10 to 20 years, depending on the loan amount and the age of the boat."
    },
    {
        question: "How much of a down payment is required for a boat loan?",
        answer: "Lenders typically require a down payment of 10-20% of the boat's purchase price. A larger down payment can help you secure a better interest rate and lower your monthly payments."
    },
    {
        question: "What are 'hidden costs' of owning a boat?",
        answer: "Beyond the loan, ongoing costs include insurance, maintenance (engine servicing, cleaning), fuel, storage or slip fees, and essential gear. A general rule of thumb is to budget about 10% of the boat's value for annual upkeep."
    },
    {
        question: "How is this different from an auto loan calculator?",
        answer: "Functionally, the calculation is the same amortization formula. However, this calculator is tailored for boat purchases, which often feature longer loan terms and different associated costs (like survey fees) than auto loans."
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

export default function BoatLoanCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-5xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Boat Loan Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate your monthly boat payment and see a breakdown of principal, interest, and total cost to make an informed buying decision.
                </p>
            </div>

            <BoatLoanCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>What is a Boat Loan?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            A boat loan is a type of financing specifically designed to facilitate the purchase of a boat. Similar to auto loans or mortgages, boat loans typically involve borrowing money from a lender (such as a bank, credit union, or specialized marine finance company) to buy a boat. You repay the loan over time, usually in fixed monthly installments that include interest. Although unsecured loans can sometimes be used for boat purchases, typically the boat itself serves as collateral—meaning the lender can repossess it if payments aren't made.
                        </p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Fees Associated with Buying a Boat</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <p className="text-muted-foreground">
                            When purchasing a boat, the initial price is just the starting point. It is essential to budget accordingly because there are various additional fees that can quickly add up, especially when financing with a loan.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Sales Tax:</strong> Most U.S. states charge a sales tax ranging from 4% to 8% of the boat's purchase price.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Loan Origination Fees:</strong> Many lenders charge a loan processing fee, typically 1% to 3% of the loan amount.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Survey Fees:</strong> Lenders often require a marine survey (similar to a home inspection) to assess the condition of used or larger boats.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Title and Registration Fees:</strong> Boats need to be registered with state authorities, and fees vary based on location and boat size.</span></li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Ongoing Costs of Boat Ownership</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Owning a boat involves ongoing expenses beyond loan payments. Here's what to anticipate:</p>
                        <ul className="list-disc list-inside space-y-2 mt-4 text-muted-foreground">
                            <li><strong>Insurance:</strong> Boat insurance costs vary widely based on boat size and type. It is usually mandatory for financed boats.</li>
                            <li><strong>Maintenance & Repairs:</strong> Regular upkeep—including engine servicing, hull cleaning, and winterization—is necessary.</li>
                            <li><strong>Fuel:</strong> Fuel costs can vary significantly. Most boats have lower fuel efficiency compared to vehicles.</li>
                            <li><strong>Storage:</strong> Unless you have private docking, you'll need to pay for marina slips or dry storage.</li>
                            <li><strong>Gear & Accessories:</strong> Life jackets, electronics, fishing gear, and other upgrades can add to your expenses.</li>
                        </ul>
                        <p className="text-muted-foreground mt-2">For a mid-sized boat valued at approximately $30,000, annual costs could range from $3,000 to $7,000, excluding the loan itself.</p>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/boat-loan-calculator" />
      </div>
    </div>
  );
}
