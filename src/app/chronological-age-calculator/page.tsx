
import AgeCalculator from '@/components/calculators/age-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Chronological Age Calculator – Find Your Exact Age by Date',
    description: 'Use our free Chronological Age Calculator to determine your exact age in years, months, and days from your date of birth. The most accurate and simple way to calculate chronological age online.',
    openGraph: {
        title: 'Chronological Age Calculator – Find Your Exact Age by Date',
        description: 'Use our free Chronological Age Calculator to determine your exact age in years, months, and days from your date of birth. The most accurate and simple way to calculate chronological age online.',
        type: 'website',
        url: '/chronological-age-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Chronological Age Calculator – Find Your Exact Age by Date',
        description: 'Use our free Chronological Age Calculator to determine your exact age in years, months, and days from your date of birth. The most accurate and simple way to calculate chronological age online.',
    },
    alternates: {
        canonical: '/chronological-age-calculator',
    },
};

const faqs = [
    {
        question: "What is chronological age?",
        answer: "Chronological age is the measure of time that has passed from a person's date of birth to a given date. It's the most common way of expressing age."
    },
    {
        question: "How is chronological age calculated?",
        answer: "It is calculated by subtracting the date of birth from the current date (or another specified date). The result is typically shown in years, months, and days, accounting for leap years."
    },
    {
        question: "Is this calculator free?",
        answer: "Yes, this chronological age calculator is a completely free online tool."
    },
    {
        question: "How does this differ from biological age?",
        answer: "Chronological age is a measure of time, while biological age is a measure of how well your body is functioning and can be influenced by lifestyle factors."
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
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="w-full lg:w-2/3" role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Chronological Age Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Calculate your precise chronological age in years, months, and days with our easy-to-use online tool. Simply enter your date of birth and see your exact age instantly.
                </p>
            </div>

            <AgeCalculator />

            <section className="mt-12 space-y-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding Chronological Age</h2>
                    <p className="text-muted-foreground">
                       Chronological age is the most straightforward and universally accepted measure of age. It represents the exact amount of time you have been alive. This calculator provides a precise measurement, breaking down your age into years, months, and days, and even updating in real-time to the second.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">FAQs About Chronological Age</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <aside className="w-full lg:w-1/3">
             <div className="ad-slot border-dashed border-2 p-10 text-center sticky top-20 min-h-[250px] hidden lg:block" aria-label="Advertisement"></div>
        </aside>
      </div>
    </div>
  );
}
