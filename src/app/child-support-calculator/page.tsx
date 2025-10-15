
import ChildSupportEstimator from '@/components/calculators/child-support-estimator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Scale, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Child Support Calculator – Estimate Your Payment',
    description: 'Use our free Child Support Calculator to get a simple estimate of your potential child support payments based on income, number of children, and custody arrangements. For informational purposes only.',
    alternates: {
        canonical: '/child-support-calculator',
    },
};

const faqs = [
    {
        question: "How is child support generally calculated?",
        answer: "Most states use an 'Income Shares' model, where the court estimates the total amount parents would spend on a child if they were together and then splits that amount proportionally based on their incomes. Our calculator uses a simplified version of this model."
    },
    {
        question: "Is this calculator legally accurate for my state?",
        answer: "No. This calculator provides a simplified, educational estimate and does not use the specific, complex formula for your state. Child support guidelines vary significantly by state and include many factors not covered here. This tool is for informational purposes only."
    },
    {
        question: "What is 'gross income'?",
        answer: "Gross income is your total earnings before any taxes or other deductions are taken out. It typically includes salary, wages, bonuses, and sometimes other sources of income."
    },
    {
        question: "How does custody arrangement affect the calculation?",
        answer: "The amount of time a child spends with each parent (overnights) can significantly impact the final child support amount. In shared or split custody situations, the calculations are often adjusted to reflect the costs each parent incurs."
    },
    {
        question: "What should I do to get an accurate child support figure?",
        answer: "To get an accurate figure, you must consult a qualified legal professional in your state and refer to your state's official child support guidelines and worksheets. This calculator is not a substitute for legal advice."
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

export default function ChildSupportCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Child Support Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Get a basic estimate of potential child support payments. This tool is for informational purposes only and is not legal advice.
                </p>
            </div>

            <ChildSupportEstimator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive" />Important Disclaimer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-destructive-foreground font-semibold">
                            This calculator provides a simplified estimate for educational purposes only. It is NOT a substitute for legal advice and does NOT use the specific formula for your state. Child support laws are complex and vary significantly by jurisdiction. For an accurate calculation, you must consult a qualified family law attorney and refer to your state's official child support guidelines.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>How This Child Support Estimator Works</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">This tool is based on a simplified "Income Shares Model," which is the most common method used in the United States. Here’s the basic idea:</p>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground mt-4">
                            <li>The calculator combines both parents' gross monthly incomes to determine a total 'household' income.</li>
                            <li>It applies a standard percentage to this income based on the number of children to estimate the basic child support obligation.</li>
                            <li>This total obligation is then divided between the parents based on their proportional share of the combined income.</li>
                            <li>The result shown is the estimated amount the non-custodial parent might pay to the custodial parent. This does not account for shared custody or other complex factors.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Key Factors That Influence Child Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground mb-4">
                            Official state calculations are far more detailed than our simple estimator. They often include:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <Scale className="h-8 w-8 text-primary mt-1 shrink-0"/>
                                <div>
                                    <h3 className="font-semibold">Income of Both Parents</h3>
                                    <p className="text-sm text-muted-foreground">The primary factor is the income of both the custodial and non-custodial parent.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Users className="h-8 w-8 text-primary mt-1 shrink-0"/>
                                <div>
                                    <h3 className="font-semibold">Custody Arrangements</h3>
                                    <p className="text-sm text-muted-foreground">The number of overnights the children spend with each parent can significantly adjust the final amount.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Users className="h-8 w-8 text-primary mt-1 shrink-0"/>
                                <div>
                                    <h3 className="font-semibold">Additional Costs</h3>
                                    <p className="text-sm text-muted-foreground">Costs for health insurance, childcare, and extraordinary medical expenses are often added to the basic obligation.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Scale className="h-8 w-8 text-primary mt-1 shrink-0"/>
                                <div>
                                    <h3 className="font-semibold">Other Dependents</h3>
                                    <p className="text-sm text-muted-foreground">Support obligations for children from other relationships can also be a factor in some states.</p>
                                </div>
                            </div>
                        </div>
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
        <RelatedCalculators currentCategory="Financial Planning" currentHref="/child-support-calculator" />
      </div>
    </div>
  );
}
