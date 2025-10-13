
import AgeCalculator from '@/components/calculators/age-calculator';
import { type Metadata } from 'next';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Age Calculator – Calculate Your Age by Date of Birth in Real Time',
    description: 'Free online age calculator to find your exact age in years, months, days, hours, minutes, and seconds. Calculate your age by date of birth instantly and watch it update in real time.',
    openGraph: {
        title: 'Age Calculator – Calculate Your Age by Date of Birth in Real Time',
        description: 'Free online age calculator to find your exact age in years, months, days, hours, minutes, and seconds. Calculate your age by date of birth instantly and watch it update in real time.',
        type: 'website',
        url: '/age-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Age Calculator – Calculate Your Age by Date of Birth in Real Time',
        description: 'Free online age calculator to find your exact age in years, months, days, hours, minutes, and seconds. Calculate your age by date of birth instantly and watch it update in real time.',
    },
    alternates: {
        canonical: '/age-calculator',
    },
};

const faqs = [
    {
        question: "How is age calculated in this tool?",
        answer: "Our calculator determines age by finding the total time elapsed between your date of birth and the specified 'Age at Date of' (or today's date). It accounts for differences in month lengths and leap years to provide a precise result."
    },
    {
        question: "Does it update my age automatically?",
        answer: "Yes! After you click 'Calculate Your Age Now Online', the calculator begins a real-time countdown, updating the seconds, minutes, and other units automatically."
    },
    {
        question: "Can I calculate my age in months or seconds?",
        answer: "Absolutely. The results include a detailed breakdown of your age in total months, weeks, days, hours, minutes, and seconds."
    },
    {
        question: "Why is real-time calculation useful?",
        answer: "Real-time updates provide a dynamic and engaging way to see your age with second-by-second precision, which can be fun for birthdays or simply for accuracy."
    },
    {
        question: "Can I use this for someone else’s birthday?",
        answer: "Yes, you can enter any valid date of birth to calculate the age of a friend, family member, or for any other purpose."
    },
    {
        question: "Does leap year affect the calculation?",
        answer: "Yes, our algorithm correctly accounts for leap years to ensure the calculation of days and years is accurate."
    },
    {
        question: "How accurate is this online age calculator?",
        answer: "This calculator is highly accurate as it bases its calculations on the precise time difference between the two dates you provide, down to the second."
    },
    {
        question: "Can I share my results?",
        answer: "Currently, you can manually share the results by copying the text. We plan to add dedicated 'Copy' and 'Share' buttons in a future update."
    },
    {
        question: "Is this age calculator free?",
        answer: "Yes, this is a completely free online tool."
    },
    {
        question: "How can I calculate age manually?",
        answer: "To calculate age manually, subtract the birth year from the current year. Then, adjust for the birth month and day. If the current month and day are before the birth month and day, subtract one year from the total."
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
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="w-full lg:w-2/3" role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Age Calculator – Calculate Your Exact Age Online</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Our age calculator allows you to calculate your exact age by date of birth, by year, or by birthday. This online age calculator is easy to use and provides instant results for anyone looking to track their age accurately. It's a useful tool for official documents, understanding age-related milestones, or simply celebrating another year of life.
                </p>
            </div>

            <AgeCalculator />

            <section className="mt-12 space-y-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Use the Age Calculator</h2>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li><strong>Enter Your Birth Date:</strong> Use the date picker to select your exact date of birth.</li>
                        <li><strong>Choose a Second Date (Optional):</strong> The "Age at the Date of" field defaults to today. You can change it to any other date to find the interval between two dates.</li>
                        <li><strong>Click “Calculate Age”:</strong> Press the button to get your results.</li>
                        <li><strong>See Your Exact Age:</strong> Instantly view your age broken down into years, months, days, and watch the hours, minutes, and seconds update in real time.</li>
                    </ol>
                </div>

                 <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Real-Time Age Calculation</h2>
                    <p className="text-muted-foreground">
                       This tool does more than just give a static number. The live timer automatically updates every second to give you a precise and ever-changing view of your age. This feature highlights the dynamic nature of time and provides unparalleled accuracy for those who need it.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Age Calculation Formula</h2>
                     <p className="text-muted-foreground">
                       The fundamental formula is simple: <strong>Age = Current Date - Date of Birth</strong>. However, our calculator's algorithm is more advanced. It correctly handles the varying number of days in months (e.g., 28, 30, or 31) and accurately accounts for leap years to ensure the final calculation of years, months, and days is correct.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Accurate Age Calculation Matters</h2>
                     <p className="text-muted-foreground">
                       While it might seem simple, having your exact age is crucial for a variety of official and legal purposes. This can include filling out applications for passports, visas, or school admissions, verifying eligibility for age-restricted products or benefits, and for legal contracts. Our tool provides the precision needed for these situations.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">FAQs About Age Calculation</h2>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Link href="/birthday-age-calculator" className="text-primary hover:underline">Birthday Age Calculator</Link>
                        <Link href="/biological-age" className="text-primary hover:underline">Biological Age Calculator</Link>
                        <Link href="/dog-age" className="text-primary hover:underline">Dog Age Calculator</Link>
                        <Link href="/cat-age-in-human-years" className="text-primary hover:underline">Cat Age Calculator</Link>
                        <Link href="/pregnancy-calculators" className="text-primary hover:underline">Pregnancy Calculators</Link>
                        <Link href="/retirement" className="text-primary hover:underline">Retirement Age Calculator</Link>
                    </div>
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
