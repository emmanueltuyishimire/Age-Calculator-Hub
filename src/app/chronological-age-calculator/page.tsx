
"use client";

import ChronologicalAgeCalculatorForm from '@/components/calculators/chronological-age-calculator-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const faqs = [
    {
        question: "What is chronological age?",
        answer: "Chronological age is the most common measure of age, representing the exact amount of time that has passed from your date of birth to the present moment. It's expressed in years, months, and days."
    },
    {
        question: "How is chronological age calculated?",
        answer: "It is calculated by subtracting the date of birth from the current date (or another specified date). A precise calculation must account for the different number of days in months and for leap years, which our calculator does automatically."
    },
    {
        question: "Is this calculator free?",
        answer: "Yes, this chronological age calculator is a completely free online tool."
    },
    {
        question: "How does chronological age differ from biological age?",
        answer: "Chronological age is a fixed measure of time. <a href='/biological-age' class='text-primary hover:underline'>Biological age</a>, in contrast, is a measure of how well your body is functioning and can be influenced by lifestyle, genetics, and health factors."
    },
    {
        question: "Why is knowing my chronological age important?",
        answer: "It's essential for legal and official purposes, including applying for a driver's license, passport, or social security benefits, as well as for school enrollment and employment eligibility."
    },
    {
        question: "Can I calculate my age on a future date?",
        answer: "Yes. In the 'Age at the Date of' field, you can enter any future date to see how old you will be at that specific time."
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

export default function ChronologicalAgeCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Chronological Age Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Calculate your precise chronological age in years, months, and days with our easy-to-use online tool. Simply enter your date of birth and see your exact age instantly.
                </p>
            </div>

            <ChronologicalAgeCalculatorForm />

            <section className="mt-12 space-y-8 animate-fade-in">

                <Card>
                    <CardHeader><CardTitle>How to Use the Chronological Age Calculator</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           Our tool uses a precise algorithm to give you an accurate result. Here’s a quick guide:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground mt-4">
                            <li>Enter your full <strong>Date of Birth</strong> using the date picker.</li>
                            <li>The <strong>Age at the Date of</strong> field is set to today by default, but you can change it to any past, present, or future date.</li>
                            <li>Click "Calculate Your Age" to see the exact time interval between the two dates, presented as your chronological age.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Understanding Chronological Age</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           Chronological age is the most straightforward and universally accepted measure of age. It represents the exact amount of time you have been alive since the moment you were born. This is the age that appears on your legal documents and is used to determine eligibility for societal rights and privileges, such as voting, driving, and retirement.
                        </p>
                        <p className="text-muted-foreground mt-2">
                            Unlike <Link href="/biological-age" className="text-primary hover:underline">biological age</Link>, which reflects your body's health, chronological age is a simple, objective measure of time. Our calculator provides a precise measurement, breaking down your age into years, months, and days, and can even update in real-time to the second. For a deeper dive, read our <Link href="/articles/understanding-chronological-age" className="text-primary hover:underline">article on chronological age</Link>.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Learn More About Different Types of Age</CardTitle></CardHeader>
                    <CardContent>
                       <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/understanding-chronological-age" className="text-primary hover:underline">Understanding Chronological Age: More Than Just a Number</Link></li>
                            <li>Explore a different perspective with our <Link href="/biological-age" className="text-primary hover:underline">Biological Age Calculator</Link>.</li>
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
        <RelatedCalculators currentCategory="Other Calculators" currentHref="/chronological-age-calculator" />
      </div>
    </div>
  );
}
