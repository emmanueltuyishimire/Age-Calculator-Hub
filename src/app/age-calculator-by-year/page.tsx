
import AgeCalculatorByYear from '@/components/calculators/age-calculator-by-year';
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
    title: 'Age Calculator by Year - Quick Age Estimate from Birth Year',
    description: 'A simple and free tool to quickly estimate age by only entering the year of birth. Get an approximate age instantly without needing the full date. Perfect for quick calculations.',
    openGraph: {
        title: 'Age Calculator by Year - Quick Age Estimate from Birth Year',
        description: 'A simple and free tool to quickly estimate age by only entering the year of birth. Get an approximate age instantly without needing the full date.',
        type: 'website',
        url: '/age-calculator-by-year',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Age Calculator by Year - Quick Age Estimate from Birth Year',
        description: 'A simple and free tool to quickly estimate age by only entering the year of birth. Get an approximate age instantly without needing the full date.',
    },
    alternates: {
        canonical: '/age-calculator-by-year',
    },
};

const faqs = [
    { question: "How does the age by year calculator work?", answer: "It uses a simple formula: Current Year - Birth Year. This provides the age a person will be on their birthday in the current year." },
    { question: "Is this calculator accurate?", answer: "It provides a good estimate, but it can be off by one year because it does not account for the month and day of birth. For exact age, use our full <a href='/age-calculator' class='text-primary hover:underline'>Date of Birth Age Calculator</a>." },
    { question: "When should I use this calculator?", answer: "This tool is perfect for situations where you only need a quick, approximate age and don't have the full date of birth available." },
    { question: "Is this tool free to use?", answer: "Yes, this is a completely free online tool for anyone to use." },
    { question: "Can I use this for historical figures?", answer: "Yes, this is a great tool for quickly estimating the age of a historical figure during a specific event, as long as you know their birth year." },
    { question: "Does this calculator tell me if someone is a specific age yet?", answer: "No. It calculates the age they will be at some point during the current calendar year. Their actual current age could be one year less if their birthday hasn't occurred yet." },
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

export default function AgeCalculatorByYearPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Age Calculator by Year</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Need a quick age estimate? Just enter a year of birth to get an approximate age. This tool is perfect for when you don't need an exact age down to the day.
                </p>
            </div>

            <AgeCalculatorByYear />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>How to Use This Calculator</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter the Year of Birth:</strong> Type the 4-digit birth year into the input field.</li>
                            <li><strong>Click “Calculate Age”:</strong> Press the button to see the estimated age instantly.</li>
                            <li><strong>View the Result:</strong> The calculator will show the approximate age for the current year. This is the age the person will be on their birthday in this calendar year.</li>
                        </ol>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader><CardTitle>The Formula Explained: Simple and Fast</CardTitle></CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground">
                           This calculator uses the simplest formula for determining age: <strong>Age ≈ Current Year - Birth Year</strong>. This gives you the age a person will turn on their birthday during the current year. For example, in 2024, someone born in 1990 is considered 34 years old for the purpose of this calculation, even if their birthday hasn't occurred yet. This is often called "calendar age" or "nominal age". Read our full guide on <Link href="/articles/how-to-calculate-age-from-year-of-birth" className="text-primary hover:underline">how to calculate age from a birth year</Link> to learn more.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>When to Use an Age by Year Calculator</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            This tool is ideal for casual use where precision is not critical. It's helpful for:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>Quickly estimating someone's age group in a conversation.</li>
                            <li>Demographic or historical research when only a birth year is known.</li>
                            <li>Any situation where a ballpark figure is sufficient and you don't have the full date of birth.</li>
                        </ul>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader><CardTitle>Understanding the Limitation: The One-Year Margin</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            The main limitation of this method is that it doesn't account for the month and day of birth. Therefore, the result can be off by one year. If a person's birthday has not yet passed in the current year, their actual age will be one year less than the number shown. For 100% accuracy, you must use the full date of birth with our main <Link href="/age-calculator" className="text-primary hover:underline">Age Calculator</Link>.
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
        <RelatedCalculators currentCategory="Core Age Calculators" currentHref="/age-calculator-by-year" />
      </div>
    </div>
  );
}
