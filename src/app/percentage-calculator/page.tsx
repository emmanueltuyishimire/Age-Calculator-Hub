
import PercentageCalculator from '@/components/calculators/percentage-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Percentage Calculators</CardTitle>
                        <CardDescription>
                            This page contains four distinct calculators. Here’s how each one works.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg">1. Standard Percentage Calculator</h3>
                            <p className="text-muted-foreground">This solves the equation "[P]% of [X] = [Y]". Fill in any two of the three fields to calculate the missing value. For example, to find 25% of 200, enter '25' in the first box, '200' in the second, leave the third blank, and click 'Calculate'.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">2. Percentage in Common Phrases</h3>
                            <p className="text-muted-foreground">This tool lets you solve common percentage problems framed as everyday questions. Simply fill in the blanks for questions like "What is X% of Y?" or "X is what % of Y?" and click the question mark button to get the answer.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">3. Percentage Difference Calculator</h3>
                            <p className="text-muted-foreground">Use this to find the percentage difference between two numbers. This calculation treats both numbers equally, so the order you enter them in doesn't matter. It's useful for comparing two data points without implying one is an 'original' value.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">4. Percentage Change Calculator</h3>
                            <p className="text-muted-foreground">Use this to calculate the percentage increase or decrease from a starting value to an ending value. Enter the "From" (original) value and the "To" (new) value to see the change. The result will indicate whether it was an increase or a decrease.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Math & Finance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/the-power-of-compound-interest" className="text-primary hover:underline">The Power of Compound Interest</Link></li>
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
        <RelatedCalculators currentCategory="Math Calculators" currentHref="/percentage-calculator" />
      </div>
    </div>
  );
}
