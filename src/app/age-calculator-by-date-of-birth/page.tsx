
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
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Online Age Calculator by Date of Birth - Real-Time Age Finder',
    description: 'Use our free age calculator to instantly find your exact age from your date of birth. This real-time tool provides precise results in years, months, days, hours, minutes, and seconds, updating live before your eyes.',
    alternates: {
        canonical: '/age-calculator-by-date-of-birth',
    },
};

const faqs = [
    { question: "How does this online age calculator work?", answer: "Our calculator determines your age by computing the precise time difference between your date of birth and the current date, accounting for all leap years and the varying lengths of months." },
    { question: "Is the result accurate in real time?", answer: "Yes, once you calculate your age, the timer starts and updates every second to provide a live, accurate count of your age in years, months, days, and even seconds." },
    { question: "Can I use this tool on mobile?", answer: "Absolutely. The Age Calculator Online is fully responsive and designed to work seamlessly on desktops, tablets, and mobile devices." },
    { question: "Does leap year affect the calculation?", answer: "Yes, our algorithm correctly factors in leap years to ensure the number of days is calculated with complete accuracy." },
    { question: "Can I calculate age in seconds?", answer: "Yes. The results include a detailed breakdown of your age in total seconds, minutes, hours, days, weeks, and months." },
    { question: "Is this age calculator free?", answer: "Yes, this is a 100% free online tool available for anyone to use." },
    { question: "Can I share the result?", answer: "While there isn't a dedicated share button yet, you can easily copy the results to share with friends and family. We plan to add sharing features in the future." },
    { question: "What is the most accurate way to calculate age?", answer: "The most accurate method is to calculate the duration between a person's birth date and the current date, down to the second, which is exactly what this tool does." },
    { question: "Why use an online age calculator?", answer: "An online calculator provides instant, precise, and error-free results without the need for manual calculations, making it useful for official forms, milestone tracking, or simple curiosity." },
    { question: "How can I calculate age manually?", answer: "To calculate age by hand, subtract the birth year from the current year. Then, adjust for the birth month and day. If the current date is before the birthday in the current year, subtract one year." },
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

export default function AgeCalculatorByDateOfBirthPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Online Age Calculator by Date of Birth</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Use our free age calculator to instantly find your exact age from your date of birth. This real-time tool provides precise results in years, months, days, hours, minutes, and seconds, updating live before your eyes.
                </p>
            </div>

            <ChronologicalAgeCalculatorForm />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>How to Use the Age Calculator by Date of Birth</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Your Date of Birth:</strong> Use the calendar input fields to enter the exact day, month, and year you were born.</li>
                            <li><strong>Set the "Current Date" (Optional):</strong> The calculator automatically uses today's date. You can change this to any other date to calculate the age at a specific past or future moment.</li>
                            <li><strong>Click “Calculate Age”:</strong> Press the button to see your age computed instantly.</li>
                            <li><strong>See Your Exact Age Update Live:</strong> Watch as the calculator shows your age increasing every second in real time, broken down into years, months, days, hours, minutes, and seconds.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>The Importance of a Real-Time Age Display</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           This tool does more than just give a static number. The live timer automatically updates every second to give you a precise and ever-changing view of your age. This feature highlights the dynamic nature of time and provides unparalleled accuracy for those who need it for official purposes or just for fun. It's a constant reminder of the preciousness of each moment.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Age Calculation Formula Explained</CardTitle></CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground">
                           The fundamental formula is simple: <strong>Age = Current Date - Date of Birth</strong>. However, our calculator's algorithm is more advanced. It correctly handles the varying number of days in months (e.g., 28, 30, or 31) and accurately accounts for leap years to ensure the final calculation of years, months, and days is correct. This method ensures that the result is not just an estimate but a precise reflection of the time that has passed since birth.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Expert Tips & Use Cases</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>Official Documents:</strong> Use this tool to verify your age for official forms, IDs, or applications where precise age is required.</li>
                            <li><strong>Benefit Eligibility:</strong> Quickly and accurately check your eligibility for age-restricted programs, jobs, or government benefits like Social Security.</li>
                            <li><strong>Milestone Tracking:</strong> Monitor age milestones in exact time for birthdays, anniversaries, or other important life events. Find out the exact moment you turn 10,000 days old!</li>
                            <li><strong>Historical Curiosity:</strong> Calculate the age of a historical figure at a specific point in time by setting both the date of birth and the "current date".</li>
                            <li><strong>Fun Facts:</strong> Impress your friends by telling them your age in total seconds or minutes.</li>
                        </ul>
                    </CardContent>
                </Card>

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
        <RelatedCalculators currentCategory="Other Calculators" currentHref="/age-calculator-by-date-of-birth" />
      </div>
    </div>
  );
}
