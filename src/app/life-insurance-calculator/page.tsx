
import LifeInsuranceNeedsCalculator from '@/components/calculators/life-insurance-needs-calculator';
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
    title: 'Life Insurance Needs Calculator – Estimate Your Coverage Amount',
    description: 'Use our free Life Insurance Needs Calculator to estimate how much coverage you really need. Get a personalized estimate based on your income, debts, mortgage, and future family expenses.',
    openGraph: {
        title: 'Life Insurance Needs Calculator – Estimate Your Coverage Amount',
        description: 'Use our free Life Insurance Needs Calculator to estimate how much coverage you really need. Get a personalized estimate based on your income, debts, mortgage, and future family expenses.',
        type: 'website',
        url: '/life-insurance-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Life Insurance Needs Calculator – Estimate Your Coverage Amount',
        description: 'Use our free Life Insurance Needs Calculator to estimate how much coverage you really need. Get a personalized estimate based on your income, debts, mortgage, and future family expenses.',
    },
    alternates: {
        canonical: '/life-insurance-calculator',
    },
};

const faqs = [
    {
        question: "How much life insurance do I need?",
        answer: "A common rule of thumb is 10-12 times your annual income, but a more accurate figure depends on your specific debts, future expenses (like college for kids), and existing assets. Our calculator uses the DIME method (Debt, Income, Mortgage, Education) to give you a more personalized estimate."
    },
    {
        question: "What is the DIME formula for life insurance?",
        answer: "The DIME formula is a simple way to estimate your life insurance needs. It stands for: D (Debt): Total all your non-mortgage debts. I (Income): Multiply your annual income by the number of years your family needs support. M (Mortgage): Add the remaining balance on your mortgage. E (Education): Add the estimated cost of your children's college education."
    },
    {
        question: "Is term life or whole life insurance better?",
        answer: "Term life insurance provides coverage for a specific period (e.g., 10, 20, or 30 years) and is generally much more affordable. It's often sufficient for most families' needs. Whole life insurance is a permanent policy with a cash value component, but it comes at a significantly higher cost. Many financial experts recommend 'buy term and invest the difference.'"
    },
    {
        question: "Do I need life insurance if I don't have kids?",
        answer: "You might. Life insurance can also be used to cover co-signed debts (like a mortgage), pay for funeral expenses, or provide a financial cushion for a surviving partner or dependent parent. If someone would suffer financially from your death, life insurance is worth considering."
    },
    {
        question: "Should I include my spouse's income when calculating?",
        answer: "This calculator is designed to estimate the need for one person's income. If both you and your spouse have significant incomes and shared financial responsibilities, you should each perform a separate calculation to determine your individual life insurance needs."
    }
];

const terminologies = [
    {
        term: "The DIME Method",
        definition: "A straightforward acronym to help you calculate your insurance needs: Debt, Income replacement, Mortgage, and Education. Our calculator is based on this popular and effective method."
    },
    {
        term: "Coverage Amount",
        definition: "This is the total amount of money the insurance policy will pay out to your beneficiaries upon your death. It's the number our calculator helps you estimate."
    },
    {
        term: "Term Life Insurance",
        definition: "A type of life insurance that provides coverage for a specific period or 'term' (e.g., 10, 20, or 30 years). It's typically the most affordable option and suitable for covering temporary needs like a mortgage or raising children."
    },
    {
        term: "Whole Life Insurance",
        definition: "A type of permanent life insurance that provides coverage for your entire life and includes a savings component (cash value). It is significantly more expensive than term life insurance."
    },
    {
        term: "Beneficiary",
        definition: "The person, people, or entity you designate to receive the payout from your life insurance policy. This can be a spouse, children, a trust, or a charity."
    },
    {
        term: "Premium",
        definition: "The regular payment (usually monthly or annually) you make to the insurance company to keep your policy active."
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


export default function LifeInsuranceCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Life Insurance Needs Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Don't guess how much life insurance you need. Our calculator helps you get a realistic estimate based on your family's specific financial needs, so you can plan with confidence.
                </p>
            </div>

            <LifeInsuranceNeedsCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Financial Planning</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/understanding-life-insurance" className="text-primary hover:underline">A Beginner's Guide to Life Insurance: Term vs. Whole Life</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Life Insurance Needs Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Select Your Currency:</strong> Choose your local currency for an accurate calculation.</li>
                            <li><strong>Enter Your Annual Income:</strong> Input your current pre-tax annual salary to calculate income replacement.</li>
                            <li><strong>Years of Support:</strong> Choose how many years your family would need your income. 10 years or until your youngest child graduates is a common benchmark.</li>
                            <li><strong>List Your Debts:</strong> Add up all non-mortgage debts, such as car loans, student loans, and credit card balances.</li>
                            <li><strong>Mortgage Balance:</strong> Enter the remaining amount owed on your home. This is often the largest debt for a family.</li>
                            <li><strong>Future Education Costs:</strong> Estimate the total amount you want to set aside for your children's higher education.</li>
                            <li><strong>Final Expenses:</strong> Input an amount for funeral and other end-of-life costs. A typical estimate is $15,000, but this can vary.</li>
                            <li><strong>Subtract Existing Assets:</strong> Enter any current savings, investments, or existing life insurance policies that can offset the total need.</li>
                            <li><strong>Click “Calculate”:</strong> Get your personalized life insurance coverage estimate instantly.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Why Accurate Life Insurance Calculation Matters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">Choosing the right amount of life insurance is one of the most important financial decisions you can make for your family's future. It ensures that in the event of your passing, your loved ones are not burdened by financial hardship. A proper policy provides peace of mind.</p>
                        <ul className="space-y-3">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Income Replacement:</strong> Provides your family with a steady stream of income to cover daily living expenses for years to come.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Debt Elimination:</strong> Pays off outstanding debts like a mortgage, car loans, or student loans, so your family can start with a clean slate.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Future Goals:</strong> Funds long-term goals like your children's college education or a spouse's retirement.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Peace of Mind:</strong> Knowing your family is financially secure provides invaluable peace of mind for you and them.</span></li>
                        </ul>
                         <p className="text-muted-foreground mt-4">An online calculator is the best first step toward finding the right coverage amount. For more tips on long-term planning, see our <Link href="/articles/planning-for-retirement-at-any-age" className="text-primary hover:underline">decade-by-decade retirement guide</Link>.</p>
                    </CardContent>
                </Card>
                
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding Key Life Insurance Terms</h2>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/life-insurance-calculator" />
      </div>
    </div>
  );
}
