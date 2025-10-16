
import IncomeTaxCalculator from '@/components/calculators/income-tax-calculator';
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
    title: 'Income Tax Calculator – Estimate Your 2024-2025 Tax Refund',
    description: 'Use our free Income Tax Calculator to estimate your federal tax refund or amount owed for the 2024 or 2025 tax year. Based on the latest IRS tax brackets and standard deductions.',
    alternates: {
        canonical: '/income-tax-calculator',
    },
};

const faqs = [
    {
        question: "Is this income tax calculator accurate?",
        answer: "This calculator provides a detailed estimate based on the information you provide and the 2024/2025 tax laws. However, it is not a substitute for professional tax software or a certified tax preparer. It does not cover all tax situations and should be used for estimation purposes only."
    },
    {
        question: "What is the difference between a deduction and a credit?",
        answer: "A tax deduction reduces your taxable income, which lowers your tax bill indirectly based on your tax bracket. A tax credit, on the other hand, is a dollar-for-dollar reduction of your actual tax liability, making it more powerful."
    },
    {
        question: "Should I take the standard deduction or itemize?",
        answer: "You should choose whichever method results in a larger deduction. This calculator automatically compares your itemized deductions (from inputs like mortgage interest and state taxes) to the standard deduction for your filing status and applies the higher amount."
    },
    {
        question: "What is the federal income tax rate for 2024?",
        answer: "The U.S. has a progressive tax system with seven federal income tax brackets for 2024: 10%, 12%, 22%, 24%, 32%, 35%, and 37%. The bracket you fall into depends on your taxable income and filing status."
    },
    {
        question: "Can I use this to estimate my state taxes?",
        answer: "No, this calculator is designed for federal income taxes only. State tax laws vary significantly, and this tool does not account for those differences."
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

export default function IncomeTaxCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Income Tax Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate your federal tax refund or amount owed for the 2024 and 2025 tax years.
                </p>
            </div>

            <IncomeTaxCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive" />Important Disclaimer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-destructive-foreground font-semibold">
                            This calculator provides a simplified estimate for educational purposes only. It is NOT a substitute for professional tax advice or official tax preparation software. Tax laws are complex and this tool does not cover all possible tax situations. You must consult with a qualified tax professional for advice on your specific circumstances.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>How This Tax Calculator Works</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">This tool provides a detailed estimate of your federal income tax liability by following these steps:</p>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground mt-4">
                            <li><strong>Calculates Adjusted Gross Income (AGI):</strong> It starts with your total income and subtracts specific "above-the-line" deductions like IRA contributions.</li>
                            <li><strong>Determines Your Deduction:</strong> It compares your itemized deductions (from inputs like state taxes and mortgage interest) against the standard deduction for your filing status and automatically applies the larger of the two.</li>
                            <li><strong>Finds Taxable Income:</strong> It subtracts your deduction from your AGI to determine your final taxable income.</li>
                            <li><strong>Applies Tax Brackets:</strong> It calculates your tax liability using the official progressive tax brackets for your selected year and filing status.</li>
                            <li><strong>Applies Credits:</strong> It subtracts applicable tax credits, such as the Child Tax Credit and credits for other dependents, from your tax liability.</li>
                            <li><strong>Estimates Refund/Amount Owed:</strong> Finally, it compares your total tax liability to the amount you had withheld from your paychecks to estimate whether you will receive a refund or owe more.</li>
                        </ol>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/income-tax-calculator" />
      </div>
    </div>
  );
}
