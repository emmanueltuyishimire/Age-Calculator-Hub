
import AmortizationCalculator from '@/components/calculators/amortization-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Amortization Schedule Calculator – See Loan Payments Over Time',
    description: 'Use our free Amortization Calculator to see a detailed payment schedule for your mortgage, auto, or personal loan. View a year-by-year breakdown of principal and interest.',
    alternates: {
        canonical: '/amortization-calculator',
    },
};

const faqs = [
    {
        question: "What is an amortization schedule?",
        answer: "An amortization schedule is a table that details each periodic payment on a loan. It shows how much of each payment is applied to interest and how much is applied to the principal balance, and it shows the remaining balance after each payment."
    },
    {
        question: "How does amortization work?",
        answer: "With an amortizing loan, your monthly payment is fixed. In the beginning, a larger portion of your payment goes toward interest. As you pay down the loan, more of each payment goes toward reducing the principal, which our schedule clearly visualizes."
    },
    {
        question: "Can I use this for a mortgage or auto loan?",
        answer: "Yes, this calculator is perfect for any fixed-rate installment loan, including mortgages, auto loans, and personal loans. It provides a clear, year-by-year breakdown of your payment schedule."
    },
    {
        question: "How can I pay less interest on my loan?",
        answer: "The best ways to pay less interest are to get a lower interest rate, choose a shorter loan term, or make extra payments toward the principal. You can see the impact of a shorter term by adjusting the 'Loan Term' in the calculator."
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

export default function AmortizationCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-5xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Amortization Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Visualize your loan repayment schedule over time. See how much of each payment goes toward principal versus interest with our detailed amortization table.
                </p>
            </div>

            <AmortizationCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Loans & Financial Planning</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/how-to-pay-off-debt-faster" className="text-primary hover:underline">The Power of Extra Payments: How to Pay Off Your Loans Faster</Link></li>
                            <li><Link href="/articles/understanding-your-credit-score" className="text-primary hover:underline">Understanding Your Credit Score: The 5 Key Factors</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Amortization Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Loan Amount:</strong> Enter the total amount you borrowed.</li>
                            <li><strong>Loan Term:</strong> Input the total length of your loan in years and months.</li>
                            <li><strong>Interest Rate:</strong> Provide the annual percentage rate (APR) for your loan.</li>
                            <li><strong>Click “Calculate”:</strong> Instantly receive your monthly payment, a full cost breakdown, and a detailed year-by-year amortization schedule.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Why an Amortization Schedule is Important</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">Understanding your amortization schedule is crucial for smart financial planning. It provides a clear roadmap of your debt and empowers you to:</p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>See the True Cost of Your Loan:</strong> The schedule clearly shows the total interest you will pay over the life of the loan, helping you understand the real cost of borrowing.</li>
                            <li><strong>Visualize Your Progress:</strong> Watch your loan balance decrease year after year as more of your payment shifts from interest to principal.</li>
                            <li><strong>Plan for the Future:</strong> Knowing your payment schedule helps you budget effectively and plan for other financial goals.</li>
                            <li><strong>Understand the Impact of Extra Payments:</strong> While this calculator doesn't model extra payments, seeing how much interest you pay can motivate you to use a tool like our <Link href="/loan-payoff-calculator" className="text-primary hover:underline">Loan Payoff Calculator</Link> to see how extra payments can save you money.</li>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/amortization-calculator" />
      </div>
    </div>
  );
}
