
import AgeCalculatorByYear from '@/components/calculators/age-calculator-by-year';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
    { question: "Is this calculator accurate?", answer: "It provides a good estimate, but it can be off by one year because it does not account for the month and day of birth. For exact age, use our full Date of Birth Age Calculator." },
    { question: "When should I use this calculator?", answer: "This tool is perfect for situations where you only need a quick, approximate age and don't have the full date of birth available." },
    { question: "Is this tool free to use?", answer: "Yes, this is a completely free online tool for anyone to use." },
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
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="w-full" role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Age Calculator by Year</h1>
                <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
                    Need a quick age estimate? Just enter a year of birth to get an approximate age. This tool is perfect for when you don't need an exact age down to the day.
                </p>
            </div>

            <AgeCalculatorByYear />

            <section className="mt-12 space-y-8 max-w-4xl mx-auto">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Use This Calculator</h2>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li><strong>Enter the Year of Birth:</strong> Type the 4-digit birth year into the input field.</li>
                        <li><strong>Click “Calculate Age”:</strong> Press the button to see the estimated age instantly.</li>
                        <li><strong>View the Result:</strong> The calculator will show the approximate age for the current year.</li>
                    </ol>
                </div>

                 <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">The Formula Explained</h2>
                     <p className="text-muted-foreground">
                       This calculator uses the simplest formula for determining age: <strong>Age ≈ Current Year - Birth Year</strong>. This gives you the age a person will be on their birthday during the current year. For example, in 2024, someone born in 1990 is considered 34 years old for the purpose of this calculation, even if their birthday hasn't occurred yet.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">When to Use an Age by Year Calculator</h2>
                    <p className="text-muted-foreground">
                        This tool is ideal for casual use where precision is not critical. It's helpful for quickly estimating someone's age group, for historical research when only a birth year is known, or for any situation where a ballpark figure is sufficient.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions (FAQs)</h2>
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
      </div>
    </div>
  );
}
