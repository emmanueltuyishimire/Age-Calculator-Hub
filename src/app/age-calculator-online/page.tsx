
import AgeCalculatorOnline from '@/components/calculators/age-calculator-online';
import { type Metadata } from 'next';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Age Calculator Online – Calculate Your Exact Age in Real Time',
    description: 'Use our free age calculator online to instantly find your exact age in years, months, days, hours, minutes, and seconds. Watch it update live in real time.',
    openGraph: {
        title: 'Age Calculator Online – Calculate Your Exact Age in Real Time',
        description: 'Use our free age calculator online to instantly find your exact age in years, months, days, hours, minutes, and seconds. Watch it update live in real time.',
        type: 'website',
        url: '/age-calculator-online',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Age Calculator Online – Calculate Your Exact Age in Real Time',
        description: 'Use our free age calculator online to instantly find your exact age in years, months, days, hours, minutes, and seconds. Watch it update live in real time.',
    },
    alternates: {
        canonical: '/age-calculator-online',
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

export default function AgeCalculatorOnlinePage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="w-full">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Age Calculator Online – Calculate Your Age Instantly</h1>
                <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
                    Our free Age Calculator Online allows you to instantly find your exact age by date of birth. This real-time age calculator is simple to use and provides precise results in years, months, days, hours, minutes, and seconds, updating live before your eyes.
                </p>
            </div>

            <AgeCalculatorOnline />

            <section className="mt-12 space-y-8 max-w-4xl mx-auto">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Use the Online Age Calculator</h2>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li><strong>Enter Your Date of Birth:</strong> Use the calendar to select your birth date.</li>
                        <li><strong>Click “Calculate Age”:</strong> Press the button to see your age instantly.</li>
                        <li><strong>See Your Exact Age Update Live:</strong> Watch as the calculator shows your age increasing every second in real time.</li>
                    </ol>
                </div>

                 <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Real-Time Age Display</h2>
                    <p className="text-muted-foreground">
                       This tool does more than just give a static number. The live timer automatically updates every second to give you a precise and ever-changing view of your age. This feature highlights the dynamic nature of time and provides unparalleled accuracy for those who need it.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Age Calculation Formula Explained</h2>
                     <p className="text-muted-foreground">
                       The fundamental formula is simple: <strong>Age = Current Date - Date of Birth</strong>. However, our calculator's algorithm is more advanced. It correctly handles the varying number of days in months (e.g., 28, 30, or 31) and accurately accounts for leap years to ensure the final calculation of years, months, and days is correct.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Expert Tips</h2>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Use this tool to verify your age for official forms, IDs, or applications where precise age is required.</li>
                        <li>Check your eligibility for age-restricted programs, jobs, or benefits quickly and accurately.</li>
                        <li>Monitor age milestones in exact time for birthdays, anniversaries, or other important life events.</li>
                    </ul>
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

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Related Tools</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <Link href="/age-calculator" className="text-primary hover:underline">Birthday Age Calculator</Link>
                        <Link href="/pet-age" className="text-primary hover:underline">Dog & Cat Age Calculator</Link>
                        <Link href="/biological-age" className="text-primary hover:underline">Biological Age Calculator</Link>
                        <Link href="/retirement-age" className="text-primary hover:underline">Retirement Age Calculator</Link>
                        <Link href="/gestational-age" className="text-primary hover:underline">Gestational Age Calculator</Link>
                         <Link href="/health-assessments" className="text-primary hover:underline">Health Assessment Tools</Link>
                    </div>
                </div>
            </section>
        </main>
      </div>
    </div>
  );
}
