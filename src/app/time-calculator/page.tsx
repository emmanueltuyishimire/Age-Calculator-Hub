
import TimeCalculator from '@/components/calculators/time-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';

export const metadata: Metadata = {
    title: 'Time Calculator – Duration Between Dates & Time Adder/Subtractor',
    description: 'Use our free Time Calculator to find the duration between two dates and times, or to add or subtract years, months, days, hours, and minutes from a specific date.',
    alternates: {
        canonical: '/time-calculator',
    },
};

const faqs = [
    {
        question: "How do you calculate the duration between two dates?",
        answer: "You find the total number of days, hours, minutes, and seconds between the start and end date. Our 'Time Between Dates' calculator automates this for you, even accounting for leap years."
    },
    {
        question: "How do I add or subtract time from a date?",
        answer: "Use the 'Add or Subtract Time' tab. Enter a starting date and then input the amount of years, months, days, hours, etc., you want to add or subtract to get the resulting date and time."
    },
    {
        question: "Can this calculator handle different time zones?",
        answer: "The calculations are based on the date and time values you enter and do not automatically adjust for time zones. For best results, use a consistent time reference."
    },
    {
        question: "Is this calculator accurate for billing or legal purposes?",
        answer: "This tool provides accurate calculations based on the standard calendar but should be used for informational purposes. For precise billing or legal timekeeping, always verify with an official system."
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

export default function TimeCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-2xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Time Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    A versatile tool to calculate the duration between two dates or to add and subtract time from a starting date.
                </p>
            </div>

            <TimeCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
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
        <RelatedCalculators currentCategory="Math" currentHref="/time-calculator" />
      </div>
    </div>
  );
}
