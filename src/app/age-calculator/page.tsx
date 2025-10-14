
import AgeCalculator from '@/components/calculators/age-calculator';
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
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Age Calculator – Calculate Your Exact Age Online</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Our age calculator allows you to calculate your exact age by date of birth, by year, or by birthday. This online age calculator is easy to use and provides instant results for anyone looking to track their age accurately. It's a useful tool for official documents, understanding age-related milestones, or simply celebrating another year of life.
                </p>
            </div>

            <AgeCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Age Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Your Birth Date:</strong> Use the date picker to select your exact date of birth (Day, Month, Year).</li>
                            <li><strong>Choose a Second Date (Optional):</strong> The "Age at the Date of" field defaults to today. You can change it to any other date—past, present, or future—to find the time interval between two dates.</li>
                            <li><strong>Click “Calculate Age”:</strong> Press the button to get your results instantly.</li>
                            <li><strong>See Your Exact Age:</strong> Instantly view your age broken down into years, months, and days. If the "Age at Date of" is set to today, you'll also see the hours, minutes, and seconds updating in real-time.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Understanding the Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">Our calculator provides two sets of results for a comprehensive understanding of your age:</p>
                        <div>
                            <h3 className="font-semibold text-lg">Your Exact Age</h3>
                            <p className="text-muted-foreground">This shows your age in the most common format: years, months, and days. It also provides a live-updating clock of hours, minutes, and seconds, giving you a dynamic and precise view of your age at this very moment.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Age in Other Units</h3>
                            <p className="text-muted-foreground">For a different perspective, we convert your age into other total units:</p>
                            <ul className="list-disc list-inside text-muted-foreground pl-4 mt-2">
                                <li>Total months</li>
                                <li>Total weeks</li>
                                <li>Total days</li>
                                <li>Total hours</li>
                                <li>Total minutes</li>
                                <li>Total seconds</li>
                            </ul>
                            <p className="text-muted-foreground mt-2">This can be fascinating for celebrating unique milestones, like your 10,000th day or millionth minute!</p>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Why Accurate Age Calculation Matters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">While it might seem simple, having your exact chronological age is crucial for a variety of official and legal purposes. An accurate calculation is more than just trivia; it's a necessity in many aspects of life.</p>
                        <ul className="space-y-3">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Legal Documents & Applications:</strong> Filling out applications for passports, driver's licenses, visas, or school admissions often requires your exact age.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Eligibility Verification:</strong> Verifying eligibility for age-restricted products, services (like social media), or benefits (like retirement plans) depends on your precise age.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Medical and Insurance:</strong> Health assessments, insurance premiums, and medical milestones are often tied to specific ages.</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Legal Contracts:</strong> Any legally binding contract where age is a condition (e.g., entering a contest, age-restricted purchases) requires an exact age.</span></li>
                        </ul>
                         <p className="text-muted-foreground mt-4">Our tool provides the precision needed for these situations by correctly accounting for all calendar variations.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>The Science of Age Calculation</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground">
                           The fundamental formula is simple: <strong>Age = Current Date - Date of Birth</strong>. However, a truly accurate calculation requires a more sophisticated algorithm. Our calculator correctly handles the varying number of days in months (e.g., 28, 29, 30, or 31) and accurately accounts for leap years to ensure the final breakdown of years, months, and days is correct. It calculates the full, completed periods of time, which is why the result is so precise. For more information, read our <Link href="/articles/understanding-chronological-age" className="text-primary hover:underline">article on chronological age</Link>.
                        </p>
                    </CardContent>
                </Card>

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
            </section>
        </main>
        <RelatedCalculators currentCategory="Core Age Calculation" currentHref="/age-calculator" />
      </div>
    </div>
  );
}
