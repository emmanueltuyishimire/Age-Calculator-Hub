
import TimeCalculator from '@/components/calculators/time-calculator';
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
        answer: "The calculations are based on the date and time values you enter and do not automatically adjust for time zones. For best results, use a consistent time reference for both start and end points."
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

                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Time Calculator</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                       <p>Our calculator has two main functions. Select the tab that fits your needs:</p>
                        <div>
                            <h3 className="font-semibold text-foreground">1. Time Between Dates</h3>
                             <ol className="list-decimal list-inside space-y-2 mt-2">
                                <li><strong>Set the Start Date & Time:</strong> Use the calendar and time inputs for the beginning of your period.</li>
                                <li><strong>Set the End Date & Time:</strong> Enter the end point of your duration.</li>
                                <li><strong>Click "Calculate Duration":</strong> Instantly see the total time elapsed, broken down into years, months, days, hours, minutes, and seconds.</li>
                            </ol>
                        </div>
                         <div>
                            <h3 className="font-semibold text-foreground">2. Add or Subtract Time</h3>
                             <ol className="list-decimal list-inside space-y-2 mt-2">
                                <li><strong>Set the Start Date & Time:</strong> Enter the initial date you want to calculate from.</li>
                                <li><strong>Choose Operation:</strong> Select whether you want to "Add" or "Subtract" time.</li>
                                <li><strong>Enter Duration:</strong> Input the amount of years, months, days, etc., you want to add or subtract. You can use multiple fields at once.</li>
                                <li><strong>Click "Calculate New Date":</strong> The calculator will show you the exact resulting date and time.</li>
                            </ol>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Practical Uses for the Time Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">This tool is useful for a wide range of everyday and professional tasks:</p>
                        <ul className="list-disc list-inside space-y-2 mt-2 text-muted-foreground">
                            <li><strong>Project Management:</strong> Calculate project durations and estimate deadlines.</li>
                            <li><strong>Event Planning:</strong> Determine the time remaining until a wedding, vacation, or other important event.</li>
                             <li><strong>Personal Milestones:</strong> Find out exactly how old you are in days, or how long you've been at a job. For your precise age, try our <Link href="/age-calculator" className="text-primary hover:underline">Age Calculator</Link>.</li>
                            <li><strong>Logistics and Scheduling:</strong> Calculate travel times or work back from a deadline to set start dates.</li>
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
        <RelatedCalculators currentCategory="Math" currentHref="/time-calculator" />
      </div>
    </div>
  );
}

