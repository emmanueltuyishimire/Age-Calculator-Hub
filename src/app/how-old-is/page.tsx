
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
    title: 'How Old Is Someone? - Quick Age Finder by Birth Date',
    description: 'A simple tool to answer the question "How old is someone?" Instantly find the exact age of any person by entering their date of birth. Accurate, fast, and free.',
    openGraph: {
        title: 'How Old Is Someone? - Quick Age Finder by Birth Date',
        description: 'A simple tool to answer the question "How old is someone?" Instantly find the exact age of any person by entering their date of birth.',
        type: 'website',
        url: '/how-old-is',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'How Old Is Someone? - Quick Age Finder by Birth Date',
        description: 'A simple tool to answer the question "How old is someone?" Instantly find the exact age of any person by entering their date of birth.',
    },
    alternates: {
        canonical: '/how-old-is',
    },
};

const faqs = [
    { question: "How does this 'How Old Is...?' calculator work?", answer: "This tool calculates the precise duration between the entered date of birth and today's date, providing the result in years, months, and days." },
    { question: "Is this calculator accurate?", answer: "Yes, it uses a precise algorithm that accounts for leap years and the different lengths of months to give you a completely accurate chronological age." },
    { question: "Can I use this tool to find out my own age?", answer: "Absolutely! Just enter your own date of birth to see your exact current age." },
    { question: "Is this tool free to use?", answer: "Yes, this is a 100% free online tool, available for anyone to use anytime." },
    { question: "What's the difference between this and a regular age calculator?", answer: "This tool is specifically designed and optimized to quickly answer the common question 'How old is...?' for a given birth date, presenting the information as a direct answer." },
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
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">How Old Is...?</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Ever wonder how old a friend, family member, or celebrity is? Enter their date of birth below to find out their exact age instantly.
                </p>
            </div>

            <HowOldIsCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>How to Use This Age Finder</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter the Date of Birth:</strong> Use the calendar inputs to enter the exact day, month, and year of the person's birth.</li>
                            <li><strong>Click “Find Out How Old They Are”:</strong> Press the button to get the result.</li>
                            <li><strong>See the Direct Answer:</strong> The calculator will show you a clear answer, stating exactly how old the person is today.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Why a Direct Age Answer is Useful</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           This tool is designed for speed and clarity. Instead of just showing numbers, it frames the result as a direct answer to your question, "How old is someone born on [Date]?". This is perfect for quickly settling debates, filling out forms, or satisfying your curiosity without any extra steps. It's the fastest way to get from a question to an answer.
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
