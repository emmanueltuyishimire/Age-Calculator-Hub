
import ChronologicalAgeCalculatorForm from '@/components/calculators/chronological-age-calculator-form';
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
    title: 'Age Calculator – Calculate Your Exact Age Online',
    description: `Our age calculator allows you to calculate your exact age by date of birth, by year, or by birthday. This online age calculator is easy to use and provides instant results for anyone looking to track their age accurately. It's a useful tool for official documents, understanding age-related milestones, or simply celebrating another year of life.`,
    alternates: {
        canonical: '/age-calculator',
    },
};

const faqs = [
    {
        question: "What is the easiest way to calculate age?",
        answer: "The easiest way is to use a reliable online tool like this Age Calculator. It automatically handles all the complexities like month lengths and leap years. Just enter the date of birth and get an instant, accurate result."
    },
    {
        question: "How does an age calculator work?",
        answer: `Age calculators work by finding the interval between two dates. It subtracts the birth date from the current date (or a date you specify), accurately accounting for the different number of days in months and for leap years to provide a precise age in years, months, and days.`
    },
    {
        question: "Can I find my age in days or weeks?",
        answer: "Yes. Our calculator provides a detailed breakdown of your age in other units, including total months, weeks, days, hours, minutes, and seconds."
    },
    {
        question: "How accurate is this online age calculator?",
        answer: "This calculator is highly accurate. It uses precise date and time functions to give you your exact age down to the second, correctly handling all calendar variations like leap years."
    },
    {
        question: "Can I calculate my age for a future date?",
        answer: "Yes. You can use the 'Age at the Date of' field to select any date in the future. The calculator will tell you exactly how old you will be on that specific day."
    },
    {
        question: "Does the age calculator handle birthdays on February 29th?",
        answer: "Yes, our calculator correctly processes leap year birthdays, ensuring you get an accurate age regardless of when you were born."
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

export default function AgeCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Age Calculator: Find Your Exact Age</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Get your precise chronological age in years, months, and days, with a real-time update down to the second. A perfect tool for anyone wondering, "How old am I today?".
                </p>
            </div>

            <ChronologicalAgeCalculatorForm />

            <section className="mt-12 space-y-8 animate-fade-in">
                 <Card>
                    <CardHeader><CardTitle>Learn More About Age & Time</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/understanding-chronological-age" className="text-primary hover:underline">Understanding Chronological Age: More Than Just a Number</Link></li>
                            <li><Link href="/articles/what-generation-am-i" className="text-primary hover:underline">What Generation Am I? Find Your Cohort</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>How to Use the Age Calculator</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Your Date of Birth:</strong> Use the dropdown menus or calendar to select your exact birth date.</li>
                            <li><strong>Set the "Age at" Date:</strong> By default, this is set to today. You can change it to any past or future date to calculate age for a specific point in time.</li>
                            <li><strong>Click “Calculate”:</strong> Get an instant and precise age breakdown, along with your age in different units like total weeks, days, and hours.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Why Use Our Chronological Age Calculator?</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                       <p className="text-muted-foreground">Knowing your precise age is essential for a variety of reasons, from legal and financial matters to personal milestones.</p>
                        <ul className="space-y-3">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Unmatched Precision:</strong> Our tool calculates age down to the second, accounting for every leap year and month length, providing a result you can trust for official forms or personal records.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Versatile Calculations:</strong> Find out your age today, how old you were on a historical date, or how old you will be on a future date.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Interesting Insights:</strong> Discover your age in different units—like total weeks, days, or even minutes—to get a new perspective on your life's timeline.</span></li>
                        </ul>
                         <p className="text-muted-foreground mt-4">This calculator is your go-to tool for a quick, accurate, and detailed answer to "How old am I?". For a different perspective, try our <Link href="/biological-age" className="text-primary hover:underline">Biological Age Calculator</Link> to see how your lifestyle impacts your body's health age.</p>
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
        <RelatedCalculators currentCategory="Core Age Calculators" currentHref="/age-calculator" />
      </div>
    </div>
  );
}
