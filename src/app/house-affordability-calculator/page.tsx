
import HouseAffordabilityCalculator from '@/components/calculators/house-affordability-calculator';
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
    title: 'House Affordability Calculator – How Much House Can I Afford?',
    description: 'Use our free House Affordability Calculator to estimate how much house you can afford based on your income, debts, down payment, and desired monthly budget. For U.S. residents.',
    alternates: {
        canonical: '/house-affordability-calculator',
    },
};

const faqs = [
    {
        question: "What is the 28/36 rule for mortgages?",
        answer: "The 28/36 rule is a common guideline used by lenders. It suggests that your monthly housing costs (principal, interest, taxes, insurance - PITI) should not exceed 28% of your gross monthly income, and your total debt payments (including housing, car loans, etc.) should not exceed 36%."
    },
    {
        question: "How much income do I need to afford a $500,000 house?",
        answer: "It depends on many factors, including your down payment, interest rate, other debts, and the lender's requirements. Our calculator can give you a good estimate based on your specific financial situation."
    },
    {
        question: "Does 'monthly debt' include rent?",
        answer: "When calculating your Debt-to-Income (DTI) ratio for a new home purchase, you do not include your current rent payment. You should include other long-term debts like car payments, student loans, and credit card minimum payments."
    },
    {
        question: "How much of a down payment should I make?",
        answer: "A 20% down payment is the standard recommendation as it allows you to avoid Private Mortgage Insurance (PMI). However, many loan programs allow for much smaller down payments, some as low as 3-5%."
    },
    {
        question: "Is it better to calculate by income or by budget?",
        answer: "Both methods are useful. Calculating by income shows you what lenders might approve you for based on standard rules. Calculating by budget shows you what you are personally comfortable spending each month, which is often the more important number."
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

export default function HouseAffordabilityCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">House Affordability Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate an affordable home purchase price based on your income and debts, or from a fixed monthly budget.
                </p>
            </div>

            <HouseAffordabilityCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Mortgages & Financial Planning</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/mortgage-calculator" className="text-primary hover:underline">Mortgage Calculator</Link></li>
                            <li><Link href="/articles/understanding-your-credit-score" className="text-primary hover:underline">Understanding Your Credit Score: The 5 Key Factors</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Affordability Calculators</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Our tool offers two ways to approach your home buying journey:</p>
                        <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
                            <li>
                                <strong>Affordability by Income:</strong>
                                This calculator starts with your annual income and uses standard Debt-to-Income (DTI) ratios to estimate the maximum home price and monthly payment lenders might consider for you. It's a great way to understand your borrowing power.
                            </li>
                            <li>
                                <strong>Affordability by Budget:</strong>
                                This calculator starts with the monthly payment you are comfortable with and works backward. It helps you determine what home price aligns with your personal budget, which is often the most important factor.
                            </li>
                        </ol>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Key Factors That Determine How Much House You Can Afford</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="space-y-3">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Debt-to-Income (DTI) Ratio:</strong> This is a key metric lenders use. It compares your total monthly debt payments to your gross monthly income. A lower DTI can help you qualify for a better loan.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Down Payment:</strong> A larger down payment reduces your loan amount, lowers your monthly payment, and can help you avoid Private Mortgage Insurance (PMI).</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Interest Rate:</strong> Your credit score heavily influences your interest rate. Even a small difference in the rate can significantly change your monthly payment and total interest paid over the life of the loan.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Loan Term:</strong> A 30-year term offers lower monthly payments, while a 15-year term means paying less interest overall but with higher monthly payments.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Hidden Costs:</strong> Remember to factor in property taxes, homeowner's insurance, HOA fees, and maintenance costs, which can add hundreds of dollars to your monthly housing expense.</span></li>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/house-affordability-calculator" />
      </div>
    </div>
  );
}
