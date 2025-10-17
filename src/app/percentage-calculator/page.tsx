
import PercentageCalculator from '@/components/calculators/percentage-calculator';
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
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Percentage Calculator – Find Percentages, Differences & Changes',
    description: 'A free, all-in-one Percentage Calculator to solve for percentages, find the percentage difference between two numbers, and calculate percentage increase or decrease. Fast and easy to use.',
    alternates: {
        canonical: '/percentage-calculator',
    },
};

const faqs = [
    {
        question: "How do you calculate a percentage of a number?",
        answer: "To find a percentage of a number, convert the percentage to a decimal by dividing it by 100, then multiply the decimal by the number. For example, to find 20% of 150, you calculate 0.20 * 150 = 30."
    },
    {
        question: "How do you calculate what percentage one number is of another?",
        answer: "To find what percentage X is of Y, you divide X by Y and then multiply the result by 100. For example, to find what percentage 30 is of 150, you calculate (30 / 150) * 100 = 20%."
    },
    {
        question: "How do you calculate percentage difference?",
        answer: "The percentage difference between two numbers is the absolute difference between them, divided by their average, all multiplied by 100. The formula is |V1 - V2| / ((V1 + V2) / 2) * 100."
    },
    {
        question: "What is the difference between percentage difference and percentage change?",
        answer: "Percentage difference measures the difference between two values relative to their average, without regard to which is the 'start' or 'end' value. Percentage change (increase or decrease) measures the change from an original value to a new value."
    },
    {
        question: "How do you calculate percentage increase?",
        answer: "To calculate percentage increase, subtract the original value from the new value, divide the result by the original value, and multiply by 100. For example, an increase from 100 to 120 is a ((120 - 100) / 100) * 100 = 20% increase."
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

export default function PercentageCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Percentage Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    A suite of free tools to help you with all your percentage calculation needs, from simple percentages to percentage change and difference.
                </p>
            </div>

            <PercentageCalculator />

            <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
                <Card>
                    <CardHeader>
                        <CardTitle>What is a percentage?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                         <p>In mathematics, a percentage is a number or ratio that represents a fraction of 100. It is one of the ways to represent a dimensionless relationship between two numbers; other methods include ratios, fractions, and decimals. Percentages are often denoted by the symbol "%" written after the number. They can also be denoted by writing "percent" or "pct" after the number. For example, 35% is equivalent to the decimal 0.35, or the fraction 35/100.</p>
                        <p>Percentages are computed by multiplying the value of a ratio by 100. For example, if 25 out of 50 students in a classroom are male, the percentage of male students is 25/50 = 0.5, and multiplying this by 100 yields 50%. In other words, the ratio of 25 males to students in the classroom is equivalent to 50% of students in the classroom being male.</p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Percentage Formula</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Although the percentage formula can be written in different forms, it is essentially an algebraic equation involving three values:</p>
                        <div className="p-4 bg-muted rounded-md font-mono text-center">P × V1 = V2</div>
                        <p>P is the percentage, V1 is the first value that the percentage will modify, and V2 is the result of the percentage operating on V1. The calculator provided automatically converts the input percentage into a decimal to compute the solution. However, if solving for the percentage, the value returned will be the actual percentage, not its decimal representation.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Percentage Difference Formula</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>The percentage difference between two values is calculated by dividing the absolute value of the difference between two numbers by the average of those two numbers. Multiplying the result by 100 will yield the solution in percent, rather than decimal form.</p>
                        <div className="p-4 bg-muted rounded-md font-mono text-center">Percentage Difference = (|V1 - V2| / ((V1 + V2)/2)) × 100</div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Percentage Change Formula</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Percentage increase and decrease are calculated by computing the difference between two values and comparing that difference to the initial value. Mathematically, this involves using the absolute value of the difference between two values then dividing the result by the initial value, essentially calculating how much the initial value has changed.</p>
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
        <RelatedCalculators currentCategory="Math Calculators" currentHref="/percentage-calculator" />
      </div>
    </div>
  );
}
