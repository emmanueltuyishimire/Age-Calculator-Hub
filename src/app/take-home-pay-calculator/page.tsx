
import TakeHomePayCalculator from '@/components/calculators/take-home-pay-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Take-Home-Paycheck Calculator – Estimate Your Net Pay',
    description: 'Use our free Take-Home-Paycheck Calculator to estimate your paycheck after federal, state, and FICA taxes. Based on the 2024/2025 W-4 form.',
    alternates: {
        canonical: '/take-home-pay-calculator',
    },
};

const faqs = [
    {
        question: "How is my take-home pay calculated?",
        answer: "Your take-home pay (net pay) is your gross salary minus all deductions. This calculator estimates your federal income tax withholding based on the new W-4 form, FICA taxes (Social Security & Medicare), and any state/local taxes, as well as pre-tax deductions like 401(k) and health insurance."
    },
    {
        question: "What is the difference between deductions withheld by my employer and other deductions?",
        answer: "'Pre-tax deductions withheld' (like 401k or health insurance) are taken from your paycheck before taxes are calculated. 'Other deductions' (like traditional IRA contributions) are not taken from your paycheck but still reduce your annual taxable income."
    },
    {
        question: "What's the difference between a deduction and a credit?",
        answer: "A deduction reduces your taxable income, lowering your tax bill based on your tax bracket. A tax credit is a dollar-for-dollar reduction of your actual tax liability. This calculator factors in the Child Tax Credit and credit for other dependents."
    },
    {
        question: "How does checking the '2+ jobs' box affect my calculation?",
        answer: "It uses a different calculation method suggested by the IRS for the W-4 form (Step 2c) to ensure more accurate withholding for people with multiple sources of income, preventing a large tax bill at the end of the year."
    },
    {
        question: "Is this calculator a substitute for professional tax advice?",
        answer: "No. This calculator provides a detailed estimate for informational purposes only. It is not a substitute for professional tax software or advice from a certified tax preparer. Tax laws are complex, and you should consult a professional for your specific situation."
    }
];

const terminologies = [
    {
        term: "Gross Pay",
        definition: "The total amount of money you earn before any taxes or other deductions are taken out. This is your salary figure."
    },
    {
        term: "Net Pay (Take-Home Pay)",
        definition: "The amount of money you actually receive in your paycheck after all deductions (taxes, 401(k), health insurance, etc.) have been subtracted from your gross pay."
    },
    {
        term: "FICA Taxes",
        definition: "Taxes mandated by the Federal Insurance Contributions Act, which fund Social Security and Medicare. These are separate from your federal income tax."
    },
    {
        term: "Pre-Tax Deductions",
        definition: "Expenses that are taken out of your paycheck before income taxes are calculated. These deductions, such as contributions to a traditional 401(k) or health insurance premiums, lower your taxable income."
    },
    {
        term: "Tax Withholding",
        definition: "The amount of income tax that your employer withholds from your paycheck and pays directly to the government on your behalf. It's an estimated payment toward your annual tax liability."
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

export default function TakeHomePayCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-5xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Take-Home-Paycheck Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate your actual paycheck amount after taxes and deductions. This detailed calculator is based on the 2024/2025 W-4 form.
                </p>
            </div>

            <TakeHomePayCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive" />Important Disclaimer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-destructive-foreground font-semibold">
                            This calculator provides a detailed estimate for educational purposes and is NOT a substitute for professional tax advice. It does not cover all tax situations. You should consult a qualified tax professional for advice on your specific circumstances.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Paycheck Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Your Gross Pay:</strong> Input your total annual salary before any deductions.</li>
                            <li><strong>Set Pay Frequency:</strong> Select how often you get paid (e.g., weekly, bi-weekly, monthly).</li>
                            <li><strong>Filing Status:</strong> Choose your tax filing status (e.g., Single, Married Filing Jointly) and the relevant tax year.</li>
                            <li><strong>Dependents:</strong> Enter the number of dependents you will claim for tax credits.</li>
                            <li><strong>Deductions:</strong> Input your annual pre-tax deductions, such as 401(k) or health insurance contributions. Use the advanced section for more specific deductions if needed.</li>
                             <li><strong>State Tax:</strong> Add your state's income tax rate for a more accurate estimate.</li>
                            <li><strong>Click “Calculate Paycheck”:</strong> Get an instant breakdown of your estimated take-home pay per pay period.</li>
                        </ol>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Your Pay & Taxes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/understanding-your-paycheck" className="text-primary hover:underline">Understanding Your Paycheck: A Guide to Deductions and Net Pay</Link></li>
                            <li>See how this impacts your annual tax return with our <Link href="/income-tax-calculator" className="text-primary hover:underline">Income Tax Calculator</Link>.</li>
                        </ul>
                    </CardContent>
                </Card>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding Key Paycheck Terms</h2>
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
                                    <p>{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/take-home-pay-calculator" />
      </div>
    </div>
  );
}
