
import BirthdayAgeCalculator from '@/components/calculators/birthday-age-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Birthday Age Calculator – Calculate Your Exact Age & Countdown to Birthday',
    description: 'Use our Birthday Age Calculator to instantly find your age in years, months, days, hours, minutes, and seconds, plus a live countdown to your next birthday. Perfect for fun, planning, or tracking milestones.',
    openGraph: {
        title: 'Birthday Age Calculator – Calculate Your Exact Age & Countdown to Birthday',
        description: 'Use our Birthday Age Calculator to instantly find your age in years, months, days, hours, minutes, and seconds, plus a live countdown to your next birthday.',
        type: 'website',
        url: '/birthday-age-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Birthday Age Calculator – Calculate Your Exact Age & Countdown to Birthday',
        description: 'Use our Birthday Age Calculator to instantly find your age in years, months, days, hours, minutes, and seconds, plus a live countdown to your next birthday.',
    },
    alternates: {
        canonical: '/birthday-age-calculator',
    },
};

const faqs = [
    { question: "How do I use the Birthday Age Calculator?", answer: "Simply enter your date of birth using the calendar and click the 'Calculate Age & Birthday' button. Your exact age and a countdown to your next birthday will appear instantly." },
    { question: "Can I see my age in hours and minutes?", answer: "Yes! The calculator provides a detailed breakdown of your age in years, months, days, hours, minutes, and seconds, all updating in real time." },
    { question: "Is this calculator free to use online?", answer: "Absolutely. This is a 100% free online tool designed for easy and accurate age calculation and birthday tracking." },
    { question: "How accurate is the birthday countdown?", answer: "The countdown is highly accurate. It calculates the time remaining until your next birthday down to the second, based on the current date and time." },
    { question: "Can I find out what day of the week I was born on?", answer: "While this specific tool focuses on age and birthday countdowns, many calendar tools can tell you the day of the week for any given date. Our calculator is optimized for time duration." },
    { question: "Does the countdown work for any birthday?", answer: "Yes, once you enter a valid date of birth, the calculator will accurately count down to the next instance of that birth date." },
    { question: "What if my birthday is today?", answer: "If your birthday is today, the countdown will show all zeros and then begin counting down to your birthday next year. Happy Birthday!" },
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

export default function BirthdayAgeCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Birthday Age Calculator – Find Your Exact Age Instantly</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Find out your exact age and count down to your next birthday in real-time. This tool is perfect for tracking milestones, planning celebrations, or simply for fun!
                </p>
            </div>

            <BirthdayAgeCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>How to Use the Birthday Age Calculator</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Input Your Birth Date:</strong> Use the easy-to-navigate calendar to select your exact date of birth (Day, Month, Year).</li>
                            <li><strong>Calculate Age in Real-Time:</strong> Click the "Calculate Age & Birthday" button.</li>
                            <li><strong>View Your Two Key Results:</strong>
                                <ul className="list-disc list-inside pl-6 mt-2">
                                    <li><strong>Your Exact Age:</strong> Instantly see your current age, with the seconds ticking up live.</li>
                                    <li><strong>Next Birthday Countdown:</strong> Watch the live countdown showing exactly how long you have until your next celebration.</li>
                                </ul>
                            </li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Dual Features for Complete Age Tracking</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                            <div>
                                <h3 className="font-semibold">Live Age Calculation</h3>
                                <p className="text-muted-foreground">This tool does more than just show a static number. It provides a real-time display of your age, broken down into years, months, days, hours, minutes, and seconds. It’s a dynamic and precise way to view your life's duration.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Gift className="h-5 w-5 text-primary mt-1 shrink-0" />
                            <div>
                                <h3 className="font-semibold">Next Birthday Countdown</h3>
                                <p className="text-muted-foreground">The dedicated countdown builds anticipation for your next big day. It shows the remaining months, days, hours, minutes, and seconds until your next birthday, making it perfect for party planning or just getting excited.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Why Knowing Your Exact Age & Birthday Is Useful</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                        Knowing your precise age and counting down to your birthday is useful for more than just fun. It has practical applications for:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>Official Documents:</strong> Ensure accuracy on legal forms, applications, and IDs where your exact age is required.</li>
                            <li><strong>Event Planning:</strong> Use the birthday countdown to perfectly time your party invitations, preparations, and social media posts.</li>
                            <li><strong>Milestone Tracking:</strong> Keep an eye on major life milestones and anniversaries with second-by-second precision. Celebrate your half-birthday or the moment you turn a specific number of days old.</li>
                            <li><strong>Eligibility Checks:</strong> Verify age for benefits, discounts, or programs that have specific age requirements.</li>
                        </ul>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
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
        <RelatedCalculators currentCategory="Core Age Calculation" currentHref="/birthday-age-calculator" />
      </div>
    </div>
  );
}
