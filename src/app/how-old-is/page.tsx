
import HowOldIsCalculator from '@/components/calculators/how-old-is-calculator';
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
    title: 'How Old Is Someone? – Age Finder by Birth Date or Year',
    description: 'Quickly find out "How old is someone?" with our free age finder. Calculate age from a full date of birth, just the month and year, or only the birth year. Instant, accurate results.',
    openGraph: {
        title: 'How Old Is Someone? – Age Finder by Birth Date or Year',
        description: 'Quickly find out "How old is someone?" with our free age finder. Calculate age from a full date of birth, just the month and year, or only the birth year.',
        type: 'website',
        url: '/how-old-is',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'How Old Is Someone? – Age Finder by Birth Date or Year',
        description: 'Quickly find out "How old is someone?" with our free age finder. Calculate age from a full date of birth, just the month and year, or only the birth year.',
    },
    alternates: {
        canonical: '/how-old-is',
    },
};

const faqs = [
    { question: "How does the 'How Old Is...?' calculator work?", answer: "This tool calculates the precise duration between the entered date of birth and today's date, providing the result in years, months, and days for a full date, or as an estimate for partial dates." },
    { question: "Is this calculator accurate?", answer: "Yes, when you provide a full date of birth, it uses a precise algorithm that accounts for leap years and month lengths to give you an accurate chronological age. When using only the year or month/year, it provides a reliable estimate." },
    { question: "Can I use this tool to find out my own age?", answer: "Absolutely! Just enter your own date of birth to see your exact current age." },
    { question: "When is it useful to calculate age by year only?", answer: "This is perfect for situations where you don't know the full birth date, like for historical figures or when you only need a quick 'ballpark' age." },
    { question: "What is the fastest way to find someone's age?", answer: "This tool is designed to be the fastest way. Simply enter the information you have (year, month/year, or full date) and get an instant answer." },
    { question: "Why does the result show 'approximately' for month and year calculations?", answer: "Without the exact day of birth, it's impossible to know if the person's birthday has passed in the current year. The calculator gives the most likely age based on the information provided." },
    { question: "Is this tool free to use?", answer: "Yes, this is a 100% free online tool, available for anyone to use anytime." },
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

export default function HowOldIsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">How Old Is...? A Quick Age Finder</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Ever wondered how old a friend, family member, or celebrity is? Enter their date of birth below—with as much detail as you have—to find out their exact age instantly.
                </p>
            </div>

            <HowOldIsCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>How to Use This Flexible Age Finder</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Our tool is designed to give you an answer even with incomplete information. Simply select the tab that matches the details you have:</p>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Year Only:</strong> Perfect for a quick estimate. Just enter the 4-digit birth year for a ballpark age.</li>
                            <li><strong>Month & Year:</strong> More precise. Enter the birth month and year for a closer approximation.</li>
                            <li><strong>Full Date:</strong> The most accurate. Enter the complete date of birth (Day, Month, Year) for the exact age.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Understanding the Results</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           This tool is designed for speed and clarity. Instead of just showing numbers, it frames the result as a direct answer to your question, "How old is someone born on [Date]?".
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                            <li>When you provide a **full date**, the calculator gives you a precise age in years, months, and days.</li>
                            <li>When you provide a **month and year** or just a **year**, the tool gives you an accurate estimate. It's an approximation because without the exact day, we can't know for sure if their birthday has already passed this year.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Why a Direct Age Answer is Useful</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           This tool is ideal for quickly settling debates with friends, double-checking an age for a form, looking up the age of a public figure, or simply satisfying your curiosity. It's the fastest way to get from a question to a clear, understandable answer. For a more detailed breakdown of your own age, try our main <Link href="/age-calculator" className="text-primary hover:underline">Age Calculator</Link>.
                        </p>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions (FAQs)</h2>
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
        <RelatedCalculators currentCategory="Core Age Calculation" currentHref="/how-old-is" />
      </div>
    </div>
  );
}
