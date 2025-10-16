
import EstateTaxCalculator from '@/components/calculators/estate-tax-calculator';
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
    title: 'Federal Estate Tax Calculator – Estimate Your Estate Tax',
    description: 'Use our free Estate Tax Calculator to estimate your federal estate tax liability. Input your assets and liabilities to see the potential tax owed based on historical and current exemption amounts.',
    alternates: {
        canonical: '/estate-tax-calculator',
    },
};

const faqs = [
    {
        question: "What is the federal estate tax?",
        answer: "The federal estate tax is a tax on the transfer of property after a person's death. It is levied on the 'taxable estate,' which is the total value of a person's assets minus their liabilities and certain deductions."
    },
    {
        question: "What is the estate tax exemption for 2024?",
        answer: "For 2024, the federal estate tax exemption is $13.61 million per individual. This means an individual can pass on up to $13.61 million without incurring any federal estate tax."
    },
    {
        question: "Does this calculator account for state estate taxes?",
        answer: "No, this calculator is for federal estate tax estimation only. Some states have their own separate estate or inheritance taxes, which often have much lower exemption amounts. You should consult a local professional for state-specific advice."
    },
    {
        question: "Is life insurance part of the taxable estate?",
        answer: "Generally, yes. If you are the owner of the life insurance policy on your own life, the death benefit is typically included in your gross estate for tax purposes."
    },
    {
        question: "Is this calculator a substitute for legal or financial advice?",
        answer: "Absolutely not. This is a simplified estimator for informational purposes only. Estate tax law is extremely complex. You must consult with a qualified estate planning attorney and a financial advisor for personalized advice."
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

export default function EstateTaxCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Federal Estate Tax Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Get a simple estimate of the potential federal estate tax liability. This tool is for informational purposes only.
                </p>
            </div>

            <EstateTaxCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive" />Important Disclaimer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-destructive-foreground font-semibold">
                            This calculator provides a simplified estimate for U.S. federal estate tax and is for educational purposes only. It does not account for state-level taxes, portability, or other complex estate planning strategies. It is NOT a substitute for legal or financial advice. You must consult with a qualified attorney and financial advisor for advice on your specific situation.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>How This Calculator Works</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Calculate Gross Estate:</strong> Sum the value of all assets, including real estate, investments, savings, retirement plans, and life insurance benefits.</li>
                            <li><strong>Subtract Liabilities and Deductions:</strong> Subtract debts, final expenses, and charitable contributions to get the Net Estate.</li>
                            <li><strong>Calculate Taxable Estate:</strong> The calculator subtracts the lifetime gift tax exemption used from the Net Estate.</li>
                            <li><strong>Apply Federal Exemption:</strong> It then subtracts the applicable federal estate tax exemption for the selected year of death.</li>
                            <li><strong>Estimate Tax:</strong> If the remaining amount is positive, it applies the top federal estate tax rate for that year to estimate the potential tax due.</li>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/estate-tax-calculator" />
      </div>
    </div>
  );
}
